import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';


export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // WhatsApp configuration
  const whatsappIconUrl = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
  const phoneNumber = "919109231207"; 
  const message = encodeURIComponent("Hey, I want to create my home design like attractive.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Scroll logic to fix transparency issue
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);
  }, []);

  const logout = () => {
    localStorage.clear();
    setUsername(null);
    navigate("/login");
    window.location.reload();
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/service', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header 
      className={clsx(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-['Outfit']",
        // Mobile par solid white, Desktop par glassmorphism on scroll
        scrolled 
          ? "bg-white md:bg-white/80 md:backdrop-blur-xl shadow-md py-3" 
          : "bg-white py-5"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-transform group-hover:scale-125">
            <img 
              src="https://res.cloudinary.com/dal0itcts/image/upload/v1771077329/logo1_jmd99y.png" 
              alt="Lucky Interior" 
              className="h-10 w-10 md:h-10 md:w-15 object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="h3.text-2xl.font-bold.tracking-tight.font-display.b-border.a-mber-600 w-fit pb-1 text-gray-900 leading-none ">
              Lucky<span className="text-amber-600">Interior</span>
            </span>
            {/* <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-1">Design Studio</span> */}
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 border-r border-gray-200 pr-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  clsx(
                    "text-sm font-bold transition-all duration-300 hover:text-amber-600 tracking-wide",
                    isActive ? "text-amber-600" : "text-gray-500"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-6">
            {/* WhatsApp Link */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-transform hover:scale-110 active:scale-95"
              title="Chat on WhatsApp"
            >
              <img 
                src={whatsappIconUrl} 
                alt="WhatsApp" 
                className="h-7 w-7 drop-shadow-sm" 
              />
            </a>

            {/* Auth Section */}
            {!username ? (
              <div className="flex items-center gap-4">
                <NavLink 
                  to="/login" 
                  className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/signup" 
                  className="px-6 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-full hover:bg-amber-600 transition-all uppercase tracking-widest shadow-md"
                >
                  Signup
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-gray-50 pl-1 pr-3 py-1 rounded-full border border-gray-100">
                <div className="h-8 w-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {username[0].toUpperCase()}
                </div>
                <span className="text-sm font-bold text-gray-800">{username}</span>
                <button
                  onClick={logout}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile View Buttons */}
        <div className="flex items-center gap-4 md:hidden">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <img src={whatsappIconUrl} alt="WhatsApp" className="h-7 w-7" />
          </a>
          <button
            className="p-2 text-gray-900 bg-gray-50 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[110] md:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-black text-xl tracking-tighter uppercase">Menu</span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 bg-gray-100 rounded-full text-gray-900"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "text-3xl font-bold transition-colors",
                      isActive ? "text-amber-600" : "text-gray-400"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-gray-100">
              {!username ? (
                <div className="flex flex-col gap-4">
                  <NavLink to="/login" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-500">Login</NavLink>
                  <NavLink to="/signup" onClick={() => setIsOpen(false)} className="w-full text-center py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg">Create Account</NavLink>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <UserCircle size={30} className="text-amber-600" />
                    <span className="text-lg font-bold">{username}</span>
                  </div>
                  <button onClick={logout} className="text-red-500 font-bold">Logout</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;