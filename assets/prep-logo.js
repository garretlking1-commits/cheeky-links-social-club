/* Logo prep: removes the black background from the source art (black-matte
   removal: alpha = max(R,G,B), colors unpremultiplied), then writes:
   - cheeky-links-logo.webp  → transparent, used by the site
   - cheeky-links-logo.png   → flat black original, for social cards / merch
   - favicon.png             → 192px rabbit crop from the transparent version
   Uses the sharp install from the parent project. Run: node prep-logo.js */
const sharp = require('C:/Users/Owner/node_modules/sharp');
const path = __dirname;
const SRC = path + '/cheeky-links-logo-flat.webp';

(async () => {
  const { data, info } = await sharp(SRC).ensureAlpha().raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const a = Math.max(data[i], data[i + 1], data[i + 2]);
    if (a > 0) {
      data[i]     = Math.min(255, Math.round(data[i]     * 255 / a));
      data[i + 1] = Math.min(255, Math.round(data[i + 1] * 255 / a));
      data[i + 2] = Math.min(255, Math.round(data[i + 2] * 255 / a));
    }
    data[i + 3] = a;
  }

  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };

  await sharp(data, raw).webp({ quality: 92 })
    .toFile(path + '/cheeky-links-logo.webp');
  console.log('cheeky-links-logo.webp written (transparent, for the site)');

  await sharp(SRC).png().toFile(path + '/cheeky-links-logo.png');
  console.log('cheeky-links-logo.png written (flat black, for sharing/merch)');

  // Favicon keeps the flat dark plate — tabs are often light, where a
  // semi-transparent unpremultiplied rabbit would look washed out.
  const side = Math.round(info.width * 0.46);
  await sharp(SRC)
    .extract({ left: Math.round(info.width * 0.26), top: Math.round(info.height * 0.07), width: side, height: side })
    .resize(192, 192).png().toFile(path + '/favicon.png');
  console.log('favicon.png written (dark-plate rabbit crop)');
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
