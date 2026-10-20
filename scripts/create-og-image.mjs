import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const photoPath = process.env.PHOTO_SOURCE ?? path.resolve(projectRoot, "public", "assets", "profile", "source", "WhatsApp Image 2026-10-20 at 3.26.08 PM.jpeg");
const outputPath = path.resolve(projectRoot, "public", "og-image.png");

async function createOgImage() {
  const photo = sharp(photoPath);

  const width = 1200;
  const height = 630;

  const background = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 11, g: 12, b: 15, alpha: 1 },
    },
  });

  const photoResized = await photo
    .clone()
    .resize(400, 400, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  const svgText = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#E3B96B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#7FD1C0;stop-opacity:1" />
        </linearGradient>
      </defs>
      <text x="520" y="220" font-family="Georgia, serif" font-size="48" font-weight="600" fill="url(#textGradient)" text-anchor="start">Hariraj Kuragayala</text>
      <text x="520" y="290" font-family="system-ui, sans-serif" font-size="22" fill="#ECEAE4" text-anchor="start">Software Engineer · AI Developer</text>
      <text x="520" y="340" font-family="system-ui, sans-serif" font-size="16" fill="#9A9DA6" text-anchor="start">Backend · AI/RAG · Full Stack</text>
      <text x="520" y="420" font-family="system-ui, sans-serif" font-size="14" fill="#E3B96B" text-anchor="start">hariraj-portfolio.vercel.app</text>
    </svg>
  `;

  const svgBuffer = Buffer.from(svgText);

  await background
    .composite([
      { input: photoResized, left: 60, top: 115 },
      { input: svgBuffer, left: 0, top: 0 },
    ])
    .png()
    .toFile(outputPath);

  console.log(`Generated OG image: ${outputPath}`);
}

createOgImage().catch(console.error);