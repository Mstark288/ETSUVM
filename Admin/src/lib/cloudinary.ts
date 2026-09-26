// src/lib/cloudinary.ts
export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
};

export const uploadToCloudinary = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary error details:', errorData);
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  // Note: Delete requires authentication
  // For now, we'll just return true since we can't delete without API key
  // In production, you should use a backend endpoint or signed requests
  console.log('Delete requested for:', publicId);
  return true;
};