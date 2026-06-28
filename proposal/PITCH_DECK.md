# Veraz Protocol: Pitch Deck Outline (PULSO Hackathon)

**Objetivo:** Presentación en vivo de 3-5 minutos para la final presencial / evaluación del jurado.
**Tono:** Empresarial, agresivo contra las soluciones actuales, enfocado en Stellar y DeFi.

---

## Slide 1: Título & Hook (El Gancho)
* **Texto en pantalla:** Veraz Protocol - Decentralized Proof of Solvency
* **Visual:** Un candado abriéndose o el logo de Veraz con el de Stellar y Aquarius.
* **Script / Narrativa:** "¿Sabían que si hoy un emisor de stablecoins es 100% solvente pero usa protocolos DeFi para mover su capital, los sistemas de auditoría tradicionales dirán que está en bancarrota? Hola, somos Veraz, y venimos a arreglar la infraestructura de cumplimiento para la era de las finanzas descentralizadas."

## Slide 2: El Problema (Validado con Clientes)
* **Texto en pantalla:** El dinero ya no duerme en billeteras frías.
* **Visual:** Diagrama mostrando 70% en billeteras (SAC) y 30% en AMMs (DeFi).
* **Script:** "Hicimos 3 entrevistas a emisores reales. Descubrimos que el 30-40% de sus reservas están generando liquidez en DEXs. Soluciones como Chainlink PoR o auditorías manuales SOLO leen balances de billeteras estáticas. Si ignoras los pools de liquidez, declaras falsas insolvencias."

## Slide 3: La Solución (Multi-Venue ZK)
* **Texto en pantalla:** Oráculos Multi-Fuente + Privacidad Total
* **Visual:** Veraz leyendo simultáneamente de SAC, Aquarius y DeFindex.
* **Script:** "Veraz es la primera infraestructura en Stellar que suma las reservas en billeteras institucionales Y en los pools de liquidez de Aquarius y DeFindex, creando un número total preciso."

## Slide 4: ¿Por qué ZK (Zero-Knowledge)?
* **Texto en pantalla:** Transparencia sin exponer el negocio.
* **Visual:** Escudo protegiendo la base de datos de usuarios.
* **Script:** "Pero no basta con leer reservas; hay que compararlas con las deudas (pasivos). Si publicamos los saldos de los clientes, violamos su privacidad y exponemos al exchange a hackeos. Veraz permite al exchange correr nuestro SDK localmente, generando una prueba criptográfica (UltraHonk) que garantiza matemáticamente la solvencia sin revelar un solo dato de los clientes."

## Slide 5: El Producto Real (No somos un B2B)
* **Texto en pantalla:** Infraestructura SDK + Soroban Contracts
* **Visual:** Arquitectura: Database -> Veraz SDK -> Stellar Network.
* **Script:** "Nos dimos cuenta de que ningún exchange va a subir sus datos a nuestra web. Por eso Veraz es una infraestructura abierta. Les damos el SDK, ellos generan la prueba en sus propios servidores, y nuestro contrato inteligente en Soroban actúa como el juez imparcial on-chain."

## Slide 6: El Santo Grial para el Usuario (Individual Verification)
* **Texto en pantalla:** Confianza Matemática para todos.
* **Visual:** Un usuario verificando su "Merkle Receipt".
* **Script:** "Con nuestro Explorador Público, no solo los reguladores ven la salud del sistema. Cada cliente recibe un recibo criptográfico y puede verificar matemáticamente que el exchange no omitió su dinero para fingir solvencia. Prevenimos el próximo FTX."

## Slide 7: Mercado y Modelo de Negocios
* **Texto en pantalla:** TAM masivo. Tokenización RWA y Stablecoins.
* **Visual:** Logos de posibles clientes (Tribal, MoneyGram, Agrotoken).
* **Script:** "Monetizamos cobrando una tarifa de suscripción mensual (SaaS) a las instituciones para usar nuestra infraestructura de contratos y validación, un costo 100 veces menor que el de firmas auditoras Big 4."

## Slide 8: Tracción y Próximos Pasos (El "Ask")
* **Texto en pantalla:** Testnet Live ✅. Target: Mainnet Q4 2026.
* **Visual:** Road map de 3 meses.
* **Script:** "Hoy estamos desplegados 100% on-chain en la Testnet de Stellar con pruebas ZK reales. Nuestro siguiente paso es una auditoría de seguridad y cerrar nuestro primer piloto. Buscamos ganar PULSO e introducciones con los principales emisores de la red."
