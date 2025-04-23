import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy embed files
const embedFiles = [
  { src: 'public/embed.js', dest: 'embed.js' },
  { src: 'public/example-embed.html', dest: 'example-embed.html' }
];

embedFiles.forEach(({ src, dest }) => {
  const sourcePath = path.join(rootDir, src);
  const destPath = path.join(distDir, dest);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${src} to ${dest}`);
  } else {
    console.error(`Source file not found: ${src}`);
  }
});

// Create combined CSS file
const cssFiles = [
  'src/styles/index.css',
  'src/styles/App.css',
  'src/styles/MetisCard.css'
];

const combinedCSS = cssFiles
  .map(file => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    console.error(`CSS file not found: ${file}`);
    return '';
  })
  .join('\n\n');

fs.writeFileSync(path.join(distDir, 'style.css'), combinedCSS);
console.log('Created combined style.css');

// Copy Robit avatars
const avatarsDir = path.join(rootDir, 'public', 'avatars');
const destAvatarsDir = path.join(distDir, 'avatars');

if (fs.existsSync(avatarsDir)) {
  if (!fs.existsSync(destAvatarsDir)) {
    fs.mkdirSync(destAvatarsDir, { recursive: true });
  }
  
  fs.readdirSync(avatarsDir).forEach(file => {
    if (file.endsWith('.png')) {
      const sourcePath = path.join(avatarsDir, file);
      const destPath = path.join(destAvatarsDir, file);
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied avatar: ${file}`);
    }
  });
} else {
  console.error('Avatars directory not found');
}

console.log('Embed preparation complete!');
