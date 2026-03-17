import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Send as Telegram, Instagram } from 'lucide-react'; // Instagram qo'shildi

// ... (tepadagi form qismi bir xil qoladi)
import React from 'react'

const Contact = () => {
  return (
    
<div className="flex flex-col justify-center items-center md:items-start gap-8">
  <h3 className="text-2xl font-semibold">Social Links</h3>
  <div className="flex gap-6">
    {[
      { icon: <Telegram />, link: 'https://t.me/your_username', color: 'hover:text-blue-400' },
      { icon: <Instagram />, link: 'https://instagram.com/your_username', color: 'hover:text-pink-500' }, // Instagram qo'shildi
      { icon: <Github />, link: 'https://github.com/your_username', color: 'hover:text-white' },
      { icon: <Linkedin />, link: 'https://linkedin.com/in/your_username', color: 'hover:text-blue-600' }
    ].map((social, index) => (
      <motion.a
        key={index}
        href={social.link}
        target="_blank"
        whileHover={{ y: -5, scale: 1.1 }}
        className={`p-4 bg-white/5 rounded-full border border-white/10 ${social.color} transition-all duration-300`}
      >
        {social.icon}
      </motion.a>
    ))}
  </div>
</div> 
  )
}

export default Contact