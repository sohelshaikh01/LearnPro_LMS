import { supabase } from "../supabase/supabaseClient";

// to remove
// uploadFileToBucket(profileFile, "profiles");
// uploadFileToBucket(thumbnailFile, "thumbnails");
// uploadFileToBucket(lectureFile, "lectures");

const uploadFileToBucket = async (file: File, folder: string) => {
    const filePath = `${folder}/${crypto.randomUUID()}-${file.name}`;

    const { data, error } = await supabase.storage
        .from("Course_Files")
        .upload(filePath, file);

    if (error) {
        throw new Error("File Upload Error: " + error.message);
    }

    return data;
}

const deleteFileFromBucket = async (filePath: string) => {
    const { data, error } = supabase
      .from("Course_Files")
      .remove([filePath]);

      if(error) {
        throw new Error("File Delete Error: " + error.message)
      }

      return data;
}

export {
  uploadFileToBucket,
  deleteFileFromBucket
}