import './index.css'
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

// --- Comment routes ---

// Auth pages
import AuthLayout from "./layout/AuthLayout.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";

// Instructor pages
import InstructorLayout from "./layout/InstructorLayout";
import InstructorHome from './pages/instructor/InstructorHome';
import InstructorCourses from "./pages/instructor/InstructorCourses";
import CourseCreate from './pages/instructor/CourseCreate';
import CourseManage from './pages/instructor/CourseManage.jsx';
import CourseSyllabus from './pages/instructor/CourseSyllabus';
import InstructorRevenue from './pages/instructor/InstructorRevenue';
import InstructorProfile from './pages/instructor/InstructorProfile';

// Student pages
import StudentLayout from "./layout/StudentLayout";
import StudentHome from './pages/student/StudentHome.tsx';
import ExploreCourses from './pages/student/ExploreCourses.tsx';
import MyCourses from './pages/student/MyCourses.tsx';
import CourseHome from './pages/student/CourseHome.tsx';
import LearnPage from './pages/student/LearnPage.tsx';
import StudentPurchases from './pages/student/StudentPurchases.tsx';
import Certificates from './pages/student/Certificates.tsx';
import CertificateDetail from './pages/student/CertificateDetail.tsx';

const App = () => {

    const { userData, status } = useSelector((state) => state.auth);
    
    const router = createBrowserRouter([
        !status ? ({
            path: "/",
            element: <AuthLayout />,
            children: [
                { index: true, element: <Navigate to="/login" replace /> },
                { path: "/login", element: <LoginPage/> },
                { path: "/signup", element: <SignupPage/> }
                // login - inst + stud
                // register - inst + stud
            ]
        }) :
        ( userData.role === "instructor" ? ({
            path: "/",
            element: <InstructorLayout />,
            children: [
                { path: "/home", element: <InstructorHome/>},
                { path: "/courses", element: <InstructorCourses/> },
                { path: "/courses/create", element: <CourseCreate/> },
                { path: "/course/:courseId", element: <CourseManage/> },
                { path: "/courses/:courseId/edit-syllabus", element: <CourseSyllabus/> },
                { path: "/revenue", element: <InstructorRevenue/> },
                { path: "/profile/:ownerId", element: <InstructorProfile/> }
                // home - inst + add
                // courses - my-courses
                // courses/create - form
                // course/:courseId - details + inst + mod
                // courses/:courseId/edit-syllabus - course moduels
                // revenue - list of revenue
                // profile/:ownerId - avatar + professional details
            ]
        }) : ({
            path: "/",
            element: <StudentLayout />,
            children: [
                { path: "/home", element: <StudentHome/> },
                { path: "/explore", element: <ExploreCourses/> },
                { path: "/my-courses", element: <MyCourses/> },
                { path: "/course/:courseId", element: <CourseHome /> },
                { path: "/learn/:courseId", element: <LearnPage /> },
                { path: "/purchases", element: <StudentPurchases/> },
                { path: "/certificate", element: <Certificates/> },
                { path: "/certificate/:certId", element: <CertificateDetail/> }
                // home - streak + courses + tasks
                // explore - search courses
                // my-courses - courses + favorite
                // course/:courseId - purchase + learn
                // learn/:courseId/:moduleId/:chapterId - course track

                // purchases - purchase-list
                // certificate - certificate-list
                // certificate/:certId - specific certificate
            ]
        }) )
    ])

    return <RouterProvider router={router} />
}

export default App;
