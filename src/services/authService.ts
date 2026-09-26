import { supabase } from "../supabase/supabaseClient";
import {
    uploadFileToBucket,
    deleteFileFromBucket
} from "./upload/uploadService";

interface InstructorDetails {
    name: string;
    email: string;
    password: string;
    bio?: string;
    avatar?: string;
    profession?: string;
    category?: string;
    company?: string;
    experience?: number;
    skills?: string[];
}

interface TypeCredentails {
    email: string;
    password: string;
}

// registerAsStudent - input and return type

// registerAsInstructor
const registerAsInstructor = async (
    instructorDetails: InstructorDetails
) => {
    const { name, email, bio, password, avatar } = instructorDetails;
    const { profession, category, company, experience, skills } = instructorDetails;

    const { data: authData, error: authError } = await supabase.auth
        .signUp({
            email,
            password,
            options: {
                data: { role: "instructor" }
            }
        });

    if (authError)
        throw new Error("Instructor Register Error: " + authError);

    const auth_user = authData.user;

    if (!auth_user)
        throw new Error("Instructor registration failed");

    // Get authenticated user
    const { data: { user } } =
        await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not authenticated");
    }

    // profile image upload
    const result = await uploadFileToBucket(avatar, user.id);
    const profilePath = result.path;

    const { data: instructor, error: instructorError } = await supabase
        .from("Instructors")
        .insert({
            auth_id: user.id,
            name,
            email,
            bio,
            avatar: profilePath,
            profession,
            category,
            company,
            experience,
            skills
        })
        .select("-password")
        .single();

    if (instructorError)
        throw new Error(
            "Instructor creations failed: " + instructorError.message
        );

    console.log(instructor);

    return {
        authData,
        instructor,
        role: "instructor",
        jwt: authData.session?.access_token ?? null
    };
};

// supabase.storage
//   .from("course-files")
//   .createSignedUrl(profilePath, 3600);

// loginAsStudent

// loginAsInstructor
const loginAsInstructor = async ({
    email,
    password
}: TypeCredentails) => {
    if (!email || !password)
        throw new Error("Instructor Login Error: All credentials required");

    const { data: authData, error: authError } = await supabase.auth
        .signInWithPassword({
            email,
            password
        });

    if (!authError)
        throw new Error(
            "Instructor Login Error: Fail to login: " + authError
        );

    return {
        authData,
        role: "instructor",
        jwt: authData.session?.access_token ?? null
    };
};

// logoutAsStudent

// logoutAsInstructor

// user.role = user in role table
// role.table
// getAuth clearCookies + delete refreshToken

// file names + fn names to smallCase

export {
    registerAsInstructor,
    loginAsInstructor
};
