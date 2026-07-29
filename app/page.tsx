'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Mail,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiShopify,
  SiStripe,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

// Components
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// Mobile Bottom Liquid Glass Nav
const MobileBottomNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [initialized, setInitialized] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let current = 0;
      NAV_LINKS.forEach(({ href }, i) => {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) current = i;
      });
      setActiveIndex(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const item = itemRefs.current[activeIndex];
    if (item) {
      setIndicatorStyle({ left: item.offsetLeft, width: item.offsetWidth });
      setInitialized(true);
    }
  }, [activeIndex]);

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="relative flex items-center gap-0.5 px-2 py-2 rounded-full border border-cyan-500/20"
        style={{
          background: 'rgba(15, 23, 42, 0.38)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(34,211,238,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)',
        }}
      >
        <div
          className="absolute top-2 bottom-2 rounded-full"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: initialized ? 1 : 0,
            background: 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(59,130,246,0.18))',
            boxShadow: 'inset 0 1px 0 rgba(34,211,238,0.25), 0 2px 12px rgba(34,211,238,0.12)',
            transition: initialized
              ? 'left 0.38s cubic-bezier(0.4,0,0.2,1), width 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.2s'
              : 'none',
          }}
        />
        {NAV_LINKS.map((link, index) => (
          <button
            key={link.href}
            ref={el => { itemRefs.current[index] = el; }}
            onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
            className={`relative z-10 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
              activeIndex === index
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Liquid Glass Desktop Nav
const LiquidGlassNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [initialized, setInitialized] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('#home');
      if (hero) setVisible(hero.getBoundingClientRect().bottom < 0);

      let current = 0;
      NAV_LINKS.forEach(({ href }, i) => {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) current = i;
      });
      setActiveIndex(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const item = itemRefs.current[activeIndex];
    if (item) {
      setIndicatorStyle({ left: item.offsetLeft, width: item.offsetWidth });
      setInitialized(true);
    }
  }, [activeIndex]);

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <div
        className="relative flex items-center gap-1 px-2 py-2 rounded-full border border-cyan-500/20"
        style={{
          background: 'rgba(15, 23, 42, 0.38)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(34,211,238,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)',
        }}
      >
        {/* Sliding pill indicator */}
        <div
          className="absolute top-2 bottom-2 rounded-full"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: initialized ? 1 : 0,
            background: 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(59,130,246,0.18))',
            boxShadow: 'inset 0 1px 0 rgba(34,211,238,0.25), 0 2px 12px rgba(34,211,238,0.12)',
            transition: initialized
              ? 'left 0.38s cubic-bezier(0.4,0,0.2,1), width 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.2s'
              : 'none',
          }}
        />
        {NAV_LINKS.map((link, index) => (
          <button
            key={link.href}
            ref={el => { itemRefs.current[index] = el; }}
            onClick={() => handleClick(link.href)}
            className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
              activeIndex === index ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const [glowOffset, setGlowOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imgContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 45;
    const y = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 45;
    setGlowOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setGlowOffset({ x: 0, y: 0 });
  };

  const handleSmoothScroll = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-slate-900 px-6 py-20"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Left — text */}
        <div className="flex flex-col gap-6 text-center md:text-left order-2 md:order-1">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">
              Full-Stack Developer
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Kerim<br />Smajlovic
            </h1>
          </div>

          <p className="text-lg text-slate-400 leading-relaxed max-w-md mx-auto md:mx-0">
            I turn ideas into polished, high-performance web products — from custom React and Next.js apps to full Shopify storefronts and e-commerce solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
            <button
              onClick={() => handleSmoothScroll('#projects')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              View My Work
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => handleSmoothScroll('#contact')}
              className="inline-flex items-center justify-center px-8 py-3 bg-slate-800 text-slate-100 font-semibold rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Right — photo */}
        <div className="flex items-center justify-center order-1 md:order-2">
          <div
            ref={imgContainerRef}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Directional glow */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-2xl"
              style={{
                opacity: isHovered ? 0.65 : 0.28,
                transform: `translate(${glowOffset.x}px, ${glowOffset.y}px) scale(1.15)`,
                transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease-out',
              }}
            />
            {/* Gradient border ring */}
            <div className="relative p-1 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600">
                <Image
                  src="/kerim_blue.jpg"
                  alt="Kerim Smajlovic"
                  width={320}
                  height={320}
                  className="rounded-full object-cover w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80"
                />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// Tech Stack Section
const TechStackSection = () => {
  const technologies = [
    { name: 'React',        Icon: SiReact,      color: '#61DAFB' },
    { name: 'Next.js',      Icon: SiNextdotjs,  color: '#ffffff' },
    { name: 'TypeScript',   Icon: SiTypescript, color: '#3178C6' },
    { name: 'Node.js',      Icon: SiNodedotjs,  color: '#339933' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss,color: '#06B6D4' },
    { name: 'PostgreSQL',   Icon: SiPostgresql, color: '#4169E1' },
    { name: 'MongoDB',      Icon: SiMongodb,    color: '#47A248' },
    { name: 'Shopify',      Icon: SiShopify,    color: '#96BF48' },
    { name: 'Stripe',       Icon: SiStripe,     color: '#635BFF' },
    { name: 'Git',          Icon: SiGit,        color: '#F05032' },
  ];

  return (
    <section
      id="tech"
      className="min-h-screen flex items-center justify-center bg-slate-950 px-6 py-20"
    >
      <div className="max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Tech Stack</h2>
          <p className="text-slate-400 text-lg">Technologies I work with and love</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group relative flex flex-col items-center gap-4 p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden"
            >
              {/* Radial glow from top on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% -10%, ${tech.color}28, transparent 70%)`,
                }}
              />
              {/* Icon badge */}
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${tech.color}18`,
                  color: tech.color,
                }}
              >
                <tech.Icon />
              </div>
              {/* Name */}
              <p className="relative text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                {tech.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
          <span className="h-px w-16 bg-slate-700" />
          + many more tools, libraries &amp; frameworks
          <span className="h-px w-16 bg-slate-700" />
        </div>
      </div>
    </section>
  );
};

// Project Card Component
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  isComingSoon?: boolean;
  demoLink?: string;
  githubLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  isComingSoon = false,
  demoLink,
  githubLink,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-2">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {isComingSoon && (
            <span className="shrink-0 px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 text-xs font-bold rounded-full">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-slate-800 text-cyan-400 rounded border border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {!isComingSoon && (demoLink || githubLink) && (
          <div className="flex items-center gap-4 pt-2">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                <SiGithub size={15} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      isComingSoon: true,
    },
    {
      title: 'AI Content Generator',
      description:
        'Machine learning-powered content generation tool with smart categorization and SEO optimization features.',
      technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'MongoDB'],
      isComingSoon: true,
    },
    {
      title: 'My Portfolio',
      description:
        'This portfolio website showcasing my work and skills. Built with Next.js, Tailwind CSS, and deployed on Vercel for optimal performance.',
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      isComingSoon: false,
      githubLink: 'https://github.com/keraa00/portfolio',
    },
    {
      title: 'ESPRO | E-Commerce Website',
      description:
        'Frontend single-page e-commerce website for ESPRO. Fully responsive UI with product listings and a clean modern design. Built as a frontend-only project.',
      technologies: ['React', 'Tailwind CSS'],
      isComingSoon: false,
      demoLink: 'https://kerim-espro-ecommerce.netlify.app/',
      githubLink: 'https://github.com/keraa00/espro-e-commerce',
    },
    {
      title: 'Pillows | E-Commerce Website',
      description:
        'Frontend single-page e-commerce website for a pillows brand. Fully responsive with a clean product layout and mobile-first design. Built as a frontend-only project.',
      technologies: ['React', 'Tailwind CSS'],
      isComingSoon: false,
      demoLink: 'https://kerim-pillows-e-commerce.netlify.app/',
      githubLink: 'https://github.com/keraa00/pillows',
    },
  ];

  const featured = projects.slice(0, 3);
  const extra = projects.slice(3);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center bg-slate-900 px-6 py-20"
    >
      <div className="max-w-5xl mx-auto w-full space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Projects</h2>
          <p className="text-slate-400 text-lg">
            Featured work and things I&apos;m building
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* Expandable extra projects */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: showAll ? '600px' : '0px', opacity: showAll ? 1 : 0 }}
        >
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {extra.map((project, index) => (
              <ProjectCard key={index + 3} {...project} />
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium cursor-pointer"
          >
            {showAll ? 'View Less' : 'View More Projects'}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-slate-950 px-6 py-20"
    >
      <div className="max-w-2xl mx-auto w-full text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Get in Touch</h2>
          <p className="text-slate-400 text-lg">
            Let's connect and build something amazing together.
          </p>
        </div>

        <div className="space-y-6">
          <a
            href="mailto:smajlovickerim03@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <Mail size={20} />
            Send me an Email
          </a>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a
              href="https://github.com/keraa00"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-slate-100 font-semibold rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            >
              <SiGithub size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kerim-smajlovi%C4%87-16a752269"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-slate-100 font-semibold rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            >
              <FaLinkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800">
          <p className="text-slate-500 text-sm">
            © 2026 Kerim Smajlovic. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

// Main Page Component
export default function Home() {
  return (
    <main className="bg-slate-900">
      <MobileBottomNav />
      <LiquidGlassNav />
      <HeroSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
