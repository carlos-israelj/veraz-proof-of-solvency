# Estrategia Técnica y Arquitectura del Producto: Veraz Protocol

**Estado:** Documento de Definición Estratégica  
**Objetivo:** Establecer la arquitectura, flujos de datos (Ingestion) y el modelo de negocio para el lanzamiento de Veraz.

---

## 1. Posicionamiento: Infraestructura Web3 vs Producto B2B

La viabilidad comercial y técnica de Veraz depende de cómo se integra en los sistemas existentes de los emisores (Exchanges, Stablecoins, RWAs). 

Se ha decidido **descartar el modelo de Producto B2B tradicional** (donde el cliente confía sus datos a una plataforma centralizada de Veraz) debido a los inmensos riesgos de seguridad y la fricción comercial de exigir acceso a las bases de datos contables de terceros.

En su lugar, **Veraz se posiciona estrictamente como INFRAESTRUCTURA (Protocolo + SDK)**. 

### El Ecosistema Veraz se compone de 3 piezas:
1. **Veraz SDK:** Librerías de código abierto (NPM/Rust) para integración backend.
2. **Veraz Protocol:** Contratos Inteligentes en Soroban que actúan como oráculos y verificadores ZK.
3. **Veraz Public Explorer:** El frontend web público (la UI actual) utilizado exclusivamente como explorador de bloques/auditoría pública y entorno de pruebas (Sandbox) para desarrolladores.

---

## 2. Arquitectura de Ingreso de Datos (Data Ingestion)

El flujo de verificación requiere comparar Pasivos (Deuda) vs Reservas (Activos). La estrategia de ingestión de datos es híbrida para maximizar la seguridad y automatización.

### 2.1. Ingestión de Pasivos (Liabilities) - *Off-Chain & Local*

Las deudas de un exchange con sus usuarios residen en bases de datos privadas (SQL/NoSQL). **Estos datos nunca deben abandonar los servidores del exchange.**

**Flujo de Integración (SDK):**
1. El equipo técnico del exchange instala el `@veraz-protocol/sdk` en su propio servidor backend.
2. Configuran un *Cron Job* interno que extrae un objeto JSON con los saldos de todos sus usuarios directamente de su base de datos.
3. El servidor del exchange ejecuta la función `VerazSDK.generateProof(json_data)` de manera **local**.
4. El SDK construye el Árbol de Merkle, compila la Prueba de Conocimiento Cero (Noir/UltraHonk) en la memoria RAM del servidor del cliente, y envía **únicamente la prueba matemática y la Raíz de Merkle** a la red Stellar.

*Ventaja Técnica:* Fricción nula de seguridad. El cliente no expone claves API ni exporta JSONs a servidores de terceros, mitigando vectores de ataque y reduciendo costos de cumplimiento (SOC2/ISO27001) para Veraz.

### 2.2. Ingestión de Reservas (Reserves) - *On-Chain & Automatizada*

A diferencia de los pasivos, las reservas viven on-chain. La ingestión se realiza mediante contratos inteligentes que actúan como oráculos autónomos (Scraping On-Chain).

El `SolvencyPolicy Contract` de Veraz agrega valor real al sumar el capital fragmentado en múltiples protocolos de finanzas descentralizadas (DeFi), un requisito crítico para emisores modernos.

**Orígenes Soportados (Multi-Venue):**
1. **SAC (Stellar Asset Contract):** Lectura directa de billeteras frías institucionales.
2. **Aquarius AMM:** Llamadas *cross-contract* para leer participaciones en pools de liquidez (LP tokens), un estándar de la industria para generar liquidez de stablecoins.
3. **DeFindex (Integración en Proceso):** Conexión con bóvedas de rendimiento (Yield Vaults). Permite contabilizar el capital institucional que se encuentra trabajando en estrategias de *yield farming*, reflejando el balance real del emisor.

---

## 3. Ventaja Competitiva y Posicionamiento de Mercado

La justificación comercial del producto radica en las deficiencias arquitectónicas de las soluciones de oráculos actuales (e.g., Chainlink Proof of Reserves).

| Característica | Soluciones Tradicionales (Ej. Chainlink PoR) | Veraz Protocol |
| :--- | :--- | :--- |
| **Arquitectura** | Depende de Oráculos Centralizados | 100% Descentralizado (Soroban) |
| **Privacidad** | Nula (Requiere transparencia total on-chain) | Criptografía Zero-Knowledge (UltraHonk) |
| **Cobertura DeFi** | Limitada a billeteras específicas | Soporte nativo Multi-Venue (Aquarius, DeFindex) |
| **Integración** | Compleja, requiere acuerdos B2B | Permisionless, integración vía SDK abierto |

## 4. Conclusión para Desarrollo Futuro

La interfaz gráfica (UI) actual cumple la función de **Explorador Público** y demostración técnica para hackathons. Sin embargo, el core del negocio y el desarrollo de ingeniería deben centrarse en:
1. Robustecer el contrato inteligente en Rust para manejar excepciones en llamadas *cross-contract* (Aquarius/DeFindex).
2. Empaquetar el generador ZK en una librería consumible (`@veraz-protocol/sdk`) para Node.js.
3. Escalar el circuito de Noir para soportar árboles de Merkle reales con >10,000 hojas (usuarios).
