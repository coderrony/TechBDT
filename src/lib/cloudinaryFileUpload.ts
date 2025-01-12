
import cloudinary from '@/services/cloudinary';

export const uploadFileByCloudinary = async(file : File,path:string)=>{ 
        const fileBuffer = await file.arrayBuffer();
        const base64String = `data:${file.type};base64,${Buffer.from(
          fileBuffer,
        ).toString('base64')}`;
  
        const uploadResult = await cloudinary.uploader.upload(base64String, {
          folder: path,
          transformation: [
            {
              quality: 'auto',
              fetch_format: 'auto',
            },
          ],
        });
      return uploadResult
}