import React, { lazy, Suspense, ComponentType, CSSProperties } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/common/Loading";
import AuthContextProvider from "./contexts/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const Contests = lazy(() => import("./pages/Contests"));
const Contest = lazy(() => import("./pages/Contest"));
const Publish = lazy(() => import("./pages/Publish"));
const Rate = lazy(() => import("./pages/Rate"));
const ContestModification = lazy(() => import("./pages/ContestModification"));
const EntryForm = lazy(() => import("./pages/EntryForm"));
const ContestCreation = lazy(() => import("./pages/ContestCreation"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  // const suspensify = (Component: ComponentType) => {
  //   const suspenseStyles: CSSProperties = {
  //     width: "100%",
  //     height: "100vh",
  //     backgroundColor: "var(--primary-color)",
  //   };

  //   return (
  //     <Suspense
  //       fallback={
  //         <div style={suspenseStyles}>
  //           <Loading text="" />
  //         </div>
  //       }
  //     >
  //       <Component />
  //     </Suspense>
  //   );
  // };

  const SuspenseWrapper = ({
    lazyComponent,
  }: {
    lazyComponent: React.LazyExoticComponent<() => JSX.Element>;
  }) => {
    const suspenseStyles: CSSProperties = {
      width: "100%",
      height: "100vh",
      backgroundColor: "var(--primary-color)",
    };

    return (
      <Suspense
        fallback={
          <div style={suspenseStyles}>
            <Loading text="" />
          </div>
        }
      >
        {React.createElement(lazyComponent)}
      </Suspense>
    );
  };

  const authorize = (
    Component: React.LazyExoticComponent<() => JSX.Element>
  ) => {
    const suspenseStyles: CSSProperties = {
      width: "100%",
      height: "100vh",
      backgroundColor: "var(--primary-color)",
    };

    return (
      <AuthContextProvider>
        <Suspense
          fallback={
            <div style={suspenseStyles}>
              <Loading text="" />
            </div>
          }
        >
          <Component />
        </Suspense>
      </AuthContextProvider>
    );
  };

  const protectedRoutes = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/contests",
      component: Contests,
    },
    {
      path: "/contests/:id/preview",
      component: Contest,
    },
    {
      path: "/contests/:id/publish",
      component: Publish,
    },
    {
      path: "/contests/:id/rate",
      component: Rate,
    },
    {
      path: "/contests/:id/modify",
      component: ContestModification,
    },
    {
      path: "/contest/new",
      component: ContestCreation,
    },
  ];

  const publicRoutes = [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/forms/:id/",
      component: EntryForm,
    },
    {
      path: "*",
      component: NotFound,
    },
  ];

  return (
    <Router>
      <Routes>
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={authorize(route.component)}
          />
        ))}
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<SuspenseWrapper lazyComponent={route.component} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
