import "./App.css";
import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { setUser } from "./redux/userSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ContactForm from "./components/ContactForm";
import PageNotFound from "./components/PageNotFound";
import { toast } from "react-hot-toast";

// Lazy load your components
const Home = lazy(() => import("./components/Home"));
const SubPackageDetails = lazy(() => import("./components/SubPackageDetails"));
const NestedSubPackageDetails = lazy(() =>
  import("./components/NestedSubPackageDetails")
);
const Login = lazy(() => import("./components/Login"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const RegisterEmployee = lazy(() => import("./components/RegisterEmployee"));
const SubPackageManager = lazy(() => import("./components/SubPackageManager"));
const AdminUsersTable = lazy(() => import("./components/AdminUsersTable"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ContactUs = lazy(() => import("./components/ContactUs"));

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Fetch user data and set it in Redux (simulate login)
  useEffect(() => {
    const fetchedUserData = { role: "admin", authToken: "sample_token" };
    dispatch(setUser(fetchedUserData));
  }, [dispatch]);

  // Log token and role from Redux
  useEffect(() => {
    console.log("User Token:", user.authToken);
    console.log("User Role:", user.role);
  }, [user]);

  // Block shortcuts for opening developer tools
  useEffect(() => {
    const blockDevTools = (event) => {
      if (
        (event.ctrlKey &&
          event.shiftKey &&
          (event.key === "I" || event.key === "J")) ||
        (event.ctrlKey && event.key === "U") ||
        event.key === "F12" ||
        (event.metaKey &&
          event.shiftKey &&
          (event.key === "I" || event.key === "J")) ||
        (event.metaKey && event.key === "U")
      ) {
        event.preventDefault();
        toast.error("Developer tools are disabled on this site.", {
          position: "top-right",
        });
      }
    };

    window.addEventListener("keydown", blockDevTools);

    return () => {
      window.removeEventListener("keydown", blockDevTools);
    };
  }, []);

  // Admin dashboard path check is moved into a child component
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();
  const isSpecialRoute = [
    "/admin-dashboard",
    "/admin/login",
    "/employee",
    "/create-employee",
  ].includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar, ContactForm, and Footer based on the current route */}
      {!isSpecialRoute && <Navbar />}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/subpackages/:subPackageId"
            element={<SubPackageDetails />}
          />
          <Route
            path="/subpackages/:subPackageId/:nestedSubPackageId"
            element={<NestedSubPackageDetails />}
          />

          {/* Auth Routes */}
          <Route path="/create-employee" element={<RegisterEmployee />} />
          <Route path="/admin/sub-packages" element={<SubPackageManager />} />
          <Route path="/admin/users" element={<AdminUsersTable />} />
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute roles={["employee"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>

      {/* Conditionally render Chatbot, ContactForm, and Footer */}
      {!isSpecialRoute && <Chatbot />}
      {!isSpecialRoute && <ContactForm />}
      {!isSpecialRoute && <Footer />}
    </>
  );
}

export default App;
// perfectly working all done!
