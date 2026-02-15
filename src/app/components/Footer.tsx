import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* 1. Brand Identity */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-2xl font-bold tracking-tight font-display border-b border-amber-600 w-fit pb-1">
              Lucky Interior
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Transforming spaces into experiences. We specialize in bespoke interior solutions that combine luxury with functionality.
            </p>
            {/* Trust Badge/Slogan */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold">Since 2026 • Quality Guaranteed</span>
            </div>
          </div>

          {/* 2. Exploration (Links) */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-sm uppercase tracking-widest font-bold text-gray-200">Company</h4>
            <ul className="space-y-3">
              {['Home', 'Projects', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item === 'Home' ? '' : item.toLowerCase()}`} 
                    className="text-gray-400 text-sm hover:text-white hover:pl-2 transition-all duration-300 flex items-center group"
                  >
                    <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-all text-amber-600" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Official Contact */}
          {/* 3. Official Contact */}
<div className="flex flex-col space-y-6">
  <h4 className="text-sm uppercase tracking-widest font-bold text-gray-200">Get in Touch</h4>
  <ul className="space-y-5">
    
    {/* EMAIL REDIRECT */}
    <li className="group">
      <a href="mailto:lokeshpatidar1207@gmail.com" className="flex items-start gap-4">
        <div className="mt-1 p-2 bg-gray-800 rounded-lg group-hover:bg-amber-600 transition-colors">
          <Mail size={16} className="text-gray-300 group-hover:text-white" />
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Email Us</p>
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">lokeshpatidar1207@gmail.com</span>
        </div>
      </a>
    </li>

    {/* PHONE CALL REDIRECT */}
    <li className="group">
      <a href="tel:+919109231207" className="flex items-start gap-4">
        <div className="mt-1 p-2 bg-gray-800 rounded-lg group-hover:bg-amber-600 transition-colors">
          <Phone size={16} className="text-gray-300 group-hover:text-white" />
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Call Support</p>
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">+91 9109231207</span>
        </div>
      </a>
    </li>

    {/* GOOGLE MAPS REDIRECT */}
    <li className="group">
      <a 
        href="https://www.google.com/maps/search/?api=1&query=Dalauda,Mandsaur,MP,458667" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-start gap-4"
      >
        <div className="mt-1 p-2 bg-gray-800 rounded-lg group-hover:bg-amber-600 transition-colors">
          <MapPin size={16} className="text-gray-300 group-hover:text-white" />
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Office Location</p>
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Dalauda, Mandsaur, MP, 458667</span>
        </div>
      </a>
    </li>

  </ul>
</div>
          {/* 4. Social & Connect */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-sm uppercase tracking-widest font-bold text-gray-200">Connect With Us</h4>
            <p className="text-gray-400 text-sm">Follow our journey on social media for daily design inspiration.</p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, url: 'https://www.instagram.com/lucky_interiors_official' },
                { Icon: Facebook, url: '#' },
                { Icon: Twitter, url: '#' }
              ].map((item, idx) => (
                <a 
                  key={idx}
                  href={item.url} 
                  target="_blank"
                  className="p-3 bg-gray-800 rounded-xl text-gray-400 hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300"
                >
                  <item.Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="border-t border-gray-800/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs tracking-wide">
            © 2026 <span className="text-gray-300 font-medium">Lucky Interior Designer</span>. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-gray-500 tracking-wide">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};