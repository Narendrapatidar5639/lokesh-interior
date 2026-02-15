import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const adminEmail = "Lokeshpatidar1207@gmail.com";
  const adminPhone = "9109231207"; 

  // Daloda, Mandsaur, MP Embed URL
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14638.16480540445!2d75.05389695028442!3d23.923610486874413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396125ac027f7147%3A0x60b7bc54d0dff0f0!2sDaloda%2C%20Madhya%20Pradesh%20458667!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin";

  const handleWhatsAppClick = () => {
    // 1. Country code (91) ke saath clean number banayein
    const cleanNumber = adminPhone.replace(/\D/g, '');
    const finalNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

    // 2. Message ko sahi se encode karein taaki spaces break na ho
    const message = `Hello! My name is ${formData.name}.\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const encodedText = encodeURIComponent(message);

    // 3. Final URL kholiye
    window.open(`https://wa.me/${finalNumber}?text=${encodedText}`, '_blank');
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-12 text-center">Get in Touch</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
          {/* Left Side: Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="text-gray-600">
              Ready to start your project? Contact us today for a consultation.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{adminEmail}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-green-500 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">91092 31207</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">Dalauda, Mandsaur, MP  458667</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={handleWhatsAppClick}
                className="flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-200"
              >
                <MessageCircle size={24} />
                Chat on WhatsApp
              </button>
            </div>
          </div>
          
          {/* Right Side: Form */}
          <form 
            action="https://formspree.io/f/xykdenbr" 
            method="POST"
            className="space-y-6 bg-gray-50 p-8 rounded-3xl border border-gray-100"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
              <input 
                name="name"
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name"
                className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <input 
                name="email"
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
              <textarea 
                name="message"
                rows={4} 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tell us about your project..."
                className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Send to Gmail
            </button>
          </form>
        </div>

        {/* 🗺️ NEW MAP SECTION ADDED HERE */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="flex flex-col mb-6">
            <h2 className="text-2xl font-bold">Find Us on Map</h2>
            <p className="text-gray-500 text-sm">Visit our studio at Dalauda, Mandsaur</p>
          </div>
          <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              title="Dalauda Location"
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};