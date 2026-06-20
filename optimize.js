import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = './public';

const files = fs.readdirSync(publicDir);

for (const file of files) {
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const webpPath = path.join(publicDir, `${basename}.webp`);
    
    // Only generate if webp doesn't exist
    if (!fs.existsSync(webpPath)) {
      console.log(`Converting ${file} to ${basename}.webp...`);
      await sharp(path.join(publicDir, file))
        .webp({ quality: 80 })
        .toFile(webpPath);
      console.log(`Successfully compressed ${file}!`);
    }
  }
}
console.log('All images optimized!');
