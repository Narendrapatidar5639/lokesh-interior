import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "./components/ScrollToTop";
import { Layout } from "./components/Layout";

// Pages
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects"; // ✅ Aapka asli filtering wala page
import { ProjectDetail } from "./pages/ProjectDetail";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/service";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Admin } from "./pages/admin";
import ForgotPassword from "./pages/ForgetPassword";
import RoleSelection from "./pages/RoleSelection";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Notifications ke liye */}
      <Toaster position="top-center" richColors />

      <Routes>
        {/* Layout ke andar: Header/Footer dikhega */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<Home />} />
          
          {/* ✅ /projects par ab aapka filter wala page chalega */}
          <Route path="/projects" element={<Projects />} />
          
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Services />} />
        </Route>

        {/* Layout ke bahar: No Header/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/select-role" element={<RoleSelection />} />
      </Routes>
    </BrowserRouter>
  );
}