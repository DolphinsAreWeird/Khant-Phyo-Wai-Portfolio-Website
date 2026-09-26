import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, animate, useInView } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Typewriter from 'typewriter-effect';
import { Menu, X, Github, Linkedin, Mail, ArrowRight, ExternalLink, ChevronRight, TrendingUp, Cpu, Globe, MapPin, Code as CodeIcon } from 'lucide-react';
import { DATA } from './data';

// --- 1. HIGH-TECH COMPONENTS ---

// SEO Component
const SEO = ({ title, desc }) => (
  <Helmet>
    <title>{title} | Khant Phyo Wai</title>
    <meta name="description" content={desc} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={desc} />
  </Helmet>
);

// Interactive Particle Background (Performance Optimized)
const Particles = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set width/height
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Particle Config
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2,
      alpha: Math.random() * 0.5 + 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${p.alpha})`; // Teal color
        ctx.fill();
      });
      animationFrameId = window.requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`transition-shadow duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Animated Number Counter
const Counter = ({ from, to }) => {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    const node = nodeRef.current;
    if (inView) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "circOut",
        onUpdate(value) { node.textContent = value.toFixed(0); },
      });
      return () => controls.stop();
    }
  }, [from, to, inView]);

  return <span ref={nodeRef} />;
};

// "Code Terminal" - Shows your engineer side
const CodeTerminal = () => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-slate-400 text-xs">finance_model.py</span>
      </div>
      <div className="p-6 text-slate-300 space-y-2">
        <div><span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np</div>
        <div><span className="text-purple-400">def</span> <span className="text-blue-400">calculate_roi</span>(cost, revenue):</div>
        <div className="pl-4"><span className="text-slate-500"># AI-driven projection</span></div>
        <div className="pl-4">efficiency = <span className="text-teal-400">1.45</span> <span className="text-slate-500"># Automation boost</span></div>
        <div className="pl-4">net_value = (revenue * efficiency) - cost</div>
        <div className="pl-4"><span className="text-purple-400">return</span> net_value</div>
        <br />
        <div><span className="text-slate-500"># Executing Strategy...</span></div>
        <div><span className="text-green-400">{'>> ROI Optimized. Runway Extended.'}</span></div>
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
};

