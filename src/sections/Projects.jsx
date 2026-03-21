import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Toys Store",
    description: "Js React da yozilgan O'yinchoqlar do'koni web sayt portfolio uchun ",
    tags: ["React", "Tailwind", "Js"],
    link: "https://github.com/bahodrivich77/toys-store",
    github: "https://github.com/bahodrivich77/toys-store"
  },
  {
    title: "Food-Town",
    description: "Dashboard va savdo tizimi bilan jihozlangan onlayn Tamadi xona va  do'konlar uchun web  platforma",
    tags: ["JavaScript", "Vite", "CSS Tailwind"],
    link: "https://github.com/bahodrivich77/food-storee",
    github: "https://github.com/bahodrivich77/food-storee"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Selected Works
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs bg-white/5 rounded-full border border-white/10 text-purple-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 relative z-10">
                <a href={project.link} className="flex items-center gap-2 text-sm font-semibold hover:text-purple-400 transition-colors">
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a href={project.github} className="flex items-center gap-2 text-sm font-semibold hover:text-purple-400 transition-colors">
                  <Github size={16} /> Source
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;