import React, { lazy, Suspense, ComponentType, CSSProperties } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/common/Loading";

const Home = lazy(() => import("./pages/Home"));
const Contests = lazy(() => import("./pages/Contests"));
const Contest = lazy(() => import("./pages/Contest"));
const Publish = lazy(() => import("./pages/Publish"));
const ContestCreation = lazy(() => import("./pages/ContestCreation"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const suspensify = (Component: ComponentType) => {
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
        <Component />
      </Suspense>
    );
  };

  const routes = [
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
      path: "/contest/new",
      component: ContestCreation,
    },
    {
      path: "*",
      component: NotFound,
    },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={suspensify(route.component)}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
