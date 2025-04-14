import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: "dtg9htu1f",
    api_key: "274495966175717",
    api_secret: "K5KTL24O7y5z1HBkHq-VFLdzlBM"
});

export const uploadToCloudinary = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); // Using default upload preset

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dtg9htu1f/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

export default cloudinary; 