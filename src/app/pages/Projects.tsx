import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import { Layers, Home, RefreshCcw, Grid } from 'lucide-react';

export const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedDesignType, setSelectedDesignType] = useState('All');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const location = useLocation(); 
  const API_BASE = "http://127.0.0.1:8000/api";

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/projects/?format=json`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Projects API Error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (location.state && location.state.filterCategory) {
      const cat = location.state.filterCategory;
      
      if (cat === "Interior" || cat === "Exterior" || cat === "Office") {
        if (cat === "Office") {
          setSelectedZone("Interior");
        } else {
          setSelectedZone(cat);
        }
      }

      // agar category ke naam se aaya ho
      setSelectedCategory(cat);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const resetFilters = () => {
    setSelectedDesignType('All');
    setSelectedZone('All');
    setSelectedCategory('All');
  };

  const isFilterActive =
    selectedDesignType !== 'All' ||
    selectedZone !== 'All' ||
    selectedCategory !== 'All';

  // --- FILTER LOGIC WITH CATEGORY ---
  const filteredProjects = projects.filter(p => {
    const matchDesign =
      selectedDesignType === 'All' || p.design_type === selectedDesignType;

    const matchZone =
      selectedZone === 'All' || p.interior_or_exterior === selectedZone;

    const matchCategory =
      selectedCategory === 'All' ||
      (p.category_names &&
        Array.isArray(p.category_names) &&
        p.category_names.includes(selectedCategory));

    return matchDesign && matchZone && matchCategory;
  });
  // --- FILTER LOGIC END ---

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 font-['Outfit']">
        Loading projects...
      </div>
    );

  return (
    <div className="min-h-screen bg-white pb-20 font-['Outfit']">
      <div className="bg-gray-50 py-16 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            All Projects
          </h1>
          <div className="h-1 w-20 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our portfolio of interior design masterpieces.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          
          <button
            onClick={resetFilters}
            className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-xl text-sm font-bold transition-all ${
              !isFilterActive
                ? 'bg-black text-white border-black shadow-lg shadow-gray-200'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <RefreshCcw size={16} />
            Reset Filters
          </button>

          {/* Design Type */}
          <div className="relative">
            <select
              value={selectedDesignType}
              onChange={(e) => setSelectedDesignType(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 text-sm border-gray-200 rounded-xl border bg-white font-bold"
            >
              <option value="All">All Design Types</option>
              <option value="2D">2D Design</option>
              <option value="3D">3D Design</option>
            </select>
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Zone */}
          <div className="relative">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 text-sm border-gray-200 rounded-xl border bg-white font-bold"
            >
              <option value="All">All Zones</option>
              <option value="Interior">Interior</option>
              <option value="Exterior">Exterior</option>
            </select>
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 text-sm border-gray-200 rounded-xl border bg-white font-bold"
            >
              <option value="All">All Categories</option>
              {[...new Set(projects.flatMap(p => p.category_names || []))].map(
                (cat: string) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                )
              )}
            </select>
            <Grid className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const mainImage =
              project.images?.length > 0
                ? project.images[0].image
                : project.image;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Link to={`/projects/${project.id}`} className="block w-full h-full">
                  <img
                    src={mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500 text-[10px] font-bold rounded-full mb-2">
                      {project.design_type} • {project.interior_or_exterior}
                    </span>
                    <h3 className="text-white font-bold text-xl mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-xs">
                      {project.category_names?.join(', ')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 font-medium">
              No projects found with these filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 text-orange-500 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};