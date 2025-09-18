// Helper function for handling fallback images
export const getImageSource = (imageUrl?: string) => {
  if (!imageUrl || imageUrl.trim() === '') {
    return require('../assets/images/fallback.png');
  }
  return { uri: imageUrl };
};

// Alternative helper that returns the source object directly
export const getFallbackImageSource = (imageUrl?: string) => {
  return imageUrl && imageUrl.trim() !== '' 
    ? { uri: imageUrl }
    : require('../assets/images/fallback.png');
};
