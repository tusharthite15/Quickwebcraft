import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "./config";
import {NextUIProvider} from "@nextui-org/react";
// import toggl_loader from '../src/assets/toggl_loader.gif';

const LandingPage = lazy(() => import("./Landing"));
const AccountAccess = lazy(() => import("./AccountAccess"));
const Projects = lazy(() => import("./Projects"));
const Editor = lazy(() => import("./editor"));
const ManageBlock = lazy(() => import("./Pages/ManageBlock"));
const PrivacyPolicy = lazy(() => import("./Landing/privacy-policy"));
const UpdateBlock = lazy(() => import("./Pages/ManageBlock/UpdateBlock"));
const ManageCat = lazy(() => import("./Pages/ManageBlock/ManageCat"));
// const ManageAll = lazy(() => import("./Pages/ManageBlock/ManageAll"));
const Subdomain = lazy(() => import("./Publish/Subdomain"));
const CustomDomain = lazy(() => import("./Publish/CustomDomain"));

const getRoutesForDomain = () => {
  const hostname = window.location.hostname;

  if (
    (hostname.endsWith(".localhost") || hostname.endsWith(".toggle.site") || hostname.endsWith(".toggl.site") || hostname.endsWith(".toggl.app")) && !((hostname.endsWith("www.toggl.app")) || (hostname.endsWith("www.toggl.site")))
  ) {
    return [
      { path: "/:path", element: <Subdomain /> },
      { path: "/", element: <Subdomain /> },
    ];
  } else if (
    (hostname !== "localhost" && hostname !== "www.toggl.com" && hostname !== "www.toggl.site" && hostname !== "toggl.site" && hostname !== "www.toggl.app" && hostname !== "toggl.app")
  ) {
    return [
      { path: "/:path", element: <CustomDomain /> },
      { path: "/", element: <CustomDomain /> },
    ];
  }

  // If the domain is toggl.com or www.toggl.com
  return [{ path: "/", element: <LandingPage /> }];
};

const getDefaultRoutes = () => [
  {
    path: "/signup",
    element: <AccountAccess />,
  },
  {
    path: "/signin",
    element: <AccountAccess />,
  },
  {
    path: "/login",
    element: <AccountAccess />,
  },
  {
    path: "/projects/:userid",
    element: <Projects />,
  },
  
  {
    path: "/editor/:projectid",
    element: <Editor />,
  },
  {
    path: "/admin/manageblock",
    element: <ManageBlock />,
  },
  {
    path: "/update-block/:id",
    element: <UpdateBlock />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
 {
    path: "/admin/managecat",
    element: <ManageCat />,
  },
  {
    path: "/admin/manageall",
    element: <ManageCat />,
  },
];

function App() {
  const hostname = window.location.hostname;

  // Decide which routes to use
  const router = createBrowserRouter([
    ...getRoutesForDomain(),
    ...(hostname === "localhost" || hostname === "www.toggl.com" || hostname === "www.toggl.app" || hostname === "toggl.app" || hostname === "toggl.site" || hostname === "www.toggl.site"
      ? getDefaultRoutes()
      : []),
  ]);

  return (
    <Provider>
  <NextUIProvider>
  <Suspense fallback={<div className="flex justify-center items-center h-screen"></div>}>
        <RouterProvider router={router} />
      </Suspense>
      </NextUIProvider>
    </Provider>
  );

}

export default App;
