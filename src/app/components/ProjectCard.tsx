import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 1. Data ka structure define karein (TypeScript Interface)
interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // Cloudinary URL string ke roop mein aayega
}

const Projects: React.FC = () => {
  // 2. State ko interface ke saath bind karein
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Django API URL
        const response = await axios.get<Project[]>('http://127.0.0.1:8000/api/projects/');
        setProjects(response.data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center p-10">Loading Interior Designs...</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', padding: '20px' }}>
      {projects.map((project) => (
        <div key={project.id} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #eaeaea' }}>
          {/* High-Resolution Cloudinary Image */}
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
          />
          <div style={{ padding: '15px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{project.title}</h2>
            <p style={{ color: '#555' }}>{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;