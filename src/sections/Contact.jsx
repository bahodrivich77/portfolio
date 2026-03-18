import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Instagram, MessageCircle, Mail, User, Send as TelegramIcon } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Yuborilmoqda...");
    
    const token = "7692119190:AAGUxFcEan3HksRJWQbc1YP7aCxyJ2aQdnA";
    const chat_id = "5728059391";
    
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const text = `🚀 *Yangi xabar!*\n\n👤 *Ism:* ${name}\n📧 *Email:* ${email}\n💬 *Xabar:* ${message}`;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chat_id,
          text: text,
          parse_mode: "Markdown"
        })
      });
      setStatus("Xabar muvaffaqiyatli yuborildi! ✅");
      e.target.reset();
    } catch (error) {
      setStatus("Xatolik yuz berdi. ❌");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Aloqa uchun
        </h2>
        <p className="text-gray-400">Savollaringiz bormi? Quyidagi forma orqali menga to'g'ridan-to'g'ri xabar yuboring!</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Kontakt Formasi */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-500" size={20} />
              <input name="name" type="text" placeholder="Ismingiz" required className="w-full p-4 pl-12 bg-white/5 border border-white/10 rounded-2xl focus:border-purple-500 outline-none transition-all" />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-500" size={20} />
              <input name="email" type="email" placeholder="Email manzilingiz" required className="w-full p-4 pl-12 bg-white/5 border border-white/10 rounded-2xl focus:border-purple-500 outline-none transition-all" />
            </div>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-4 text-gray-500" size={20} />
              <textarea name="message" placeholder="Xabaringiz..." rows="5" required className="w-full p-4 pl-12 bg-white/5 border border-white/10 rounded-2xl focus:border-purple-500 outline-none transition-all resize-none"></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20">
              <Send size={18} /> Yuborish
            </button>
            {status && <p className="text-center text-sm font-medium text-purple-400 animate-pulse">{status}</p>}
          </form>
        </motion.div>

        {/* Ijtimoiy tarmoqlar (Yangi dizayn) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-2xl font-bold mb-2">Ijtimoiy tarmoqlar</h3>
          
          {[
            { name: 'Telegram', icon: <TelegramIcon size={24} />, link: 'https://t.me/bahod1rovi_ch77', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
            { name: 'Instagram', icon: <Instagram size={24} />, link: "https://www.instagram.com/bahod1rovi_ch77?igsh=MTZvZDkydzh1cDNuYQ==https://www.instagram.com/bahod1rovi_ch77?igsh=MTZvZDkydzh1cDNuYQ==", color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
            { name: 'GitHub', icon: <Github size={24} />, link:  "https://github.com/bahodrivich77/", color: 'bg-white/10 text-white border-white/20' },
            { name: 'LinkedIn', icon: <Linkedin size={24} />, link:  "https://www.linkedin.com/in/mirkarim-furqatov-823a6535b/", color: 'bg-blue-600/10 text-blue-600 border-blue-600/20' }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.08)" }}
              className={`flex items-center justify-between p-5 rounded-3xl border backdrop-blur-md transition-all ${social.color}`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl">
                  {social.icon}
                </div>
                <span className="font-semibold text-lg">{social.name}</span>
              </div>
              <span className="text-xs opacity-50 uppercase tracking-widest">Bog'lanish →</span>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;