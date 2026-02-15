import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Box, Map, Layout, Zap } from "lucide-react";
import { CATEGORIES } from "../data/mockData";
import { useEffect, useState, useRef } from "react";
import LoginPopup from "./LoginPopup";

// --- Helper Components ---
const Counter = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2.5, ease: "easeOut" });
    }
  }, [isInView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const API_BASE = "http://127.0.0.1:8000/api";

  const isUserLoggedIn = !!localStorage.getItem("username");
  const baseClients = 2153;
  const satisfiedClientsCount = isUserLoggedIn ? baseClients + 1 : baseClients;

  const startYear = 2015;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - startYear;

  const baseRenders = 10000;
  const totalRenders = baseRenders + (featuredProjects.length || 50);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects/`);
        const data = await res.json();
        setFeaturedProjects(data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchLatest();

    // Logic: Only show popup once per session
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    const timer = setTimeout(() => {
      if (!isUserLoggedIn && !hasSeenPopup) {
        setShowPopup(true);
        sessionStorage.setItem("hasSeenPopup", "true");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isUserLoggedIn]);

  const handleCategoryClick = (categoryName: string) => {
    navigate("/projects", { state: { filterCategory: categoryName } });
  };

  return (
    <>
      {showPopup && <LoginPopup close={() => setShowPopup(false)} />}

      <div className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight">
                Design Your <br />
                <span className="text-gray-200">Dream Home</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                We create modern, stylish and functional interior designs for your home and office.
              </p>
              <div className="pt-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Projects
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 1. Core Company Values (Optimized Height & Zig-Zag) */}
        <section className="relative py-24 px-6 bg-white overflow-hidden border-b border-gray-50">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <img src="https://www.transparenttextures.com/patterns/blueprint.png" alt="blueprint" className="w-full h-full" />
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="text-gray-400 uppercase tracking-[0.3em] text-sm font-bold">[ OUR EXPERTISE ]</span>
              <h2 className="text-4xl md:text-5xl font-light mt-4 leading-tight text-gray-900">Transforming Ideas into Reality</h2>
              <div className="w-24 border-t-2 border-black mx-auto mt-6"></div>
            </div>

            <div className="space-y-24">
              {/* Row 1: 2D Layout - Text Left, Image Right */}
              <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex-1 space-y-6"
                >
                  <div className="flex items-center gap-4 text-blue-600">
                    <Layout size={32} />
                    <h3 className="text-3xl font-bold text-gray-900">2D Layout & Planning</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Precision is the foundation of every masterpiece. Our 2D layouts define the flow and functionality of your space, ensuring every square inch serves a purpose.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-500 font-medium">
                    <li className="flex items-center gap-2 text-sm">✓ Space Optimization</li>
                    <li className="flex items-center gap-2 text-sm">✓ Furniture Mapping</li>
                    <li className="flex items-center gap-2 text-sm">✓ Electrical Routes</li>
                    <li className="flex items-center gap-2 text-sm">✓ Structural Planning</li>
                  </ul>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-1 w-full"
                >
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-[350px] md:h-[400px]">
                    <img 
                      src="https://res.cloudinary.com/dal0itcts/image/upload/v1771073382/media/projects/core_company_llfgok.jpg" 
                      alt="Professional 2D Blueprint" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </motion.div>
              </div>

              {/* Row 2: 3D Modeling - Image Left, Text Right */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-10 lg:gap-16">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex-1 space-y-6"
                >
                  <div className="flex items-center gap-4 text-purple-600">
                    <Zap size={32} />
                    <h3 className="text-3xl font-bold text-gray-900">3D Realistic Modeling</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Experience your future home before the first brick is laid. We create high-fidelity 3D renders that capture textures, lighting, and emotions with stunning accuracy.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-500 font-medium">
                    <li className="flex items-center gap-2 text-sm">✓ Realistic Textures</li>
                    <li className="flex items-center gap-2 text-sm">✓ Natural Lighting</li>
                    <li className="flex items-center gap-2 text-sm">✓ 360° Walkthroughs</li>
                    <li className="flex items-center gap-2 text-sm">✓ Material Selection</li>
                  </ul>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-1 w-full"
                >
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-[350px] md:h-[400px]">
                    <img 
                      src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="3D Visualization" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-12"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center font-display">
                Explore by Category
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {CATEGORIES.map((category) => (
                  <motion.div
                    key={category.id}
                    variants={fadeInUp}
                    onClick={() => handleCategoryClick(category.name)}
                    role="button"
                    className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-xl font-bold tracking-wide">{category.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Stats Section */}
        <section className="bg-white border-y border-gray-100 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-2">
                <h3 className="text-6xl font-light text-gray-800"><Counter value={satisfiedClientsCount} />+</h3>
                <p className="text-xs tracking-widest text-gray-500 font-bold uppercase">Satisfied Clients</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-6xl font-light text-gray-800"><Counter value={experienceYears} />+</h3>
                <p className="text-xs tracking-widest text-gray-500 font-bold uppercase">Years of Experience</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-6xl font-light text-gray-800"><Counter value={totalRenders} />+</h3>
                <p className="text-xs tracking-widest text-gray-500 font-bold uppercase">Renders</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Detailed Sketch Section */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-12 relative">
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Detail" className="w-full h-96 object-cover rounded-lg shadow-lg" />
              <div className="md:absolute -bottom-10 -right-10 w-full md:w-3/4 bg-white p-4 shadow-2xl">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrSM8VAmzXrWkUkWZiAWMrZTDr6x761XmxxA&s" alt="Sketching" className="w-full h-auto" />
              </div>
            </div>
            <div className="pt-8">
              <h2 className="text-5xl font-light mb-6">A Sketch of Each Detail</h2>
              <div className="w-16 border-t-2 border-dotted border-gray-400 mb-8"></div>
              <p className="text-gray-600 leading-relaxed text-lg mb-12">
                We don't just render interiors, we bring them to life. Every curve, shadow, texture, and play of light is carefully planned to reflect your personality and purpose.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <Box className="w-10 h-10 text-gray-400" strokeWidth={1}/>
                  <h4 className="text-2xl font-light">3D Visualization</h4>
                  <p className="text-gray-500 text-sm">Walk through your future space before a single wall is built.</p>
                </div>
                <div className="space-y-4">
                  <Map className="w-10 h-10 text-gray-400" strokeWidth={1} />
                  <h4 className="text-2xl font-light">Custom Design</h4>
                  <p className="text-gray-500 text-sm">Whether a boutique residence or commercial landmark — we shape ideas into reality.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Projects */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display">Our Latest Projects</h2>
              <Link to="/projects" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-black font-medium">
                View All <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <img 
                      src={project.image || (project.images && project.images[0]?.image) || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-500">
                    {project.category_names && project.category_names.length > 0 ? project.category_names.join(", ") : "Design"}
                  </p>
                </Link>
              ))}
              {featuredProjects.length === 0 && <p className="text-gray-400 col-span-3 text-center">Loading latest projects...</p>}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="flex flex-col md:flex-row min-h-[600px]">
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80" alt="Meeting" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 bg-gray-50 flex flex-col justify-center px-10 md:px-20 py-20 relative">
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/white-marble.png')]"></div>
            <div className="relative z-10">
              <span className="text-gray-400 text-xs tracking-[0.4em] font-bold uppercase mb-4 block">[ TESTIMONIALS ]</span>
              <h2 className="text-5xl font-light mb-2">What People Say</h2>
              <div className="w-12 border-t border-black mb-12"></div>
              <p className="text-2xl italic text-gray-700 font-light leading-relaxed">
                “You will never fake the feeling of being in such a place. The live minimalism base on the natural materials and alive unprocessed textures — true, authentic, close to nature.”
              </p>
              <div className="mt-8">
                <p className="font-bold text-lg">Alex Rivenson</p>
                <p className="text-gray-500 uppercase text-xs tracking-widest">Lead Architect</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Why Choose Us?</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  We bring your vision to life with our expertise in interior design.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {["Professional Designers", "Affordable Pricing", "High Quality Work", "Customer Satisfaction"].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-400" size={24} />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" alt="Office Interior" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};