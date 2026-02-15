import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Correct Import for redirection
import { 
  Home, 
  Trees, 
  Layers, 
  Lightbulb, 
  Paintbrush, 
  HardHat, 
  ArrowRight,
  CheckCircle2
} from "lucide-react"; // ❌ Yahan se 'Link' hata diya hai

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const services = [
  {
    title: "Interior Design",
    description: "Creating functional and aesthetic living spaces tailored to your lifestyle.",
    icon: <Home className="w-10 h-10" />,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Space Planning", "Furniture Design", "Material Selection"]
  },
  {
    title: "Exterior Architecture",
    description: "Modern facade designs and structural planning that make a statement.",
    icon: <Layers className="w-10 h-10" />,
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Facade Design", "3D Elevation"]
  },
  {
    title: "Landscape Design",
    description: "Transforming outdoor areas into lush, peaceful retreats.",
    icon: <Trees className="w-10 h-10" />,
    image: "https://images.pexels.com/photos/413195/pexels-photo-413195.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Garden Layout", "Sustainable Greenery"]
  },
  {
    title: "3D Rendering & Viz",
    description: "Hyper-realistic 3D visualizations that let you experience your space.",
    icon: <Lightbulb className="w-10 h-10" />,
    image: "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["VR Walkthrough", "Photorealistic Renders"]
  },
  {
    title: "Project Supervision",
    description: "Full site management to ensure quality and timeline adherence.",
    icon: <HardHat className="w-10 h-10" />,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=800&q=80",
    features: ["Site Inspection", "Quality Control"]
  },
  {
    title: "Commercial Spaces",
    description: "Productive and modern office environments that boost creativity.",
    icon: <Paintbrush className="w-10 h-10" />,
    image: "https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Office Ergonomics", "Brand Integration"]
  }
];

export const Services = () => {
  return (
    <div className="bg-white">
      {/* --- Hero Section --- */}
      <section className="relative py-32 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.pexels.com/photos/3133688/pexels-photo-3133688.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="bg" 
            className="w-full h-full object-cover" 
            crossOrigin="anonymous"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-blue-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            Premium Solutions
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extralight mt-4 mb-6 leading-tight"
          >
            Elevating Spaces Through <br /> <span className="font-bold">Expert Design</span>
          </motion.h1>
        </div>
      </section>

      {/* --- Services Grid --- */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              {...fadeInUp}
              className="group flex flex-col h-full border border-gray-100 p-6 rounded-3xl hover:shadow-2xl transition-all duration-500 bg-white"
            >
              <div className="mb-6 text-blue-600 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-500 mb-6 flex-grow leading-relaxed">{service.description}</p>

              <div className="relative h-52 rounded-2xl overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
              </div>

              <div className="space-y-3 mb-4">
                {service.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                    <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> {feat}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="bg-gray-900 rounded-[2.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
            Start Your Design Journey
          </h2>
          
          <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto relative z-10">
            Contact us for a tailored quote and transform your vision into a living masterpiece.
          </p>
          
          <div className="flex justify-center relative z-10">
            <Link 
              to="/contact" 
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 w-fit"
            >
              <span>Book Consultation</span>
              <ArrowRight size={22} className="text-white flex-shrink-0" strokeWidth={3} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};