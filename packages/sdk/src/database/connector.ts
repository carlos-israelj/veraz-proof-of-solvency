/**
 * Veraz Protocol SDK - Database Connectors
 *
 * Abstract database connector and implementations for:
 * - PostgreSQL
 * - MySQL
 * - MongoDB
 */

import { Pool as PgPool } from 'pg';
import mysql from 'mysql2/promise';
import { MongoClient, Db } from 'mongodb';
import { Balance, DatabaseConfig } from '../types';

// Optional Supabase client (only loaded if using Supabase with REST API)
let SupabaseClient: any;
try {
  const supabaseModule = require('@supabase/supabase-js');
  SupabaseClient = supabaseModule.createClient;
} catch {
  // Supabase not installed, will fall back to PostgreSQL connection
}

/**
 * Abstract database connector
 * Implement this class to add support for new databases
 */
export abstract class DatabaseConnector {
  constructor(protected config: DatabaseConfig) {}

  abstract connect(): Promise<void>;
  abstract queryBalances(): Promise<Balance[]>;
  abstract disconnect(): Promise<void>;
}

/**
 * PostgreSQL connector
 * Supports PostgreSQL 12+
 */
export class PostgresConnector extends DatabaseConnector {
  private pool: PgPool | null = null;

  async connect(): Promise<void> {
    this.pool = new PgPool({
      connectionString: this.config.connectionString,
    });

    // Test connection
    try {
      const client = await this.pool.connect();
      client.release();
    } catch (error) {
      throw new Error(`Failed to connect to PostgreSQL: ${error}`);
    }
  }

  async queryBalances(): Promise<Balance[]> {
    if (!this.pool) {
      throw new Error('Not connected. Call connect() first.');
    }

    try {
      const result = await this.pool.query(this.config.query);

      return result.rows.map((row) => ({
        userId: String(row.user_id),
        balance: BigInt(row.balance),
      }));
    } catch (error) {
      throw new Error(`Failed to query balances: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}

/**
 * MySQL connector
 * Supports MySQL 8.0+ and MariaDB 10.5+
 */
export class MySQLConnector extends DatabaseConnector {
  private connection: mysql.Connection | null = null;

  async connect(): Promise<void> {
    try {
      this.connection = await mysql.createConnection(
        this.config.connectionString
      );
    } catch (error) {
      throw new Error(`Failed to connect to MySQL: ${error}`);
    }
  }

  async queryBalances(): Promise<Balance[]> {
    if (!this.connection) {
      throw new Error('Not connected. Call connect() first.');
    }

    try {
      const [rows] = await this.connection.query(this.config.query);

      if (!Array.isArray(rows)) {
        throw new Error('Query did not return rows');
      }

      return rows.map((row: any) => ({
        userId: String(row.user_id),
        balance: BigInt(row.balance),
      }));
    } catch (error) {
      throw new Error(`Failed to query balances: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}

/**
 * MongoDB connector
 * Supports MongoDB 4.4+
 */
export class MongoDBConnector extends DatabaseConnector {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  async connect(): Promise<void> {
    try {
      this.client = new MongoClient(this.config.connectionString);
      await this.client.connect();

      // Extract database name from connection string
      const dbName = new URL(this.config.connectionString).pathname.slice(1);
      this.db = this.client.db(dbName);
    } catch (error) {
      throw new Error(`Failed to connect to MongoDB: ${error}`);
    }
  }

  async queryBalances(): Promise<Balance[]> {
    if (!this.db) {
      throw new Error('Not connected. Call connect() first.');
    }

    try {
      // For MongoDB, the "query" is interpreted as collection name
      // Format: "collection_name"
      // We assume documents have { user_id: string, balance: number }
      const collection = this.db.collection(this.config.query);

      const documents = await collection.find({}).toArray();

      return documents.map((doc) => ({
        userId: String(doc.user_id),
        balance: BigInt(doc.balance),
      }));
    } catch (error) {
      throw new Error(`Failed to query balances: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

/**
 * Supabase connector
 * Supports both direct PostgreSQL connection and Supabase REST API
 */
export class SupabaseConnector extends DatabaseConnector {
  private pool: PgPool | null = null;
  private supabase: any = null;

  async connect(): Promise<void> {
    // Option 1: Use Supabase REST API client (if URL and key provided)
    if (this.config.supabaseUrl && this.config.supabaseKey) {
      if (!SupabaseClient) {
        throw new Error(
          'Supabase client not found. Install: npm install @supabase/supabase-js'
        );
      }

      this.supabase = SupabaseClient(
        this.config.supabaseUrl,
        this.config.supabaseKey
      );

      console.log('✅ Connected to Supabase via REST API');
    }
    // Option 2: Use direct PostgreSQL connection (default)
    else {
      this.pool = new PgPool({
        connectionString: this.config.connectionString,
      });

      try {
        const client = await this.pool.connect();
        client.release();
        console.log('✅ Connected to Supabase via PostgreSQL');
      } catch (error) {
        throw new Error(`Failed to connect to Supabase: ${error}`);
      }
    }
  }

  async queryBalances(): Promise<Balance[]> {
    // If using Supabase REST API
    if (this.supabase) {
      try {
        // Parse table name from query (simple parsing)
        // Expected format: "SELECT user_id, balance FROM table_name WHERE ..."
        const tableMatch = this.config.query.match(/FROM\s+(\w+)/i);
        if (!tableMatch) {
          throw new Error(
            'Could not parse table name from query. Use format: "SELECT user_id, balance FROM table_name"'
          );
        }

        const tableName = tableMatch[1];

        // Execute query using Supabase client
        const { data, error } = await this.supabase
          .from(tableName)
          .select('user_id, balance');

        if (error) {
          throw new Error(`Supabase query error: ${error.message}`);
        }

        return (data || []).map((row: any) => ({
          userId: String(row.user_id),
          balance: BigInt(row.balance),
        }));
      } catch (error) {
        throw new Error(`Failed to query balances from Supabase: ${error}`);
      }
    }

    // Otherwise use PostgreSQL connection
    if (!this.pool) {
      throw new Error('Not connected. Call connect() first.');
    }

    try {
      const result = await this.pool.query(this.config.query);

      return result.rows.map((row) => ({
        userId: String(row.user_id),
        balance: BigInt(row.balance),
      }));
    } catch (error) {
      throw new Error(`Failed to query balances: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
    this.supabase = null;
  }
}

/**
 * Factory function to create appropriate database connector
 */
export function createDatabaseConnector(
  config: DatabaseConfig
): DatabaseConnector {
  switch (config.type) {
    case 'postgres':
      return new PostgresConnector(config);
    case 'mysql':
      return new MySQLConnector(config);
    case 'mongodb':
      return new MongoDBConnector(config);
    case 'supabase':
      return new SupabaseConnector(config);
    default:
      throw new Error(`Unsupported database type: ${(config as any).type}`);
  }
}
