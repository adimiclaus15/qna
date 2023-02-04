import {createBrowserRouter, createRoutesFromElements, Navigate, Outlet, redirect, Route, RouterProvider} from "react-router-dom";
import Home from "../components/home/Home";
import Navbar from "../components/navbar/Navbar";
import ErrorPage from "../components/ErrorPage";
import Profile from "../components/profile/Profile";
import { getQuestionById, getQuestions, getUserQuestions } from "./api";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import AddQuestion from "../components/addQuestion/AddQuestion";
import Question from "../components/question/QuestionPage";
import QuestionPage from "../components/question/QuestionPage";
import EditQuestion from "../components/EditQuestion/EditQuestion";
import UserQuestions from "../components/home/UserQuestions";
import {loader as ProfileLoader} from "../components/profile/Profile"
import Suggestion from "../components/suggestion/Suggestion";

const buildElement = (props: any) => (
    <>
        <Navbar/>
        <div className = "content">
            {props}
        </div>
    </>
)

const ProtectedRoute = (props: any) => {
    const {user} = useContext(AuthContext);
    console.log("suka");
    console.log(user);
            
    if (user === undefined) {
        return <></>
    }
    // return <>mata</>
    return user ? <Outlet /> : <Navigate to="/login" />;      
} 

const Logout = (props: any) => {
    const {logout} = useContext(AuthContext);
    console.log("loggout");
    useEffect(() => {
        logout();

    }, [])
    return <Navigate to = "/login"/>
}

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route element = {<ProtectedRoute/>}>
            <Route element = {<Outlet/>} errorElement = {<ErrorPage/>}>
                <Route 
                    path = {"/"}
                    element = { buildElement(<Home/>)}
                    loader = {getQuestions}
                />
                <Route 
                    path = {"/my-questions"}
                    element = { buildElement(<UserQuestions/>)}
                    loader = {getUserQuestions}
                />
                <Route 
                    path = {"/add-question"}
                    element = {buildElement(<AddQuestion/>)}
                />
                <Route 
                    path = {"/question/:id"}
                    element = {buildElement(<QuestionPage/>)}
                    loader = {getQuestionById}
                />
                <Route 
                    path = {"/profile"}
                    element = {buildElement(<Profile/>)}
                    loader={ProfileLoader}
                />
                <Route 
                    path = {"/edit-question/:id"}
                    element = {buildElement(<EditQuestion/>)}
                    loader = {getQuestionById}
                />
                <Route 
                    path = {"/suggestion/:id"}
                    element = {buildElement(<Suggestion/>)}
                    loader = {ProfileLoader}
                />
                <Route
                    path = {"/logout"}
                    element = {<Logout/>}
                />
            </Route>
        </Route>
        <Route element = {<Outlet/>} errorElement = {<ErrorPage/>}>
            <Route 
                path = { "/login"}
                element = { <Login/>}
            />
            <Route 
                path = {"/signup"}
                element = {<Signup/>}
            />
            <Route 
                path = {"*"}
                element = {<Navigate to = "/"/>}
            />
        </Route>
    </>
));

// const router = createBrowserRouter(createRoutesFromElements(
//     <>
//         <Route element = {<ProtectedRoute/>}>
//             <Route 
//                 path = {"/"}
//                 element = { buildElement(<Home/>)}
//                 errorElement = { <ErrorPage/>}
//                 loader = {getQuestions}

//             />
//             <Route 
//                 path = {"/add-question"}
//                 element = {buildElement(<AddQuestion/>)}
//             />
//             <Route 
//                 path = {"/question/:id"}
//                 element = {buildElement(<QuestionPage/>)}
//                 loader = {getQuestionById}
//             />
//             <Route 
//                 path = {"/profile/:id"}
//                 element = {buildElement(<Profile/>)}
//             />
//             <Route 
//                 path = {"/edit-question/:id"}
//                 element = {buildElement(<EditQuestion/>)}
//                 loader = {getQuestionById}
//             />
//             <Route
//                 path = {"/logout"}
//                 element = {<Logout/>}
//             />
//         </Route>
//         <Route 
//             path = { "/login"}
//             element = { <Login/>}
//         />
//         <Route 
//             path = {"/signup"}
//             element = {<Signup/>}
//         />
//         <Route 
//             path = {"*"}
//             element = {<Navigate to = "/"/>}
//         />

//     </>
// ));


// const router = createBrowserRouter(createRoutesFromElements(
//     <Route element = {<Outlet/>} errorElement = {<ErrorPage/>}>
//         <Route element = {<ProtectedRoute/>}>
//             <Route 
//                 path = {"/"}
//                 element = { buildElement(<Home/>)}
//                 loader = {getQuestions}
//             />
//             <Route 
//                 path = {"/my-questions"}
//                 element = { buildElement(<UserQuestions/>)}
//                 loader = {getUserQuestions}
//             />
//             <Route 
//                 path = {"/add-question"}
//                 element = {buildElement(<AddQuestion/>)}
//             />
//             <Route 
//                 path = {"/question/:id"}
//                 element = {buildElement(<QuestionPage/>)}
//                 loader = {getQuestionById}
//             />
//             <Route 
//                 path = {"/profile"}
//                 element = {buildElement(<Profile/>)}
//                 loader={ProfileLoader}
//             />
//             <Route 
//                 path = {"/edit-question/:id"}
//                 element = {buildElement(<EditQuestion/>)}
//                 loader = {getQuestionById}
//             />
//             <Route 
//                 path = {"/suggestion/:id"}
//                 element = {buildElement(<Suggestion/>)}
//                 loader = {ProfileLoader}
//             />
//             <Route
//                 path = {"/logout"}
//                 element = {<Logout/>}
//             />
//         </Route>
//         <Route 
//             path = { "/login"}
//             element = { <Login/>}
//         />
//         <Route 
//             path = {"/signup"}
//             element = {<Signup/>}
//         />
//         <Route 
//             path = {"*"}
//             element = {<Navigate to = "/"/>}
//         />
//     </Route>
// ));

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Protect element = {buildElement(<Home/>)}/>,
//         errorElement: <ErrorPage/>,
//         loader: getQuestions,

//     },
//     {
//         path: "/login",
//         element: <Login/>
//     },
//     {
//         path: "/signup",
//         element: <Signup/>
//     },
//     {
//         path: "/profile/:id",
//         element: buildElement(<Profile/>)
//     },
//     {
//         path: "/add-question",
//         element: <Protect element = {buildElement(<AddQuestion/>)}/>
//     },
//     {
//         path: "/question/:id",
//         element: <Protect element = {buildElement(<QuestionPage/>)}/>,
//         loader: getQuestions,
//     }
// ]);

export default router;