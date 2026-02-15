// src/services/UploadService.ts

const CLOUD_NAME = "dal0itcts"; // 👈 Apna Cloudinary Name yahan likho
const PRESET_NAME = "lucky_preset"; // 👈 Jo Preset aapne banaya wo yahan likho

export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PRESET_NAME);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary Error Data:", errorData);
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Ye aapko image ka final link (https://...) dega
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};