// Magnetic Cursor
const CustomCursor = () => {
  const cursorRef = useRef(null);
  useEffect(() => {
    const moveCursor = (e) => {
      if(cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  
  return (
    <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 border border-teal-500 rounded-full pointer-events-none z-[9999] -mt-4 -ml-4 mix-blend-difference hidden md:block transition-transform duration-100 ease-out" />
  );
};

// --- 2. PAGE LAYOUTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-teal-400 tracking-tighter z-50">KP<span className="text-white">.</span></Link>
        
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Work', 'Contact'].map((item) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
              className={`text-sm font-medium transition-colors hover:text-teal-400 ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'text-teal-400' : 'text-slate-400'}`}
            >
              {item}
            </Link>
          ))}
          <a href="/files/KPResume.pdf" download className="px-5 py-2 text-sm font-bold text-slate-950 bg-teal-400 rounded-full hover:shadow-[0_0_20px_rgba(45,212,191,0.6)] hover:scale-105 transition-all">
            Resume
          </a>
        </div>

        <button className="md:hidden text-white z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }}
              className="fixed inset-0 bg-slate-950 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {['Home', 'About', 'Work', 'Contact'].map((item) => (
                <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-bold text-white">
                  {item}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// HOME PAGE
const Home = () => (
  <div className="min-h-screen flex flex-col justify-center relative pt-20">
    <SEO title="CFO & AI Engineer" desc="Khant Phyo Wai - Bridging Engineering and Finance." />
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest text-teal-400 uppercase bg-teal-900/20 rounded-full border border-teal-500/20">
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span> Available for C-Level Roles
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500">Engineering</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">Intelligence.</span>
        </h1>

        <div className="text-xl md:text-3xl text-slate-400 h-16 mb-8 font-light flex items-center gap-2">
          I am a <span className="text-white font-semibold"><Typewriter options={{ strings: DATA.hero.roles, autoStart: true, loop: true }} /></span>
        </div>

        <p className="text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed border-l-2 border-teal-500/30 pl-6">
          {DATA.hero.tagline} Currently driving financial growth and technical innovation as CFO at Sonar Audiobooks.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link to="/work" className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2">
            View Projects <ArrowRight size={18} />
          </Link>
          <Link to="/contact" className="px-8 py-4 bg-transparent border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 transition-colors">
            Contact Me
          </Link>
        </div>
      </div>
      
      {/* Animated Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 border-t border-slate-800/50 pt-12 backdrop-blur-sm">
        {DATA.stats.map((stat, idx) => (
          <div key={idx} className="group">
            <div className="text-4xl font-black text-white mb-2 group-hover:text-teal-400 transition-colors">
              <Counter from={0} to={stat.value} />{typeof stat.value === 'number' && stat.value % 1 !== 0 ? '' : '+'}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ABOUT PAGE (Bento Grid Style)
const About = () => (
  <div className="pt-32 pb-20">
    <SEO title="About Me" desc="My journey from Engineering to Executive Leadership." />
    <div className="container mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">The <span className="text-teal-400">Architecture</span> of My Career</h1>
      
      {/* BENTO GRID */}
      <div className="grid md:grid-cols-4 gap-6 auto-rows-[300px]">
        
        {/* Bio - Large */}
        <div className="md:col-span-2 md:row-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-teal-500/30 transition-colors">
          <div>
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 mb-6"><Cpu size={24}/></div>
            <h3 className="text-2xl font-bold text-white mb-4">Engineer by Training, Strategist by Trade.</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              I don't fit into a single box. I am an engineer who reads balance sheets, and a strategist who writes Python code. This duality allows me to not just build products, but build <strong>sustainable businesses</strong> around them.
            </p>
          </div>
          <div className="text-sm text-slate-500 font-mono mt-6">
             Based in Bangkok, Thailand • CMKL University
          </div>
        </div>

        {/* Tech Stack - Infinite Scroll */}
        <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden relative flex flex-col justify-center">
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 z-10 pointer-events-none" />
           <div className="flex animate-infinite-scroll gap-8 w-max px-4">
              {[...DATA.skills, ...DATA.skills].map((skill, i) => (
                <div key={i} className="text-2xl font-bold text-slate-700 whitespace-nowrap">{skill}</div>
              ))}
           </div>
        </div>

        {/* Code Terminal */}
        <div className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-3xl p-1 flex items-center justify-center">
           <div className="w-full max-w-md scale-90 md:scale-100">
             <CodeTerminal />
           </div>
        </div>

        {/* Experience List */}
        <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 overflow-y-auto custom-scrollbar">
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingUp size={20} className="text-gold-400"/> Experience</h3>
           <div className="space-y-8">
             {DATA.experience.map(job => (
               <div key={job.id} className="pl-4 border-l-2 border-slate-800 relative">
                 <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-slate-950 ${job.highlight ? 'bg-gold-500' : 'bg-slate-600'}`}></div>
                 <h4 className="text-white font-bold">{job.role}</h4>
                 <div className="text-sm text-slate-500 mb-1">{job.company}</div>
                 <p className="text-xs text-slate-400 line-clamp-2">{job.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  </div>
);

// WORK PAGE
const Work = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI & Business', 'Strategy', 'Web Dev'];
  const filtered = filter === 'All' ? DATA.projects : DATA.projects.filter(p => p.category.includes(filter) || (filter === 'AI & Business' && p.category.includes('AI')));

  return (
    <div className="pt-32 pb-20">
      <SEO title="Work" desc="My portfolio of projects." />
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Selected Works</h1>
            <p className="text-slate-400 max-w-xl">A collection of projects where I've worn the hat of both engineer and entrepreneur.</p>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-teal-500 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <TiltCard className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-teal-500/50 h-full flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link to={`/project/${project.id}`} className="px-6 py-3 bg-white text-slate-950 font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all">
                        View Case Study
                      </Link>
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-3">{project.shortDesc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// PROJECT DETAIL
const ProjectDetail = () => {
  const { id } = useParams();
  const project = DATA.projects.find(p => p.id === id);
  if (!project) return <div className="pt-40 text-center text-white">Project not found</div>;

  return (
    <div className="pt-32 pb-20">
      <SEO title={project.title} desc={project.shortDesc} />
      <div className="container mx-auto px-6">
        <Link to="/work" className="inline-flex items-center text-slate-400 hover:text-teal-400 mb-8 transition-colors"><ChevronRight className="rotate-180 mr-2" size={16} /> Back</Link>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
             <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{project.title}</h1>
             <p className="text-xl text-slate-300 leading-relaxed mb-8">{project.fullDesc}</p>
             <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => <span key={tag} className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-sm font-bold">{tag}</span>)}
             </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           <div className="md:col-span-2 space-y-8">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                 <h3 className="text-2xl font-bold text-white mb-4">Challenge</h3>
                 <p className="text-slate-400 leading-relaxed">{project.challenges}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                 <h3 className="text-2xl font-bold text-white mb-4">Solution</h3>
                 <p className="text-slate-400 leading-relaxed">{project.solution}</p>
              </div>
           </div>
           <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl h-fit sticky top-32">
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Technology</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map(s => <span key={s} className="px-3 py-1 bg-slate-900 rounded border border-slate-800 text-slate-400 text-xs">{s}</span>)}
              </div>
              <a href={project.link} target="_blank" rel="noreferrer" className="w-full py-3 bg-white text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors">
                Live Project <ExternalLink size={16} />
              </a>
           </div>
        </div>
      </div>
    </div>
  );
};

// CONTACT PAGE
const Contact = () => (
  <div className="pt-32 min-h-screen flex flex-col justify-center">
    <SEO title="Contact" desc="Get in touch for collaboration." />
    <div className="container mx-auto px-6">
       <div className="grid md:grid-cols-2 gap-16 items-center">
         <div>
           <h1 className="text-5xl font-bold text-white mb-6">Ready to <span className="text-teal-400">Scale?</span></h1>
           <p className="text-slate-400 text-lg mb-10">Whether you need a financial strategist for your startup or an AI engineer for your product, I am ready to help.</p>
           
           <div className="space-y-4">
             <a href="mailto:kelvinwai.khantphyo@gmail.com" className="flex items-center gap-4 text-white hover:text-teal-400 transition-colors p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-teal-500/50 group">
               <div className="p-4 bg-teal-500/10 rounded-full text-teal-400 group-hover:scale-110 transition-transform"><Mail size={24} /></div>
               <div>
                 <div className="text-xs text-slate-500 uppercase font-bold">Email Me</div>
                 <div className="text-xl font-semibold">kelvinwai.khantphyo@gmail.com</div>
               </div>
             </a>
           </div>
           
           <div className="flex gap-4 mt-10">
              {[Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-4 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white hover:border-white hover:scale-110 transition-all"><Icon /></a>
              ))}
           </div>
         </div>

         <form className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="space-y-4">
              <input type="text" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder="Name" />
              <input type="email" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder="Email" />
              <textarea rows="4" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder="Project Details..."></textarea>
              <button className="w-full py-4 bg-teal-500 text-slate-950 font-bold rounded-xl hover:bg-teal-400 hover:scale-[1.02] transition-all mt-4 shadow-lg shadow-teal-500/20">Send Message</button>
            </div>
         </form>
       </div>
    </div>
  </div>
);

// 404 PAGE
const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-9xl font-black text-slate-800">404</h1>
    <h2 className="text-3xl font-bold text-white mt-4">Lost in Space?</h2>
    <p className="text-slate-400 mt-2 mb-8">Even AI couldn't predict this URL.</p>
    <Link to="/" className="px-8 py-3 bg-teal-500 text-slate-950 font-bold rounded-full hover:bg-teal-400 transition-colors">Return Home</Link>
  </div>
);

// --- 3. APP WRAPPER ---

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-teal-500 selection:text-white overflow-x-hidden cursor-none-md">
          <Particles />
          <CustomCursor />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <footer className="py-8 bg-slate-950 text-center border-t border-slate-900 text-slate-600 text-sm relative z-10">
            <p>&copy; {new Date().getFullYear()} Khant Phyo Wai.</p>
          </footer>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;