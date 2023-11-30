import React, { lazy, Suspense, ComponentType, CSSProperties } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));

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
            {/* <Loading text="" /> */}
            loading...
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
