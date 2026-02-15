import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// MapPin icon ko import kiya hai
import { ArrowLeft, Send, Phone, MessageSquare, Layers, Home, Maximize, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { FaWhatsapp } from "react-icons/fa";

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState<any[]>([]);

  const API_BASE = "http://127.0.0.1:8000";

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/api/projects/${id}/?format=json`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setActiveIndex(0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const loadFeedback = () => {
    fetch(`${API_BASE}/api/projects/${id}/feedback/`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFeedbackList(data);
        else setFeedbackList([]);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { if (id) loadFeedback(); }, [id]);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please login to submit feedback"); return; }
    if (!feedback.trim()) return;

    const res = await fetch(`${API_BASE}/api/projects/${id}/feedback/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: feedback })
    });

    if (res.ok) {
      setFeedback('');
      loadFeedback();
      toast.success("Feedback submitted successfully");
    } else {
      toast.error("Failed to submit feedback");
    }
  };

  const handleWhatsAppClick = () => {
    if (!project) return;
    const projectUrl = window.location.href;
    const message = `Hello, I'm interested in this project:\n\n*Project Name:* ${project.title}\n*Location:* ${project.design_loc}\n*Link:* ${projectUrl}\n\nI want to discuss more about this design.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${project.whatsapp_number}?text=${encodedMessage}`, '_blank');
  };

  if (loading) return <div className="text-center py-20">Loading Project...</div>;
  if (!project) return <div className="text-center py-20">Project Not Found</div>;

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-6 py-10">
        
        <Link to="/projects" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors font-medium">
          <ArrowLeft size={18} className="mr-2" /> Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-sm mb-6 border border-gray-100"
            >
              <img 
                src={project.images?.[activeIndex]?.image || project.image} 
                className="w-full h-full object-cover" 
                alt={project.title}
              />
            </motion.div>

            <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
              {project.images?.map((img: any, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveIndex(idx)}
                  className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all 
                  ${activeIndex === idx ? "border-black scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img.image} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold font-display mb-4 text-black">Project Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="mb-8">
                <h1 className="text-3xl font-bold font-display text-black mb-2">{project.title}</h1>
                <div className="h-1 w-20 bg-black"></div>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                {/* ✅ UPDATED DESIGN LOCATION SECTION */}
                <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 border border-orange-100">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Project Site</p>
                    <p className="font-semibold text-gray-800">{project.design_loc || 'Location not available'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black border border-gray-200">
                    <Maximize size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Plot Size</p>
                    <p className="font-semibold text-gray-800">{project.plot_size || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black border border-gray-200">
                    <Layers size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Design Format</p>
                    <p className="font-semibold text-gray-800">{project.design_type || '2D/3D'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black border border-gray-200">
                    <Home size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Category</p>
                    <p className="font-semibold text-gray-800">{project.interior_or_exterior || 'Interior'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black border border-gray-200">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Contact Number</p>
                    <p className="font-semibold text-gray-800">{project.contact_number}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#1eb956] transition-all shadow-md"
              >
                <FaWhatsapp size={20} /> Chat with Architect
              </button>
            </div>

            {/* Feedback Section */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={18} className="text-black" />
                <h3 className="font-bold text-black uppercase tracking-wider text-sm">Feedbacks</h3>
              </div>

              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                {feedbackList.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No feedback yet. Be the first to share your thoughts!</p>
                ) : (
                  feedbackList.map((f, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs font-bold text-black mb-1">{f.user_name || f.user}</p>
                      <p className="text-sm text-gray-600 leading-snug">{f.message}</p>
                    </div>
                  ))
                )}
              </div>

              {isLoggedIn ? (
                <form onSubmit={handleFeedbackSubmit} className="flex gap-2">
                  <input
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-all"
                    placeholder="Your feedback..."
                  />
                  <button type="submit" className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-colors">
                    <Send size={18} />
                  </button>
                </form>
              ) : (
                <Link 
                  to="/login"
                  className="block w-full py-3 text-center text-sm font-bold text-black border border-black rounded-xl hover:bg-black hover:text-white transition-all"
                >
                  Login to give feedback
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};