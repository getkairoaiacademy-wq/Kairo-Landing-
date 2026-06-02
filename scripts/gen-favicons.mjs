// Generate favicons + OG image from public/logo-kairo.svg
import sharp from "sharp"
import pngToIco from "png-to-ico"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const pub = join(root, "public")
const svg = readFileSync(join(pub, "logo-kairo.svg"))

async function pngOf(size, file, opts = {}) {
  const out = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: "contain", background: opts.bg || { r: 0, g: 0, b: 0, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toBuffer()
  writeFileSync(join(pub, file), out)
  return out
}

// Square mark PNGs.
await pngOf(16, "favicon-16x16.png")
await pngOf(32, "favicon-32x32.png")
await pngOf(180, "apple-touch-icon.png")
await pngOf(192, "android-chrome-192x192.png")
await pngOf(512, "android-chrome-512x512.png")

// Master logo PNG (square, retina) — used by OG/Twitter as <100KB.
await pngOf(512, "logo-kairo.png")

// favicon.ico — bundle 16+32+48.
const buf48 = await sharp(svg, { density: 384 }).resize(48, 48, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } }).png().toBuffer()
const buf32 = await sharp(svg, { density: 384 }).resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } }).png().toBuffer()
const buf16 = await sharp(svg, { density: 384 }).resize(16, 16, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } }).png().toBuffer()
const ico = await pngToIco([buf16, buf32, buf48])
writeFileSync(join(pub, "favicon.ico"), ico)

// OG image 1200x630 — mark centered on black.
const mark = await sharp(svg, { density: 512 }).resize(420, 420, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } }).png().toBuffer()
const og = await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
})
  .composite([{ input: mark, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toBuffer()
writeFileSync(join(pub, "og-image.png"), og)

console.log("Generated:")
;["favicon.ico", "favicon-16x16.png", "favicon-32x32.png", "apple-touch-icon.png", "android-chrome-192x192.png", "android-chrome-512x512.png", "logo-kairo.png", "og-image.png"].forEach((f) => console.log(" -", f))
