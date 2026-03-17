import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML/CSS', level: '95%' },
  { name: 'JavaScript', level: '90%' },
  { name: 'React', level: '85%' },
  { name: 'Tailwind CSS', level: '95%' }
];

const About = () => {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="text-gray-400 leading-relaxed">
          <p>Assalomu alaykum! Men Mirkarim, zamonaviy va foydalanuvchilar uchun qulay veb-ilovalarni yaratishga ishtiyoqi baland bo'lgan dasturchiman.</p>
          <p className="mt-4">Har bir loyihada sifat va chiroyli dizaynni birinchi o'ringa qo'yaman.</p>
        </div>
        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span>{skill.name}</span>
                <span>{skill.level}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: skill.level }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;