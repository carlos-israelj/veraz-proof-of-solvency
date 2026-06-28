# Veraz Protocol: Demo Video Script (1-2 Min)

**Requisito PULSO:** Un video demostrativo de 1-2 minutos mostrando el producto funcionando y resolviendo el problema. Sin necesidad de alta producción.

---

### [00:00 - 00:15] Introducción al Problema
* **Visual:** Grabación de pantalla del explorador público (Auditor View) actual, pero mostrando un sello rojo de "Insolvente" (simulado o editado).
* **Voz en off (Audio):** "Los emisores de stablecoins guardan el 30% de sus reservas aportando liquidez a DEXs como Aquarius. Pero las herramientas de Proof of Reserves actuales solo leen billeteras estáticas. El resultado: las empresas aparentan ser insolventes o pierden privacidad intentando demostrar lo contrario."

### [00:15 - 00:30] Presentando Veraz (El SDK)
* **Visual:** Gráfico rápido (puede ser el diagrama del `ARCHITECTURE.md`) mostrando "Issuer DB -> Veraz SDK -> Soroban".
* **Voz en off:** "Conozcan Veraz. Una infraestructura Zero-Knowledge nativa de Stellar. Los emisores instalan nuestro SDK localmente, lo que les permite generar pruebas criptográficas sin que los balances de sus usuarios salgan jamás de su servidor."

### [00:30 - 01:00] Demostración Técnica (Issuer Flow)
* **Visual:** Pantalla del "Issuer Wizard" que programamos.
* **Voz en off:** "Veámoslo en acción. Un emisor conecta su billetera Freighter. Nuestro generador local toma los saldos de los clientes, construye un Árbol de Merkle y en un par de segundos compila una prueba UltraHonk Zero-Knowledge en el equipo del cliente."
* **Visual:** Clic en "Generar Prueba". Se ve el estado de carga y el popup de Freighter firmando.

### [01:00 - 01:30] Magia On-Chain y Multifuente (Auditor Flow)
* **Visual:** Transición al "Auditor Dashboard". Mostrar los balances desglosados (Las barras de progreso de SAC y Aquarius).
* **Voz en off:** "Una vez enviada, la magia ocurre on-chain. Nuestro contrato inteligente en Soroban verifica la firma ZK. Luego, actúa como un oráculo multifuente: lee automáticamente las billeteras frías y llama al contrato de Aquarius para sumar la liquidez de los pools."
* **Visual:** Resaltar con el mouse que dice "30% en Aquarius Pools".
* **Voz en off:** "Veraz es la única infraestructura descentralizada que suma reservas DeFi y protege pasivos con ZK. Listo para escalar en el ecosistema Stellar."
