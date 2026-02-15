import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Home, ArrowLeft } from "lucide-react"; 
import "../../styles/Login.css"; 

export default function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "", new_password: "", confirm_password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          new_password: formData.new_password
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Success! Password updated.");
        navigate("/login");
      } else {
        setMessage(data.error || "Reset failed");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="wooden-login-screen">
      <div className="wood-texture-overlay"></div>
      
      <div className="glass-login-box forgot-container">
        <div className="login-brand">
          <div className="brand-icon">
            <Home size={32} />
          </div>
          {/* Color change: Black hata kar theme color set kiya */}
          <h2 style={{ color: "#f3d299", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
            Reset Password
          </h2>
          <p style={{ color: "#eee" }}>Secure your account</p>
        </div>

        <form onSubmit={handleReset} className="login-form-content">
          <div className="input-field">
            <Mail className="icon" size={20} />
            <input
              type="email"
              placeholder="Registered Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="input-field">
            <Lock className="icon" size={20} />
            <input
              type="password"
              placeholder="New Password"
              value={formData.new_password}
              onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
              required
            />
          </div>

          <div className="input-field">
            <Lock className="icon" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-wooden-login" style={{ marginTop: "10px" }}>
            UPDATE PASSWORD <ArrowRight size={20} />
          </button>
          
          {/* Back to Login separate section */}
          <div className="back-to-login" onClick={() => navigate("/login")} 
               style={{ 
                 marginTop: "20px", 
                 display: "flex", 
                 alignItems: "center", 
                 justifyContent: "center", 
                 gap: "8px", 
                 cursor: "pointer",
                 color: "#f3d299",
                 fontSize: "0.9rem"
               }}>
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </div>

          {message && <p className="error-msg" style={{ textAlign: "center", marginTop: "15px", color: "#ff6b6b" }}>{message}</p>}
        </form>
      </div>

      {/* Mobile Responsive Style (In-line) */}
      <style>{`
        @media (max-width: 480px) {
          .glass-login-box {
            width: 90%;
            padding: 20px;
          }
          .login-brand h2 {
            font-size: 1.5rem;
          }
          .input-field input {
            font-size: 14px;
          }
          .btn-wooden-login {
            padding: 12px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}