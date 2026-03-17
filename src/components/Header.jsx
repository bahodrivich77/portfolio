import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/10 bg-black/20"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          CMCODER
        </Link>
        <div className="space-x-8 hidden md:flex">
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="text-sm font-medium hover:text-purple-400 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;