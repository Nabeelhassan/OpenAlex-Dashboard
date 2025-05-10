import md5 from 'md5-js';

/**
 * Extracts the filename from a Wikimedia Commons URL
 * 
 * @param url Wikimedia Commons URL (e.g. https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/MIT%20Press%20logo.svg)
 * @returns The filename (e.g. "MIT_Press_logo.svg")
 */
function extractFilenameFromUrl(url: string): string | null {
  try {
    // For URLs in the format: https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/MIT%20Press%20logo.svg
    const fileRegex = /\/file\/([^&?#]+)(?:[&?#]|$)/i;
    const match = url.match(fileRegex);
    
    if (match && match[1]) {
      // Decode the URL-encoded filename and replace spaces with underscores
      const filename = decodeURIComponent(match[1]).replace(/ /g, '_');
      return filename;
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting filename from URL:', error);
    return null;
  }
}

/**
 * Converts a Wikimedia Commons URL to a direct image URL using the hashed upload directory structure
 * 
 * @param url Wikimedia Commons URL
 * @returns Direct URL to the image, or the original URL if conversion fails
 */
export function getWikimediaDirectUrl(url: string): string {
  if (!url || !url.includes('commons.wikimedia.org')) {
    return url;
  }
  
  try {
    const filename = extractFilenameFromUrl(url);
    
    if (!filename) {
      return url;
    }
    
    // Calculate MD5 hash of the normalized filename
    const hash = md5(filename);
    
    // First-level folder is the first hex digit
    const firstLevel = hash.charAt(0);
    
    // Second-level folder is the first two hex digits
    const secondLevel = hash.substring(0, 2);
    
    // Construct the direct URL
    const directUrl = `https://upload.wikimedia.org/wikipedia/commons/${firstLevel}/${secondLevel}/${filename}`;
    
    return directUrl;
  } catch (error) {
    console.error('Error converting Wikimedia URL:', error);
    return url;
  }
}

/**
 * Gets the optimal image URL for display, handling various image sources
 * 
 * @param imageUrl The original image URL
 * @param fallbackUrl Optional fallback URL if the original is invalid
 * @returns The processed image URL or fallback URL
 */
export function getOptimalImageUrl(imageUrl?: string, fallbackUrl = 'https://static.openalex.org/publisher-images/publisher-placeholder.png'): string {
  if (!imageUrl) {
    return fallbackUrl;
  }
  
  // Check if it's a Wikimedia Commons URL
  if (imageUrl.includes('commons.wikimedia.org')) {
    return getWikimediaDirectUrl(imageUrl);
  }
  
  // Return the original URL for other sources
  return imageUrl;
}

/**
 * A simple validation function to manually check the URL conversion
 * This can be used during development for quick testing
 */
export function validateWikimediaUrlConversion(url: string): { 
  original: string; 
  filename: string | null; 
  converted: string;
  hash: string | null;
} {
  const filename = extractFilenameFromUrl(url);
  const hash = filename ? md5(filename) : null;
  const converted = getWikimediaDirectUrl(url);
  
  return {
    original: url,
    filename,
    hash,
    converted
  };
} 