import { supabase } from "../supabase/supabaseClient";
import {
    uploadFileToBucket,
    deleteFileFromBucket
} from "./uploadService";

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
    email: string,
    password: string
}

//registerAsStudent - input and return type

    //registerAsInstructor

const registerAsInstructor = async (instructorDetails: InstructorDetails) => {

    const { name, email, bio, password, avatar } = instructorDetails;
    const { profession, category, company, experience, skills } = instructorDetails;

    const {data: authData, error: authError } = await supabase.auth
        .SignUp({
            email,
            password,
            options: {
                data: { role: "instructor" }
            }
        })

    console.log("Instructor Details:", instructorDetails)

    if(authError) throw new Error("Instructor Register Error" + authError);

    const user = authData.user;
    if(!user) throw new Error("Instructor registration failed");

    // profile image upload
    const result = await uploadFileToBucket(avatar, "profiles");
    const profilePath = result.path;

    const { data: instructor, error: instructorError } = await supabase
        .from("instructors")
        .insert({
            id: user.id,
            name,
            email,
            bio,
            avatar: profilePath ,
            password,
            profession,
            category,
            company,
            experience,
            skills
        })
        .select()
        .single();

    if(instructorError) return console.log(instructorError)

    return {
        authData,
        instructor,
        role: "instructor",
        jwt: authData.session?.access_token ?? null
    }
}

// supabase.storage
//   .from("course-files")
//   .createSignedUrl(profilePath, 3600);

//loginAsStudent

//loginAsInstructor
const loginAsInstructor = async({ email, password } : TypeCredentails) => {
    if(!email || !password) 
        throw new Error("Instructor Login Error: All credentials required");

    const { data: authData, error: authError } = await supabase.auth
        .SignInWithPassword({
            email,
            password
        });
        
    if(!authError) throw new Error("Instructor Login Error: Fail to login")

    return {
        authData,
        role: "instructor",
        jwt: authData.session?.access_token ?? null
    }
}

// Just 1 Function
//logoutAsStudent

//logoutAsInstructor

// user.role = user in role table
// role.table
// getAuth clearCookies + delete refreshToken

// file names + fn names to smallCase

export {
    registerAsInstructor,
    loginAsInstructor
}