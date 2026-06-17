const sharp = require('sharp');

async function makeRound() {
  const input = 'public/iconimagee.png';
  const metadata = await sharp(input).metadata();
  const size = Math.min(metadata.width, metadata.height);
  const circleSvg = `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" /></svg>`;
  
  await sharp(input)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: Buffer.from(circleSvg), blend: 'dest-in' }])
    .png()
    .toFile('public/iconimagee_round.png');
    
  console.log('done');
}

makeRound().catch(console.error);
