import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Frontend Evolution: Rust-powered Future",
    description: "Frontend ekotizimi Rust asosidagi bundlerlar bilan yangi tezlik va samaradorlik bosqichiga o‘tmoqda 🚀",
    category: "JavaScript",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7438307192144977920/", // LinkedIn linkini shu yerga qo'ying
    date: "Mart 15, 2026"
  },
  {
    id: 2,
    title: "Code Splitting: Foydalanuvchi Vaqtini Hurmat Qilish",
    description: "Kerakli kodni keyin yuklash orqali ilova tezligini oshirish va foydalanuvchi tajribasini yaxshilash.",
    category: "CSS",
    link: "https://www.linkedin.com/posts/shohjahon-asqarov_code-splitting-haqida-faqat-kod-emas-yuklash-activity-7419094449668018176-1kDP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFmt9FsBSZ4_ibo4kWNlXB_XcIL3hCGhFZQ",
    date: "Mart 10, 2026"
  },
  {
    id: 3,
    title: "React vs Next.js: Juniors’ Common Misunderstanding",
    description: "React is a UI library; Next.js is a full framework on top of React, offering routing, SSR/SSG, and API handling to scale production apps efficiently.",
    category: "React",
    link: "https://www.linkedin.com/posts/nirimon123_react-nextjs-frontendarchitecture-share-7439250038213718016---9B?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFmt9FsBSZ4_ibo4kWNlXB_XcIL3hCGhFZQ",
    date: "Mart 5, 2026"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-26 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Maqolalar & Blog
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Dasturlash dunyosidagi yangiliklar va tajribalarim bilan LinkedIn-da muntazam bo'lishib boraman.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full"
          >
            {/* Kategoriya va Sana */}
            <div className="flex justify-between items-center mb-6">
              <span className="px-4 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-gray-500 text-xs">{post.date}</span>
            </div>

            {/* Sarlavha va Tavsif */}
            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              {post.description}
            </p>

            {/* LinkedIn-ga havola */}
            <a 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white font-bold hover:gap-4 transition-all duration-300"
            >
              Maqolani o'qish <ExternalLink size={18} className="text-blue-500" />
            </a>

            {/* Bezak uchun BookOpen ikonasi */}
            <div className="absolute -top-4 -right-4 p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
              <BookOpen size={24} className="text-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Blog;