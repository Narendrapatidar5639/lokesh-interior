import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlus, User, Lock, ArrowRight, ShieldCheck, Mail } from "lucide-react"; 
import "../../styles/signup.css";
import { auth, googleProvider } from "../../firebase"; 
import { signInWithPopup } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Naya Email State
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // --- Normal Signup Logic ---
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: username,
        email: email,      // Backend ko email bhej rahe hain
        password: password,
      });

      if(response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("role", "user");
      }

      setMessage("Signup successful! Redirecting...");
      setTimeout(() => navigate("/user"), 1500);

    } catch (err: any) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  // --- Google Signup Logic (Pehle jaisa hi, email already ja raha hai) ---
  const handleGoogleSignup = async () => {
    try {
      setMessage("Connecting to Google...");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: (user.displayName?.replace(/\s+/g, '_').toLowerCase() || "user") + Math.floor(Math.random() * 1000),
          email: user.email,
          role: "user"
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username || user.displayName);
        localStorage.setItem("userEmail", user.email || "");
        localStorage.setItem("role", "user");
        setMessage("Registration Successful!");
        setTimeout(() => navigate("/user"), 1000);
      } else {
        setMessage(data.error || "Backend registration failed.");
      }
    } catch (err) {
      setMessage("Google Auth Failed.");
    }
  };

  return (
    <div className="wooden-signup-screen">
      <div className="wood-texture-overlay"></div>
      <div className="glass-signup-box">
        <div className="signup-brand">
          <div className="brand-icon-signup"><UserPlus size={28} /></div>
          <h2>LuckyInterior</h2>
          <p>Start your design journey with us</p>
        </div>

        <form onSubmit={handleSignup} className="signup-form-content">
          {/* Username Field */}
          <div className="input-field">
            <User className="icon" size={18} />
            <input type="text" placeholder="Create Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          {/* Email Field - NAYA ADD KIYA HAI */}
          <div className="input-field">
            <Mail className="icon" size={18} />
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* Password Field */}
          <div className="input-field">
            <Lock className="icon" size={18} />
            <input type="password" placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn-wooden-signup">
            CREATE ACCOUNT <ArrowRight size={18} />
          </button>
          
          {message && <p className={`status-msg ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}

          <div className="google-divider"><span>Or signup with</span></div>
          <button type="button" className="btn-google" onClick={handleGoogleSignup}>
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="G" className="w-4 h-4" /> Google
          </button>

          <p className="login-footer-link">
            Already a member? <span onClick={() => navigate("/login")}>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;