import { useState, useEffect } from 'react';
import { Trash2, Plus, LayoutDashboard, FolderPlus, MessageSquare, Edit3, LogOut, Save, ArrowLeft, X, Image as ImageIcon, UploadCloud, Menu, Loader2, MapPin } from 'lucide-react'; // MapPin icon add kiya
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { uploadToCloudinary } from "../../services/UploadService";

type AdminView = 'dashboard' | 'add-project' | 'feedbacks' | 'edit-project';

export const Admin = () => {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [selectedNewImages, setSelectedNewImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    description: '',
    plot_size: '',
    design_loc: '', // ✅ New field
    contact_number: '',
    whatsapp_number: '',
    design_type: '2D',
    interior_or_exterior: 'Interior',
  });

  const API_BASE = "https://lucky-interior.onrender.com/api";
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeView]);

  useEffect(() => {
    fetchProjects();
    fetch(`${API_BASE}/categories/`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Category Error:", err));
  }, []);

  const fetchProjects = () => {
    fetch(`${API_BASE}/projects/`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        fetchFeedbacks(data);
      });
  };

  const fetchFeedbacks = async (projectsList: any[]) => {
    try {
      const allFeedbacks: any[] = [];
      for (const p of projectsList) {
        const res = await fetch(`${API_BASE}/projects/${p.id}/feedback/`, {
          headers: { Authorization: `Token ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          data.forEach((f: any) =>
            allFeedbacks.push({ ...f, project_id: p.id, project_title: p.title })
          );
        }
      }
      setFeedbacks(allFeedbacks);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`${API_BASE}/projects/${id}/delete/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    if (res.ok) { fetchProjects(); toast.success("Project Deleted"); }
  };

  const handleDeleteFeedback = async (id: number) => {
    if (!confirm("Delete this feedback?")) return;
    const res = await fetch(`${API_BASE}/feedbacks/${id}/delete/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    if (res.ok) {
      setFeedbacks(prev => prev.filter(f => f.id !== id));
      toast.success("Feedback Deleted");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedNewImages(prev => [...prev, ...files]);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...urls]);
    }
  };

  const removeSelectedImage = (index: number) => {
    setSelectedNewImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const deleteExistingImage = async (imageId: number) => {
    if (!confirm("Delete image?")) return;
    const res = await fetch(`${API_BASE}/images/${imageId}/delete/`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` }
    });
    if (res.ok) {
      setEditingProject({
        ...editingProject,
        images: editingProject.images.filter((img: any) => img.id !== imageId)
      });
      toast.success("Image removed");
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toast.error("Please login again");
    if (!newProject.category) return toast.error("Please select a category!");
    if (selectedNewImages.length === 0) return toast.error("Please select at least one image!");

    setIsUploading(true);
    const toastId = toast.loading("Uploading images to Cloudinary...");

    try {
      const uploadedUrls = await Promise.all(
        selectedNewImages.map(file => uploadToCloudinary(file))
      );
      const validUrls = uploadedUrls.filter(url => url !== null);

      if (validUrls.length === 0) {
        setIsUploading(false);
        return toast.error("Image upload failed!", { id: toastId });
      }

      const payload = {
        ...newProject,
        categories: [newProject.category],
        image_urls: validUrls
      };

      const res = await fetch(`${API_BASE}/projects/add/`, {
        method: "POST",
        headers: { 
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Project Published!", { id: toastId });
        setActiveView("dashboard");
        fetchProjects();
        setNewProject({ title: '', category: '', description: '', plot_size: '', design_loc: '', contact_number: '', whatsapp_number: '', design_type: '2D', interior_or_exterior: 'Interior' });
        setSelectedNewImages([]); setPreviewUrls([]);
      } else {
        toast.error("Failed to save project in Database", { id: toastId });
      }
    } catch (err) { 
      toast.error("Network error!", { id: toastId }); 
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    const toastId = toast.loading("Updating project...");

    try {
      let newUrls: string[] = [];
      if (selectedNewImages.length > 0) {
        const uploads = await Promise.all(selectedNewImages.map(file => uploadToCloudinary(file)));
        newUrls = uploads.filter(url => url !== null) as string[];
      }

      const payload = {
        ...editingProject,
        categories: [editingProject.category],
        new_image_urls: newUrls
      };

      const res = await fetch(`${API_BASE}/projects/${editingProject.id}/update/`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) { 
        toast.success("Project Updated!", { id: toastId }); 
        setActiveView("dashboard"); 
        fetchProjects(); 
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] font-['Outfit'] relative">
      
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <aside className={clsx(
        "bg-white border-r fixed h-full flex flex-col z-50 shadow-sm transition-all duration-300 w-64",
        isSidebarOpen ? "left-0" : "-left-64 lg:left-0"
      )}>
        <div className="p-6 font-bold text-2xl tracking-tight text-black border-b flex justify-between items-center">
          <span>Admin<span className="text-orange-500">Panel</span></span>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}><X /></button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveView('dashboard')} className={clsx("w-full flex items-center p-3 rounded-xl gap-3 transition-all", activeView === 'dashboard' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100')}>
            <LayoutDashboard size={20}/> Dashboard
          </button>
          <button onClick={() => {setActiveView('add-project'); setPreviewUrls([]); setSelectedNewImages([])}} className={clsx("w-full flex items-center p-3 rounded-xl gap-3 transition-all", activeView === 'add-project' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100')}>
            <FolderPlus size={20}/> Add Project
          </button>
          <button onClick={() => setActiveView('feedbacks')} className={clsx("w-full flex items-center p-3 rounded-xl gap-3 transition-all", activeView === 'feedbacks' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100')}>
            <MessageSquare size={20}/> Feedbacks
          </button>
        </nav>
        <div className="p-4 border-t">
          <button onClick={() => {localStorage.clear(); navigate('/login')}} className="flex items-center text-red-500 gap-2 p-3 w-full font-bold hover:bg-red-50 rounded-xl transition-colors">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 lg:p-8 w-full lg:ml-64 transition-all">
        <div className="max-w-6xl mx-auto">
          
          <div className="lg:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm">
             <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-100 rounded-lg"><Menu /></button>
             <h1 className="font-bold text-lg uppercase tracking-widest">Admin</h1>
             <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">A</div>
          </div>

          {activeView === 'dashboard' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Project Inventory</h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">{projects.length} Total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                    <tr>
                      <th className="p-4 font-semibold">Project</th>
                      <th className="p-4 font-semibold">Details</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {projects.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <img src={p.images?.[0]?.image} className="w-12 h-10 md:w-16 md:h-12 rounded-lg object-cover bg-gray-100 shadow-sm" alt="thumb"/>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800 text-sm md:text-base">{p.title}</span>
                                <span className="text-[10px] text-gray-400 flex items-center gap-1"><MapPin size={10}/> {p.design_loc || 'Not specified'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                            <span className="block font-medium text-orange-600">{p.category_names?.[0] || 'No Category'}</span>
                            <span>{p.plot_size}</span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={()=>{setEditingProject(p);setActiveView('edit-project'); setPreviewUrls([]); setSelectedNewImages([])}} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"><Edit3 size={18}/></button>
                            <button onClick={()=>handleDelete(p.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><Trash2 size={18}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(activeView === 'add-project' || activeView === 'edit-project') && (
            <div className="bg-white p-4 lg:p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <button onClick={() => setActiveView('dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft /></button>
                  <h2 className="text-xl md:text-2xl font-black italic underline decoration-orange-400">{activeView === 'add-project' ? 'PUBLISH NEW' : 'UPDATE PROJECT'}</h2>
                </div>
              </div>

              <form onSubmit={activeView === 'add-project' ? handleSaveProject : handleUpdateProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-400 mb-1 block tracking-widest">Project Name</label>
                      <input className="w-full p-3 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-orange-200 outline-none font-medium" value={activeView === 'edit-project' ? editingProject.title : newProject.title} onChange={e => activeView === 'edit-project' ? setEditingProject({ ...editingProject, title: e.target.value }) : setNewProject({ ...newProject, title: e.target.value })} required />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-400 mb-1 block tracking-widest">Description</label>
                      <textarea rows={4} className="w-full p-3 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-orange-200 outline-none font-medium" value={activeView === 'edit-project' ? editingProject.description : newProject.description} onChange={e => activeView === 'edit-project' ? setEditingProject({ ...editingProject, description: e.target.value }) : setNewProject({ ...newProject, description: e.target.value })} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-gray-400 mb-1 block tracking-widest">Category</label>
                        <select className="w-full p-3 bg-gray-50 border-none rounded-2xl outline-none font-bold text-gray-700" value={activeView === 'edit-project' ? editingProject.category : newProject.category} onChange={e => activeView === 'edit-project' ? setEditingProject({...editingProject, category: e.target.value}) : setNewProject({...newProject, category: e.target.value})} required>
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-gray-400 mb-1 block tracking-widest">Plot Size</label>
                        <input className="w-full p-3 bg-gray-50 border-none rounded-2xl outline-none" placeholder="e.g. 30x50 ft" value={activeView === 'edit-project' ? editingProject.plot_size : newProject.plot_size} onChange={e => activeView === 'edit-project' ? setEditingProject({ ...editingProject, plot_size: e.target.value }) : setNewProject({ ...newProject, plot_size: e.target.value })} />
                      </div>
                      
                      {/* ✅ DESIGN LOCATION FIELD ADDED HERE */}
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold uppercase text-gray-400 mb-1 block tracking-widest">Project Site Location (design_loc)</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18}/>
                            <input className="w-full p-3 pl-10 bg-gray-50 border-none rounded-2xl outline-none font-medium" placeholder="e.g. Devi Village, Mandsaur" value={activeView === 'edit-project' ? editingProject.design_loc : newProject.design_loc} onChange={e => activeView === 'edit-project' ? setEditingProject({ ...editingProject, design_loc: e.target.value }) : setNewProject({ ...newProject, design_loc: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-gray-400 mb-1 block tracking-widest">Design Type</label>
                        <select className="w-full p-3 bg-gray-50 border-none rounded-2xl outline-none font-bold" value={activeView === 'edit-project' ? editingProject.design_type : newProject.design_type} onChange={e => activeView === 'edit-project' ? setEditingProject({ ...editingProject, design_type: e.target.value }) : setNewProject({ ...newProject, design_type: e.target.value })}>
                          <option value="2D">2D</option><option value="3D">3D</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-gray-400 mb-1 block tracking-widest">Zone</label>
                        <select className="w-full p-3 bg-gray-50 border-none rounded-2xl outline-none font-bold" value={activeView === 'edit-project' ? editingProject.interior_or_exterior : newProject.interior_or_exterior} onChange={e => activeView === 'edit-project' ? setEditingProject({ ...editingProject, interior_or_exterior: e.target.value }) : setNewProject({ ...newProject, interior_or_exterior: e.target.value })}>
                          <option value="Interior">Interior</option><option value="Exterior">Exterior</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-400 mb-1 block tracking-widest">WhatsApp Number</label>
                      <input className="w-full p-3 bg-gray-50 border-none rounded-2xl outline-none" value={activeView === 'edit-project' ? editingProject.whatsapp_number : newProject.whatsapp_number} onChange={e => activeView === 'edit-project' ? setEditingProject({ ...editingProject, whatsapp_number: e.target.value }) : setNewProject({ ...newProject, whatsapp_number: e.target.value })} />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed">
                  <h3 className="text-sm font-black uppercase text-gray-400 mb-4 flex items-center gap-2"><ImageIcon size={16}/> Media Gallery</h3>
                  
                  {activeView === 'edit-project' && editingProject.images?.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-bold text-blue-500 mb-2">Current Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {editingProject.images.map((img: any) => (
                          <div key={img.id} className="relative group w-20 h-20 rounded-xl overflow-hidden border">
                            <img src={img.image} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => deleteExistingImage(img.id)} className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Trash2 size={16}/></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    <label className="border-2 border-dashed border-gray-200 hover:border-orange-400 hover:bg-orange-50 rounded-2xl h-20 flex flex-col items-center justify-center cursor-pointer transition-all group">
                      <UploadCloud className="text-gray-300 group-hover:text-orange-500" size={20}/>
                      <input type="file" multiple className="hidden" onChange={handleImageChange} disabled={isUploading} />
                    </label>

                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-orange-100">
                        <img src={url} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeSelectedImage(idx)} className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-colors" disabled={isUploading}><X size={12}/></button>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isUploading}
                  className={clsx(
                    "w-full text-white py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl",
                    isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-orange-600"
                  )}
                >
                  {isUploading ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                  {isUploading ? 'UPLOADING...' : (activeView === 'add-project' ? 'PUBLISH' : 'UPDATE')}
                </button>
              </form>
            </div>
          )}

          {activeView === 'feedbacks' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-2xl font-black italic underline decoration-blue-400 uppercase">Feedbacks</h2>
                <span className="text-sm font-bold text-gray-400 bg-white px-4 py-2 rounded-full border">{feedbacks.length} messages</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {feedbacks.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed text-gray-400 font-bold">No feedback yet.</div>
                ) : (
                    feedbacks.map(f => (
                    <div key={f.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-blue-100"></div>
                        <div>
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="font-black text-base text-gray-800 uppercase">{f.user_name}</h4>
                                    <p className="text-[10px] font-bold text-blue-500 flex items-center gap-1 italic">Re: {f.project_title}</p>
                                </div>
                                <button onClick={() => handleDeleteFeedback(f.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium bg-gray-50 p-4 rounded-2xl italic">"{f.message}"</p>
                        </div>
                    </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};