# KAIRO Landing — Fuentes locales

La landing pública usa SOLO 2 familias. Los archivos NO están versionados.
Colocar aquí los `.woff2` con licencia adquirida.

## Archivos esperados

| Archivo | Familia CSS | Peso | Estilo |
|---|---|---|---|
| `Metrik-Regular.woff2`        | `Metrik`            | 400 | normal |
| `Metrik-Medium.woff2`         | `Metrik`            | 500 | normal |
| `Metrik-Semibold.woff2`       | `Metrik`            | 600 | normal |
| `Metrik-Bold.woff2`           | `Metrik`            | 700 | normal |
| `EpikaSerifExtraCondensed-Regular.woff2` | `EpikaSerifXCond` | 400 | normal |
| `EpikaSerifExtraCondensed-Medium.woff2`  | `EpikaSerifXCond` | 500 | normal |
| `EpikaSerifExtraCondensed-Bold.woff2`    | `EpikaSerifXCond` | 700 | normal |
| `EpikaSerifExtraCondensed-Italic.woff2`  | `EpikaSerifXCond` | 400–700 | italic |

## Fuentes de origen

- **Metrik V100** — Wayne Fearnley. https://waynefearnley.com
  Licencia comercial requerida. NO descargar sin permiso.
- **LightlabDisplay** — placeholder para la familia display estilo del
  wordmark `lightlab.` (italic display serif con remates expresivos).
  Si la fuente final tiene otro nombre comercial, renombrar el archivo
  o actualizar la declaración `@font-face` en `app/globals.css`.

## Fallback mientras faltan los archivos

El CSS define fallbacks en `app/globals.css`:

```css
--font-body: "Metrik", Arial, Helvetica, system-ui, sans-serif;
--font-display: "LightlabDisplay", "Times New Roman", Georgia, serif;
```

Si los `.woff2` no existen, el navegador usa Arial (body) y Times (display).
La landing NO se rompe; pierde personalidad hasta que las fuentes reales se suban.

## Convertir desde OTF/TTF a WOFF2

```bash
# fontTools (Python)
pip install fonttools brotli
pyftsubset Metrik-Regular.otf --flavor=woff2 --output-file=Metrik-Regular.woff2 \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
```

Mantener subset latin extendido. Evitar cargar pesos no usados.
