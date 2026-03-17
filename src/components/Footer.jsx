import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Send, Facebook, Instagram } from 'lucide-react'; // Instagram qo'shildi

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Send size={20} />, link: "https://t.me/your_username", color: "hover:text-blue-400" },
    { icon: <Instagram size={20} />, link: "https://instagram.com/your_username", color: "hover:text-pink-500" }, // Instagram qo'shildi
    { icon: <Github size={20} />, link: "https://github.com/your_username", color: "hover:text-white" },
    { icon: <Linkedin size={20} />, link: "https://linkedin.com/in/your_username", color: "hover:text-blue-600" },
  ];

  return (
    <footer className="relative mt-20 pb-10 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-8">
          Mirkarim Furqatov
        </h2>

        <div className="flex gap-5 mb-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 8 }}
              className={`p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 transition-all duration-300 ${social.color} hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]`}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        <div className="text-center border-t border-white/5 pt-8 w-full">
          <p className="text-gray-600 text-xs tracking-widest uppercase">
            © {currentYear} Barcha huquqlar himoyalangan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;