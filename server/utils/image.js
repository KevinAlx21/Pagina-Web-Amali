import sharp from "sharp";

export const optimizeImage = async (buffer) => {
  const optimized = await sharp(buffer)
    .resize({
      width: 1200,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
    })
    .toBuffer();

  return optimized;
};