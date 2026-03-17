import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group mb-8"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        <img 
          src="https://via.placeholder.com/150" // O'zingizni rasmingizni qo'ying
          alt="Mirkarim" 
          className="relative w-40 h-40 rounded-full border-2 border-white/20 object-cover"
        />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-7xl font-extrabold mb-4"
      >
        Mirkarim Furqatov
      </motion.h1>

      <div className="text-xl md:text-2xl text-gray-400 h-10">
        <TypeAnimation
          sequence={['Frontend Developer', 2000, 'React Expert', 2000, 'UI/UX Designer', 2000]}
          repeat={Infinity}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex gap-4"
      >
        <button className="px-8 py-3 bg-purple-600 rounded-full font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all">
          View Projects
        </button>
        <button className="px-8 py-3 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-all">
          Contact Me
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;