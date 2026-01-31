import sharp from 'sharp';
import { CONFIG } from '../config';

interface OptimizedImage {
  base64: string;
  dataUrl: string;
  sizeKB: string;
}

export const optimizeImage = async (buffer: Buffer): Promise<OptimizedImage> => {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  let outputBuffer: Buffer;

  // Smart Optimization: Skip processing if already within limits and correct format
  if (
    metadata.format === 'jpeg' && 
    metadata.width && 
    metadata.width <= CONFIG.IMAGE.TARGET_SIZE &&
    buffer.length <= CONFIG.IMAGE.MAX_SIZE
  ) {
    outputBuffer = buffer;
  } else {
    // Resize and compress if needed
    outputBuffer = await image
      .resize(CONFIG.IMAGE.TARGET_SIZE, CONFIG.IMAGE.TARGET_SIZE, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality: CONFIG.IMAGE.QUALITY, progressive: false })
      .toBuffer();
  }

  const base64 = outputBuffer.toString('base64');
  
  return {
    base64: base64,
    dataUrl: `data:image/jpeg;base64,${base64}`,
    sizeKB: (outputBuffer.length / 1024).toFixed(2)
  };
};
