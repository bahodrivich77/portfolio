import { motion } from 'framer-motion';
import { Code2, Layout, Wrench, Lightbulb } from 'lucide-react';

const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 className="text-blue-400" />,
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50"
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layout className="text-purple-400" />,
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    title: "Tools",
    icon: <Wrench className="text-orange-400" />,
    skills: ["Git", "GitHub", "VS Code", "Figma", "Vite"],
    gradient: "from-orange-500/20 to-yellow-500/20",
    border: "group-hover:border-orange-500/50"
  },
  {
    title: "Other Skills",
    icon: <Lightbulb className="text-green-400" />,
    skills: ["Responsive Design", "REST APIs", "UI/UX Fundamentals", "Clean Code"],
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "group-hover:border-green-500/50"
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Sarlavha qismi */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Men haqimda
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Men zamonaviy frontend texnologiyalari orqali foydalanuvchilar uchun qulay va 
          yuqori samaradorlikka ega raqamli mahsulotlar yarataman.
        </p>
      </motion.div>

      {/* Skonstruktsiya (Kategoriyalar) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className={`group relative p-8 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 ${category.border}`}
          >
            {/* Orqa fondagi xira nur (Glow) */}
            <div className={`absolute -inset-24 bg-gradient-to-br ${category.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative z-10">
              {/* Ikonka va Sarlavha */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white/90">{category.title}</h3>
              </div>

              {/* Ko'nikmalar ro'yxati */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 text-sm bg-white/5 border border-white/5 rounded-xl text-gray-400 group-hover:text-white group-hover:border-white/20 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;