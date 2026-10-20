import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const inputPath = process.env.PHOTO_SOURCE ?? path.resolve(projectRoot, "public", "assets", "profile", "source", "WhatsApp Image 2026-10-20 at 3.26.08 PM.jpeg");
const outputDir = path.resolve(projectRoot, "public", "assets", "profile");

async function processPhoto() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const image = sharp(inputPath);

  const metadata = await image.metadata();
  console.log(`Original: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

  const widths = [400, 800, 1200];
  const formats = [
    { ext: "avif", options: { quality: 75 } },
    { ext: "webp", options: { quality: 80 } },
  ];

  for (const width of widths) {
    for (const { ext, options } of formats) {
      const outputPath = path.join(outputDir, `profile-${width}w.${ext}`);
      await image
        .clone()
        .resize(width, null, { withoutEnlargement: true, fit: "cover", position: "top" })
        .toFormat(ext, options)
        .toFile(outputPath);
      console.log(`Generated: ${outputPath}`);
    }
  }

  const jpgPath = path.join(outputDir, "profile-1200w.jpg");
  await image
    .clone()
    .resize(1200, null, { withoutEnlargement: true, fit: "cover", position: "top" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(jpgPath);
  console.log(`Generated: ${jpgPath}`);

  const thumbPath = path.join(outputDir, "profile-400w.jpg");
  await image
    .clone()
    .resize(400, null, { withoutEnlargement: true, fit: "cover", position: "top" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(thumbPath);
  console.log(`Generated: ${thumbPath}`);

  console.log("\nAll photo variants generated successfully!");
}

processPhoto().catch(console.error);