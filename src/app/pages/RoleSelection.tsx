import { useNavigate } from "react-router-dom";
import { LayoutDashboard, UserCircle, Home, ArrowRight } from "lucide-react"; 
import "../../styles/Login.css";

export default function RoleSelection() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  return (
    <div className="wooden-login-screen">
      <div className="wood-texture-overlay"></div>
      
      <div className="glass-login-box" style={{ maxWidth: "450px" }}>
        <div className="login-brand">
          <div className="brand-icon">
            <Home size={32} />
          </div>
          <h2 style={{ color: "#f3d299" }}>Welcome Admin</h2>
          <p style={{ color: "#eee" }}>{username}, where would you like to go?</p>
        </div>

        <div className="login-form-content" style={{ gap: "20px", marginTop: "20px" }}>
          
          {/* Admin Dashboard Option */}
          <button 
            className="btn-wooden-login" 
            onClick={() => navigate("/admin")}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LayoutDashboard size={20} />
                <span>ADMIN DASHBOARD</span>
            </div>
            <ArrowRight size={18} />
          </button>

          {/* User Dashboard Option */}
          <button 
            className="btn-wooden-login" 
            onClick={() => navigate("/user")}
            style={{ 
                background: "rgba(255, 255, 255, 0.1)", 
                border: "1px solid rgba(243, 210, 153, 0.3)",
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserCircle size={20} />
                <span>USER DASHBOARD</span>
            </div>
            <ArrowRight size={18} />
          </button>

          <p onClick={() => { localStorage.clear(); navigate("/login"); }} 
             style={{ textAlign: 'center', color: '#f3d299', cursor: 'pointer', fontSize: '14px', marginTop: '10px' }}>
            Logout & Exit
          </p>
        </div>
      </div>
    </div>
  );
}