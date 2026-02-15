import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ArrowRight, Home } from "lucide-react"; 
import { auth, googleProvider } from "../../firebase"; // Path check kar lena
import { signInWithPopup } from "firebase/auth";
import "../../styles/Login.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- Normal Manual Login ---
  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://lucky-interior.onrender.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);

    // Agar role 'admin' hai toh seedha dashboard nahi, selection page par bhejo
    if (data.role === "admin") {
        navigate("/select-role"); 
    } else {
        navigate("/user");
    }
} else {
        alert(data.error || "Invalid login");
      }
    } catch (err) {
      alert("Server error. Please try again later.");
    }
  };

  // --- Google Login Logic (Synced with Backend) ---
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // 1. Firebase se Google Sign-In popup
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;

      // 2. Backend ko email bhej kar check karna
      const res = await fetch("https://lucky-interior.onrender.com/api/google-check/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await res.json();

      if (res.ok && data.exists) {
        // Case A: User mil gaya -> Dashboard bhejo
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
        
        data.role === "admin" ? navigate("/admin") : navigate("/user");
      } else {
        // Case B: User nahi mila -> Signup page
        alert("No account found with this Google email. Please register first.");
        navigate("/signup");
      }
    } catch (error: any) {
      if (error.code !== "auth/popup-closed-by-user") {
        alert("Google Sign-In failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wooden-login-screen">
      <div className="wood-texture-overlay"></div>
      
      <div className="glass-login-box">
        <div className="login-brand">
          <div className="brand-icon">
            <Home size={32} />
          </div>
          <h2>LuckyInterior</h2>
          <p>Design Your Legacy</p>
        </div>

        <form onSubmit={login} className="login-form-content">
          <div className="input-field">
            <User className="icon" size={20} />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="input-field">
            <Lock className="icon" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="form-helper">
             <span className="link-text" onClick={() => navigate("/signup")} style={{cursor: 'pointer'}}>
               Create Account
             </span>
             <span onClick={() => navigate("/forgot-password")}>Forget Password?</span>
          </div>

          <button type="submit" className="btn-wooden-login">
            SIGN IN <ArrowRight size={20} />
          </button>
          
          <div className="google-divider">
            <span>Or continue with</span>
          </div>

          {/* Added handleGoogleLogin here */}
          <button 
            type="button" 
            className="btn-google" 
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="G" />
            {loading ? "Verifying..." : "Google"}
          </button>
        </form>
      </div>
    </div>
  );
}