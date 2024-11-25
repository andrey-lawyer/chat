import {createBrowserRouter} from "react-router-dom";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {RegisterPage} from "../pages/RegisterPage/RegisterPage";
import {Layout} from "../components/Layout/Layout";
import {ChatPage} from "../pages/ChatPage/ChatPage";
import {ErrorPage} from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
        {
        element: <Layout />,
         children: [
                 {
                  path: "/",
                  element: <ChatPage/>
                 },
                 {
                   path: "/signup",
                   element: <RegisterPage/>,
                  },
                  {
                   path: "/signin",
                   element: <LoginPage/>,
                  },
                  {
                   path: "*",
                   element: <ErrorPage />,
                  },
                ],
         },
    ]
)