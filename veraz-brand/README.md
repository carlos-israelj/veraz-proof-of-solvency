# Veraz — kit de marca (Monograma V)

## Símbolo
La V de veraz. Brazo izquierdo sólido (privado, opaco), brazo derecho en contorno (público, transparente).
Solo coinciden en el vértice, que se rellena: la prueba.
- Ancho de brazo 10/64; contorno 3.5/64 (4.5 en tiles). Esquinas rectas.
- Nunca rellenar el brazo derecho ni colorear un brazo: el verde vive solo en el vértice.
- Nunca sobre tile azul o índigo (familia Verve / Valutico / VeChain / Vendi).
- Monotono: el vértice queda hueco (el brazo sólido se recorta, ver veraz-symbol-mono-*.svg).

## Ícono / tile
Fondo carbón #101312 (veraz-icon-carbon-*.png). Alternativa clara #F4F6F5. Nunca azul ni índigo.
No usar el símbolo como inicial de la palabra: siempre símbolo + "veraz" completo.

## Wordmark
veraz en Geist 500, minúsculas, tracking −0.03em. Nunca en mayúsculas ni con otra fuente.

## Variantes (svg/)
- veraz-symbol-light / dark: símbolo a color para fondo claro / oscuro.
- veraz-symbol-mono-black / white / currentcolor: monotono (exploradores, badges, impresión).
- veraz-icon-carbon / light / black / mono: ícono en tile (favicon, app, extensión). PNG en png/ a 16–512 (carbon, light, black).
- Lockups horizontal y apilado: veraz-lockup-*.png (en lockups/).

## Área de protección y tamaños mínimos
- Espacio libre alrededor: 1/2 de la altura del símbolo (32/64).
- Símbolo solo: mínimo 16 px pantalla / 5 mm impreso. Lockup horizontal: mínimo 24 px de alto.
- En tile, el símbolo ocupa el 75 % del tile (translate 8, scale 0.75 en viewBox 64).
- Símbolo solo por debajo de 16 px: no. Usar el tile.

## Color
Ver tokens.css / tokens.json. Todos los pares texto/fondo cumplen WCAG AA.
El verde (Solvent / secundario) es exclusivo de lo verificado: no usarlo como decoración.

## Convivencia con Stellar
Usar monotono (negro o blanco) junto al logo de Stellar, separados por una línea; ninguno de los dos en color.

## Implementación
- veraz.css: tokens + clases (.vz-lockup, .vz-btn, .vz-status-*, .vz-badge, .vz-progress, .vz-table). Importa tokens.css.
- snippets/logo-inline.html: SVG inline del símbolo (currentColor), lockup, monotono, <head> con favicons y OG.
- manifest.webmanifest + favicon.svg + png/veraz-icon-carbon-{16..512}.png: copiar a la raíz pública.
- templates/og-attestation.html (1200×630) y templates/attestation-card.html (1080×1080): plantillas con {{placeholders}} para renderizar a PNG (Puppeteer / Satori / @vercel/og).
- svg/veraz-proof-verified.anim.svg: micro-animación 1.8 s (CSS dentro del SVG; hereda currentColor). Para Lottie, recrear con las mismas 3 capas y tiempos 0–20 %, 20–55 %, 60–78 %.
- Dark mode: poner data-theme="dark" en <html>; los tokens cambian solos.

## Referencias de conflicto revisadas
Verve, Valutico, VeChain, Vendi (V bicolor / sólido-contorno sobre azul), Valaska Edits (blanco+verde sobre negro).
Diferenciadores de Veraz: brazo derecho siempre en contorno, color solo en el vértice, tile carbón, nunca símbolo como inicial.
Pendiente: colisión denominativa con Veraz (Equifax AR, clase 36) y VERAZ (Trikdis, clase 9).
