import Navbar from "./components/Navbar/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import NotFound from "./pages/404/NotFound";
import WatchPage from "./pages/Watch/WatchPage";
import Footer from "./components/Footer/Footer";
import MoviesPage from "./pages/movies/Movies";
import { AuthProvider, useIsAuthenticated } from "react-auth-kit";
import AdminPanel from "./AdminPanel";
import Editor from "./Editor";
import Login from "./admin-components/Authentication/Login";

import GlobalStyle from "./GlobalStyle.ts";
import SignUp from "./admin-components/Authentication/Signup.jsx";
import Highlights from "./admin-components/AdminPanel/dashboard/Highlights/highlights.jsx";
import Videos from "./admin-components/AdminPanel/dashboard/Videos/Videos.jsx";

function PrivateRoute({ element, ...rest }: any) {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated() ? (
    element
  ) : (
    <Navigate
      to="/admin/auth/sign-in"
      replace
      state={{ from: rest.location }}
    />
  );
}

const App = () => {
  const location = useLocation();
  return (
    <>
      <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
      >
        {location.pathname.includes("/admin") ? "" : <Navbar />}

        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<WatchPage />} path="/watch/:id" />
          <Route element={<MoviesPage />} path="/movies" />
          <Route element={<NotFound />} path="*" />

          <Route
            path="/admin"
            element={
              <>
                <PrivateRoute element={<AdminPanel />} />
              </>
            }
          >
            <Route path="" element={<Videos />}></Route>
            <Route
              path="auth/sign-up"
              element={<PrivateRoute element={<SignUp />} />}
            ></Route>

            <Route
              element={<PrivateRoute element={<Highlights />} />}
              path="dashboard/highlights"
            ></Route>
          </Route>

          <Route
            path="/admin/edit"
            element={
              <>
                <GlobalStyle />
                <PrivateRoute element={<Editor />} />
              </>
            }
          />

          <Route path="/admin/auth/sign-in" element={<Login />}></Route>
        </Routes>
        {location.pathname.includes("/admin") ? "" : <Footer />}
      </AuthProvider>
    </>
  );
};

export default App;
