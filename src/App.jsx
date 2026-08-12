import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import {
  Brain,
  Code2,
  Cloud,
  Database,
  Terminal,
  Cpu,
  Download,
  Mail,
  Linkedin,
  Github,
  Phone,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  TrendingUp,
  Server,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  CircleDot
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const expRef = useRef(null);
  const skillsRef = useRef(null);
  const eduRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll detection for floating navbar morphing
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations with cleanup via gsap.context()
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Stagger Entrance
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.hero-badge', { y: -20, opacity: 0, duration: 0.8, delay: 0.1 })
        .from('.hero-avatar', { scale: 0.8, opacity: 0, duration: 0.9 }, '-=0.5')
        .from('.hero-title-name', { y: 40, opacity: 0, duration: 1, stagger: 0.1 }, '-=0.6')
        .from('.hero-title-role', { y: 30, opacity: 0, duration: 0.9 }, '-=0.7')
        .from('.hero-stats', { y: 20, opacity: 0, duration: 0.8, stagger: 0.12 }, '-=0.5')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6');

      // 2. About Section Reveal
      gsap.from('.about-reveal', {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // 3. Timeline Items Slide-in
      const timelineCards = gsap.utils.toArray('.timeline-card');
      timelineCards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          x: isEven ? -40 : 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out'
        });
      });

      // 4. Skills Section & Progress Counters
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Circular Skill Bar Animations
      gsap.from('.skill-circle-progress', {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        strokeDashoffset: 283,
        duration: 1.8,
        ease: 'power2.out',
        stagger: 0.15
      });

      // 5. Education Cards
      gsap.from('.edu-card', {
        scrollTrigger: {
          trigger: eduRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // 6. Contact Section
      gsap.from('.contact-reveal', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Confetti trigger & CV PDF Generation
  const handleDownloadCV = (e) => {
    if (e) e.preventDefault();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7B61FF', '#00F5FF', '#A855F7', '#FFFFFF']
    });

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    // Header Background (#0F172A)
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 42, 'F');

    // Accent line (Purple & Cyan)
    doc.setFillColor(123, 97, 255);
    doc.rect(0, 42, pageWidth * 0.6, 2, 'F');
    doc.setFillColor(0, 245, 255);
    doc.rect(pageWidth * 0.6, 42, pageWidth * 0.4, 2, 'F');

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('PIEBOJI NOUBISSIE WILFRIED', margin, 17);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(0, 245, 255);
    doc.text('Ingénieur Logiciel & IA  |  Développeur Backend Cloud SaaS', margin, 24);

    doc.setFontSize(8.5);
    doc.setTextColor(203, 213, 225);
    doc.text('Email : pnoubissiewilfried@gmail.com   •   LinkedIn : /in/pieboji-noubissie-wilfried   •   GitHub : github.com/pieboji', margin, 32);
    doc.text('Spécialisation : Architectures SaaS Distribuées (AWS, Django/Flask), Deep Learning (LSTM, NLP, Computer Vision)', margin, 37);

    let y = 52;

    // Section Helper
    const drawSectionHeader = (title) => {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, y, contentWidth, 7, 1.5, 1.5, 'F');
      doc.setFillColor(123, 97, 255);
      doc.rect(margin, y, 3.5, 7, 'F');
      
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(title.toUpperCase(), margin + 6, y + 4.8);
      y += 11;
    };

    // 1. PROFIL & SYNTHÈSE
    drawSectionHeader('Profil & Vision Professionnelle');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const profileText = "Ingénieur logiciel doté d'une double expertise en architecture logicielle Cloud SaaS et en recherche appliquée en Intelligence Artificielle. Concepteur de solutions hautement scalables (APIs Python Django/Flask, architectures multi-locataires sur AWS) et de modèles avancés de Deep Learning (séries temporelles boursières LSTM, vision par ordinateur et NLP).";
    const splitProfile = doc.splitTextToSize(profileText, contentWidth);
    doc.text(splitProfile, margin, y);
    y += splitProfile.length * 4.5 + 4;

    // 2. EXPÉRIENCES & PROJETS PHARES
    drawSectionHeader('Expériences & Projets Phares');

    const expList = [
      {
        role: "Algorithmic Stock Trading Engine (LSTM & OBV)",
        date: "Décembre 2024",
        org: "Marwadi University — Projet d'Ingénierie Financière (Inde)",
        desc: "• Développement d'un algorithme prédictif de cours boursiers par réseaux de neurones récurrents LSTM couplés à l'indicateur On-Balance Volume (OBV).\n• Automatisation des signaux de trading et modélisation des flux boursiers."
      },
      {
        role: "Publication Scientifique : Classification des Maladies Végétales",
        date: "30 Avril 2023",
        org: "Recherche Internationale en Agriculture Intelligente",
        desc: "• Conception et publication d'un modèle de vision par ordinateur (CNN) pour la détection automatisée et précoce des pathologies des feuilles de caféier.\n• Optimisation de la précision d'inférence pour le diagnostic en conditions réelles sur le terrain."
      },
      {
        role: "Finaliste du Hackathon Intellify — Analyse d'Images Médicales",
        date: "19 Avril 2023",
        org: "Hackathon Intellify (Compétition d'Élite en IA)",
        desc: "• Lead Développeur d'un pipeline d'aide au diagnostic clinique par segmentation et classification d'imagerie médicale par Deep Learning."
      },
      {
        role: "Architecte Backend Cloud & Développeur SaaS",
        date: "2022 — Présent",
        org: "Projets SaaS & Services Distribués",
        desc: "• Conception d'architectures multi-locataires sécurisées avec Django, Flask et bases MySQL relationnelles optimisées.\n• Déploiement et sécurisation de microservices distribués sur l'infrastructure Cloud AWS."
      }
    ];

    expList.forEach((exp) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(exp.role, margin, y);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(123, 97, 255);
      const dateWidth = doc.getTextWidth(exp.date);
      doc.text(exp.date, pageWidth - margin - dateWidth, y);
      y += 4;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text(exp.org, margin, y);
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const splitDesc = doc.splitTextToSize(exp.desc, contentWidth);
      doc.text(splitDesc, margin, y);
      y += splitDesc.length * 3.8 + 3.5;
    });

    // 3. FORMATION & DIPLÔMES
    drawSectionHeader('Formation Académique');

    const eduList = [
      {
        degree: "Bachelor of Technology in Computer Engineering (Spécialisation IA)",
        date: "Janvier 2021 — Mai 2025",
        school: "Marwadi University — Inde",
        details: "Formation d'excellence en intelligence artificielle, deep learning, vision par ordinateur, NLP et systèmes distribués."
      },
      {
        degree: "Bachelor of Technology in Computer Programming & Software",
        date: "2018 — 2021",
        school: "Cosendai University — Cameroun",
        details: "Fondations en algorithmique (C, C++, Python), bases de données relationnelles SQL (MySQL), génie logiciel et réseaux."
      }
    ];

    eduList.forEach((edu) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(edu.degree, margin, y);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(123, 97, 255);
      const dateWidth = doc.getTextWidth(edu.date);
      doc.text(edu.date, pageWidth - margin - dateWidth, y);
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`${edu.school} — ${edu.details}`, margin, y);
      y += 6;
    });

    // 4. COMPÉTENCES TECHNIQUES
    y += 1;
    drawSectionHeader('Compétences Techniques & Environnements');

    const skillsSummary = [
      { cat: "Backend & Cloud SaaS", items: "Python (expert), Django, Flask, FastAPI, Architectures Multi-tenant, AWS (EC2, S3, Lambda), RESTful APIs." },
      { cat: "IA & Data Science", items: "Deep Learning, NLP, LSTM (Time-Series), Computer Vision (CNN), Reinforcement Learning, PyTorch, TensorFlow." },
      { cat: "Données & Systèmes", items: "SQL (MySQL optimisé), Power BI, Pipelines ETL, C, C++, Algorithmes complexes, Optimisation mémoire." },
      { cat: "Frontend & Outils", items: "JavaScript (ES6+), React 19, Tailwind CSS, GSAP Motion, Git/GitHub, Docker, Linux/Bash." }
    ];

    skillsSummary.forEach((s) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`• ${s.cat} : `, margin, y);
      const catWidth = doc.getTextWidth(`• ${s.cat} : `);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const itemsText = doc.splitTextToSize(s.items, contentWidth - catWidth);
      doc.text(itemsText, margin + catWidth, y);
      y += itemsText.length * 3.8 + 1.5;
    });

    // Footer of PDF
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('CV officiel généré depuis le portfolio en ligne de Pieboji Noubissie Wilfried — 2026', margin, 290);

    doc.save('CV_Pieboji_Noubissie_Wilfried.pdf');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00F5FF', '#7B61FF']
    });
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 4500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pnoubissiewilfried@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  // Skill data with mastery % and badges
  const skillsData = [
    {
      name: 'Python & Backend SaaS',
      level: 95,
      category: 'backend',
      description: 'Développement d’APIs haute performance, Django, Flask, architectures multi-locataires robustes.',
      icon: Terminal,
      tags: ['Python', 'Django', 'Flask', 'REST APIs', 'FastAPI', 'Architecture SaaS']
    },
    {
      name: 'Deep Learning & IA',
      level: 92,
      category: 'ai',
      description: 'Réseaux de neurones, NLP, séries temporelles LSTM, vision par ordinateur, Reinforcement Learning.',
      icon: Brain,
      tags: ['Deep Learning', 'NLP', 'LSTM', 'Computer Vision', 'PyTorch', 'TensorFlow']
    },
    {
      name: 'Cloud & Infrastructure AWS',
      level: 88,
      category: 'cloud',
      description: 'Déploiement de microservices sur AWS, scalabilité cloud, conteneurisation et sécurité applicative.',
      icon: Cloud,
      tags: ['AWS EC2/S3', 'Lambda', 'Microservices', 'Docker', 'CI/CD']
    },
    {
      name: 'Bases de Données & Data Analytics',
      level: 90,
      category: 'data',
      description: 'Optimisation SQL (MySQL), pipelines de données, modélisation relationnelle et dashboards Power BI.',
      icon: Database,
      tags: ['MySQL', 'SQL Avancé', 'Power BI', 'Data Modeling', 'ETL Pipelines']
    },
    {
      name: 'Génie Logiciel & C/C++',
      level: 86,
      category: 'systems',
      description: 'Programmation bas niveau, structures de données complexes, algorithmes temps-réel et optimisation.',
      icon: Cpu,
      tags: ['C', 'C++', 'Optimisation Mémoire', 'Algorithmique', 'Systèmes']
    },
    {
      name: 'Frontend & Creative Web',
      level: 85,
      category: 'frontend',
      description: 'Interfaces interactives cinématiques, React, JavaScript ES6+, animations GSAP et Tailwind CSS.',
      icon: Code2,
      tags: ['React', 'JavaScript', 'Tailwind CSS', 'GSAP', 'HTML5/CSS3']
    }
  ];

  const filteredSkills = activeTab === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeTab || (activeTab === 'ai' && s.category === 'data'));

  // Experiences & Milestones
  const experiences = [
    {
      period: 'Décembre 2024',
      type: 'Projet d\'Ingénierie & Recherche',
      title: 'Algorithmic Stock Trading Engine (LSTM & OBV)',
      organization: 'Marwadi University — Spécialisation IA',
      location: 'Inde',
      icon: TrendingUp,
      badge: 'Fintech & Deep Learning',
      points: [
        'Conception d\'un modèle d\'apprentissage profond prédictif utilisant des réseaux récurrents LSTM (Long Short Term Memory).',
        'Couplage stratégique avec l\'indicateur technique On-Balance Volume (OBV) pour capturer la pression acheteuse/vendeuse des flux boursiers.',
        'Automatisation de signaux de trading quantitatif avec backtesting rigoureux et réduction du drawdown.'
      ],
      techs: ['Python', 'LSTM', 'Time-Series', 'OBV Indicator', 'Pandas', 'Financial Modeling']
    },
    {
      period: '30 Avril 2023',
      type: 'Publication Scientifique',
      title: 'Classification des Maladies des Feuilles de Café',
      organization: 'Recherche Internationale en Agriculture Intelligente',
      location: 'Recherche & Publication',
      icon: BookOpen,
      badge: 'Computer Vision & Recherche',
      points: [
        'Publication d’un article de recherche sur la détection automatisée et précoce des pathologies des feuilles de caféier.',
        'Mise en œuvre d’architectures de réseaux convolutifs (CNN) optimisées pour des diagnostics agricoles précis sur le terrain.',
        'Application concrète de l’Intelligence Artificielle au service de l’agriculture durable et de la sécurité des récoltes.'
      ],
      techs: ['Deep Learning', 'Computer Vision', 'CNN', 'Image Preprocessing', 'Smart Agriculture']
    },
    {
      period: '19 Avril 2023',
      type: 'Distinction & Compétition',
      title: 'Finaliste du Hackathon Intellify — "Analyse d’Images Médicales"',
      organization: 'Hackathon Intellify',
      location: 'Compétition Nationale',
      icon: Award,
      badge: 'Finaliste Hackathon',
      points: [
        'Lead Développeur et concepteur d’un pipeline de diagnostic assisté par ordinateur sur des jeux de données d’imagerie médicale.',
        'Développement en temps limité d’une solution d’inférence combinant segmentation d’images et classification automatisée.',
        'Sélectionné parmi les finalistes pour l’innovation technique, la précision du modèle et l’ergonomie de l’interface.'
      ],
      techs: ['Medical AI', 'Image Segmentation', 'Deep Learning', 'Python', 'Fast Inference']
    },
    {
      period: '2022 — Présent',
      type: 'Développement Logiciel',
      title: 'Architecte Backend Cloud & Développeur SaaS',
      organization: 'Projets Multi-tenant & Services Cloud',
      location: 'Cloud & Remote',
      icon: Server,
      badge: 'Backend Cloud',
      points: [
        'Architecture et développement de plateformes SaaS multi-locataires scalables avec isolation stricte des données.',
        'Conception d’APIs REST sécurisées sous Django et Flask, intégrées à des bases de données relationnelles MySQL optimisées.',
        'Déploiement et orchestration de services cloud sur AWS avec gestion de la tolérance aux pannes.'
      ],
      techs: ['Python', 'Django', 'Flask', 'AWS', 'MySQL', 'Multi-tenant', 'RESTful APIs']
    }
  ];

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0A0A14] text-[#F0EFF4] relative selection:bg-[#7B61FF] selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#7B61FF]/10 rounded-full blur-[140px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-[#00F5FF]/10 rounded-full blur-[160px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-[#A855F7]/10 rounded-full blur-[180px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* A. FLOATING SIGNATURE NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 transition-all duration-500">
        <nav
          className={`w-full max-w-5xl rounded-[2.5rem] px-4 md:px-7 py-3 md:py-3.5 flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'bg-[#0A0A14]/75 backdrop-blur-xl border border-[#7B61FF]/25 shadow-aura-md'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo / Initials */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Pieboji Noubissie Wilfried - Accueil"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7B61FF] to-[#00F5FF] p-[2px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#0A0A14] flex items-center justify-center">
                <span className="font-bold text-xs tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00F5FF]">
                  PNW
                </span>
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-bold tracking-tight text-[#F0EFF4] group-hover:text-[#00F5FF] transition-colors">
                Pieboji Noubissie Wilfried
              </div>
              <div className="text-[10px] font-mono text-[#94A3B8] tracking-wide">
                Ingénieur Logiciel & IA
              </div>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {[
              { label: 'À propos', href: '#about' },
              { label: 'Expériences', href: '#experience' },
              { label: 'Compétences', href: '#skills' },
              { label: 'Formation', href: '#education' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-[#94A3B8] hover:text-[#F0EFF4] interactive-lift rounded-full hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Download Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCV}
              className="btn-magnetic flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#9333EA] text-white text-xs md:text-sm font-semibold shadow-aura-sm hover:shadow-aura-md border border-white/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 md:w-4 md:h-4 animate-bounce" />
              <span>CV PDF</span>
            </button>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main className="relative z-10">

        {/* B. HERO SECTION */}
        <section
          id="hero"
          ref={heroRef}
          className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 relative overflow-hidden"
        >
          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#7B61FF_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden="true"
          ></div>

          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Online Status Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121124]/90 border border-[#7B61FF]/30 backdrop-blur-md mb-6 shadow-aura-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] -ml-5" />
              <span className="text-xs font-mono text-[#F0EFF4] tracking-wide">
                Disponible pour opportunités & projets ambitieux
              </span>
            </div>

            {/* Profile Avatar with Neon Glow Rings */}
            <div className="hero-avatar relative mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-tr from-[#7B61FF] via-[#00F5FF] to-[#A855F7] animate-glow-spin shadow-aura-lg">
                <div className="w-full h-full rounded-full bg-[#0A0A14] flex flex-col items-center justify-center p-2 text-center border-4 border-[#0A0A14]">
                  <span className="text-2xl md:text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-br from-white via-[#F0EFF4] to-[#7B61FF]">
                    PNW
                  </span>
                  <span className="text-[10px] font-mono text-[#00F5FF] tracking-widest mt-1">
                    ENGINEER
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#121124] border border-[#7B61FF]/40 rounded-full p-2 shadow-aura-sm">
                <Sparkles className="w-4 h-4 text-[#00F5FF]" />
              </div>
            </div>

            {/* Full Name (Massive Sora Sans) */}
            <h1 className="hero-title-name text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-2 leading-tight">
              Pieboji <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] via-[#C084FC] to-[#00F5FF] text-glow">Noubissie Wilfried</span>
            </h1>

            {/* Professional Title (Instrument Serif Italic) */}
            <p className="hero-title-role font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#00F5FF] mb-6 font-normal tracking-wide text-glow-cyan max-w-3xl">
              Développeur Fullstack & Ingénieur Logiciel — Spécialiste IA & Cloud SaaS
            </p>

            {/* Key Description Tagline */}
            <p className="hero-stats text-sm md:text-base text-[#94A3B8] max-w-2xl mb-8 leading-relaxed font-light">
              De l'architecture d'applications SaaS distribuées (Django, Flask, AWS) à la recherche avancée en Deep Learning (LSTM, NLP & Vision).
            </p>

            {/* Monospace 3 Stats / Indicators */}
            <div className="hero-stats flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs sm:text-sm font-mono text-[#F0EFF4] bg-[#121124]/70 border border-[#7B61FF]/20 px-6 py-3.5 rounded-[2rem] backdrop-blur-md mb-10 shadow-aura-sm">
              <div className="flex items-center gap-2">
                <span className="text-[#00F5FF] font-bold">4+</span>
                <span className="text-[#94A3B8]">Années d'Expérience</span>
              </div>
              <span className="text-[#7B61FF] hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="text-[#A855F7] font-bold">15+</span>
                <span className="text-[#94A3B8]">Projets & Recherches</span>
              </div>
              <span className="text-[#7B61FF] hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="text-[#00F5FF] font-bold">Inde & Cameroun</span>
                <span className="text-[#94A3B8]">/ Remote</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="hero-cta flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleDownloadCV}
                className="btn-magnetic flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#9333EA] text-white font-semibold text-sm shadow-aura-md hover:shadow-aura-lg border border-white/20 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger mon CV</span>
              </button>
              <a
                href="#contact"
                className="btn-magnetic flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#121124]/90 text-[#F0EFF4] hover:text-white font-semibold text-sm border border-[#7B61FF]/30 hover:border-[#00F5FF]/60 hover:bg-[#1B1933] shadow-aura-sm transition-all"
              >
                <Mail className="w-4 h-4 text-[#00F5FF]" />
                <span>Me contacter</span>
              </a>
            </div>
          </div>
        </section>

        {/* C. SECTION À PROPOS — LE MANIFESTE PERSONNEL */}
        <section id="about" ref={aboutRef} className="py-24 px-4 relative max-w-6xl mx-auto">
          <div className="card-aura rounded-[3rem] p-8 md:p-14 relative overflow-hidden backdrop-blur-xl">
            {/* Header / Two Columns Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Dramatic Title */}
              <div className="lg:col-span-5 about-reveal">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F5FF] tracking-wider uppercase mb-3">
                  <CircleDot className="w-3.5 h-3.5 text-[#00F5FF]" />
                  <span>Manifeste & Profil</span>
                </div>
                <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
                  À propos <br />
                  <span className="font-sans not-italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00F5FF]">
                    de ma vision
                  </span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#7B61FF] to-[#00F5FF] rounded-full mb-6"></div>
                <p className="text-sm font-mono text-[#94A3B8] leading-relaxed">
                  // Double compétence unique : la rigueur de l'ingénierie logicielle Cloud SaaS alliée à l'avant-garde des algorithmes d'Intelligence Artificielle.
                </p>
              </div>

              {/* Center Divider on Desktop */}
              <div className="hidden lg:block lg:col-span-1 self-stretch relative">
                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-[#7B61FF]/40 via-[#00F5FF]/30 to-transparent -translate-x-1/2 rounded-full"></div>
              </div>

              {/* Right Column: Bio Narrative */}
              <div className="lg:col-span-6 space-y-6 text-[#F0EFF4] about-reveal">
                <p className="text-lg md:text-xl font-normal leading-relaxed text-[#F0EFF4]">
                  Ingénieur logiciel diplômé en <strong className="text-[#00F5FF] font-semibold">Génie Informatique & Intelligence Artificielle</strong> de Marwadi University (Inde) et de Cosendai University (Cameroun), je conçois des systèmes haute performance capables de transformer des problématiques complexes en solutions élégantes et scalables.
                </p>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  Mon expertise s'étend du développement <span className="text-white font-medium">Backend Cloud & SaaS</span> (architectures multi-locataires sécurisées, APIs Python avec Django/Flask, bases SQL optimisées sur AWS) jusqu'à la recherche appliquée en <span className="text-white font-medium">Deep Learning</span> (modélisation prédictive LSTM pour la finance boursière, vision par ordinateur pour l'agriculture intelligente et analyse d'images médicales).
                </p>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  Passionné par l'innovation concrète, je combine rigueur algorithmique (C/C++, Python) et sens du produit digital pour bâtir des outils qui ont un impact réel.
                </p>

                {/* Key Pillars Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-[2rem] bg-[#0A0A14]/70 border border-[#7B61FF]/20 flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-[#7B61FF]/20 text-[#7B61FF]">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Cloud & SaaS Multi-tenant</h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5">APIs Django/Flask & AWS scalables</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-[2rem] bg-[#0A0A14]/70 border border-[#00F5FF]/20 flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-[#00F5FF]/20 text-[#00F5FF]">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">IA & Deep Learning</h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5">LSTM, NLP, Vision & Séries Temporelles</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* D. SECTION EXPÉRIENCE & RÉALISATIONS — LA TIMELINE VIVANTE */}
        <section id="experience" ref={expRef} className="py-24 px-4 max-w-6xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#7B61FF] tracking-wider uppercase mb-3">
              <Briefcase className="w-3.5 h-3.5 text-[#7B61FF]" />
              <span>Parcours & Accomplissements</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Expériences & <span className="font-serif italic font-normal text-[#00F5FF] text-glow-cyan">Recherches</span>
            </h2>
            <p className="text-sm md:text-base text-[#94A3B8]">
              Des compétitions d'élite aux publications scientifiques et aux projets de modélisation financière en temps réel.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Center Vertical Line on Desktop */}
            <div
              className="hidden md:block absolute top-6 bottom-6 left-1/2 w-[2px] bg-gradient-to-b from-[#7B61FF] via-[#00F5FF] to-[#A855F7] -translate-x-1/2 opacity-30 rounded-full"
              aria-hidden="true"
            ></div>

            {/* Timeline Cards */}
            <div className="space-y-12 md:space-y-16">
              {experiences.map((exp, index) => {
                const isEven = index % 2 === 0;
                const IconComponent = exp.icon;

                return (
                  <div
                    key={index}
                    className={`timeline-card relative flex flex-col md:flex-row items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content Card (Half Width on Desktop) */}
                    <div className="w-full md:w-[46%]">
                      <div className="card-aura rounded-[2.5rem] p-6 md:p-8 relative group">
                        {/* Period & Badge Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <span className="font-mono text-xs md:text-sm font-semibold text-[#00F5FF] px-3.5 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20">
                            {exp.period}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A855F7] bg-[#A855F7]/10 px-3 py-0.5 rounded-full border border-[#A855F7]/20">
                            {exp.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00F5FF] transition-colors mb-1">
                          {exp.title}
                        </h3>

                        {/* Organization & Location */}
                        <div className="text-xs md:text-sm font-mono text-[#94A3B8] mb-4 flex items-center gap-2">
                          <span>{exp.organization}</span>
                          <span>•</span>
                          <span className="text-[#7B61FF]">{exp.location}</span>
                        </div>

                        {/* Points List */}
                        <ul className="space-y-2.5 mb-6">
                          {exp.points.map((pt, pIdx) => (
                            <li key={pIdx} className="text-xs md:text-sm text-[#F0EFF4]/80 flex items-start gap-2.5 leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-[#7B61FF] shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                          {exp.techs.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] md:text-xs font-mono text-[#94A3B8] bg-[#0A0A14] px-2.5 py-1 rounded-lg border border-[#7B61FF]/20"
                            >
                              #{tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Center Dot with Pulsing Ring on Desktop */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0A0A14] border-2 border-[#7B61FF] items-center justify-center shadow-aura-md z-10">
                      <IconComponent className="w-5 h-5 text-[#00F5FF]" />
                    </div>

                    {/* Empty Space for the Opposite Side on Desktop */}
                    <div className="hidden md:block w-[46%]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* E. SECTION COMPÉTENCES — LE TABLEAU DE BORD INTERACTIF */}
        <section id="skills" ref={skillsRef} className="py-24 px-4 max-w-6xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F5FF] tracking-wider uppercase mb-3">
              <Layers className="w-3.5 h-3.5 text-[#00F5FF]" />
              <span>Stack Technique & Maîtrise</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Tableau de Bord des <span className="font-serif italic font-normal text-[#7B61FF] text-glow">Compétences</span>
            </h2>
            <p className="text-sm md:text-base text-[#94A3B8]">
              Une maîtrise équilibrée entre développement backend résilient, ingénierie des données et intelligence artificielle de pointe.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: 'all', label: 'Toutes les compétences' },
                { id: 'backend', label: 'Backend & Cloud' },
                { id: 'ai', label: 'IA & Data Science' },
                { id: 'systems', label: 'Génie Logiciel & C++' },
                { id: 'frontend', label: 'Frontend & UI' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#7B61FF] to-[#9333EA] text-white shadow-aura-sm border border-white/20 scale-105'
                      : 'bg-[#121124] text-[#94A3B8] hover:text-white border border-[#7B61FF]/20 hover:border-[#7B61FF]/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid (Circular Gauges + Mastery Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, idx) => {
              const IconComp = skill.icon;
              const radius = 42;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (skill.level / 100) * circumference;

              return (
                <div
                  key={idx}
                  className="skill-card card-aura rounded-[2.5rem] p-6 relative flex flex-col justify-between group"
                >
                  {/* Top Bar with Icon & Circular Gauge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#7B61FF]/15 border border-[#7B61FF]/30 flex items-center justify-center text-[#00F5FF] group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>

                    {/* SVG Circular Progress Gauge */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          stroke="rgba(123, 97, 255, 0.15)"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        {/* Animated Progress Circle */}
                        <circle
                          className="skill-circle-progress"
                          cx="50"
                          cy="50"
                          r={radius}
                          stroke="url(#auraGradient)"
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                        <defs>
                          <linearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7B61FF" />
                            <stop offset="100%" stopColor="#00F5FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute font-mono text-xs font-bold text-white">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Skill Title & Info */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00F5FF] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                      {skill.description}
                    </p>
                  </div>

                  {/* Weighted Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {skill.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono text-[#F0EFF4]/70 bg-[#0A0A14] px-2.5 py-1 rounded-full border border-[#7B61FF]/20 hover:border-[#00F5FF]/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Tech Badges Showcase */}
          <div className="mt-12 p-8 rounded-[3rem] bg-[#0E0D1F]/90 border border-[#7B61FF]/20 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00F5FF]" />
                  <span>Environnements & Outils Maîtrisés</span>
                </h4>
                <p className="text-xs font-mono text-[#94A3B8] mt-1">
                  Technologies prêtes pour la production et environnements de développement intégrés.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                {[
                  'Python 3.12+', 'Django & DRF', 'Flask', 'AWS EC2 / S3', 'MySQL', 'C & C++',
                  'PyTorch & LSTM', 'Power BI', 'Docker', 'Git / GitHub', 'React 19', 'Tailwind CSS'
                ].map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#16152B] text-[#F0EFF4] border border-[#7B61FF]/30 hover:border-[#00F5FF] hover:text-[#00F5FF] transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* F. SECTION FORMATION — LES FONDATIONS */}
        <section id="education" ref={eduRef} className="py-24 px-4 max-w-6xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A855F7] tracking-wider uppercase mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-[#A855F7]" />
              <span>Diplômes & Parcours Académique</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Formation & <span className="font-serif italic font-normal text-[#00F5FF] text-glow-cyan">Fondations</span>
            </h2>
            <p className="text-sm md:text-base text-[#94A3B8]">
              Un cursus international alliant bases théoriques approfondies de l'informatique et spécialisation de pointe en IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Degree 1: Marwadi University */}
            <div className="edu-card card-aura rounded-[3rem] p-8 relative flex flex-col justify-between group overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#7B61FF]/10 rounded-bl-[4rem] pointer-events-none transition-all duration-500 group-hover:bg-[#7B61FF]/20"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#00F5FF] px-3.5 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20">
                    Janvier 2021 — Mai 2025
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                    <span>Inde</span> 🇮🇳
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00F5FF] transition-colors mb-2">
                  Bachelor of Technology in Computer Engineering
                </h3>
                <h4 className="text-sm font-semibold text-[#A855F7] mb-4">
                  Spécialisation : Intelligence Artificielle (AI)
                </h4>

                <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed mb-6">
                  <strong className="text-white font-medium">MARWADI UNIVERSITY</strong> — Formation intensive sur les architectures de réseaux neuronaux profonds, la vision par ordinateur, le traitement du langage naturel (NLP), les séries temporelles et le déploiement d'algorithmes d'IA à grande échelle.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {['Deep Learning', 'Computer Vision', 'NLP', 'Algorithms & Data Structures', 'Cloud Systems'].map((c, idx) => (
                  <span key={idx} className="text-[11px] font-mono text-[#F0EFF4]/80 bg-[#0A0A14] px-2.5 py-1 rounded-lg border border-[#7B61FF]/20">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Degree 2: Cosendai University */}
            <div className="edu-card card-aura rounded-[3rem] p-8 relative flex flex-col justify-between group overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#00F5FF]/10 rounded-bl-[4rem] pointer-events-none transition-all duration-500 group-hover:bg-[#00F5FF]/20"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#A855F7] px-3.5 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20">
                    2018 — 2021
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                    <span>Cameroun</span> 🇨🇲
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00F5FF] transition-colors mb-2">
                  Bachelor of Technology in Computer Programming
                </h3>
                <h4 className="text-sm font-semibold text-[#7B61FF] mb-4">
                  Spécialisation : Software Development & Systems
                </h4>

                <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed mb-6">
                  <strong className="text-white font-medium">COSENDAI UNIVERSITY</strong> — Maîtrise des fondamentaux du génie logiciel : programmation procédurale et orientée objet (C, C++, Python), bases de données relationnelles SQL, modélisation logicielle et architectures d'applications.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {['C / C++', 'Object-Oriented Design', 'SQL & RDBMS', 'Software Engineering', 'Networking'].map((c, idx) => (
                  <span key={idx} className="text-[11px] font-mono text-[#F0EFF4]/80 bg-[#0A0A14] px-2.5 py-1 rounded-lg border border-[#7B61FF]/20">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* G. SECTION CONTACT — LE PONT */}
        <section id="contact" ref={contactRef} className="py-24 px-4 max-w-6xl mx-auto relative">
          <div className="card-aura rounded-[3rem] p-8 md:p-14 relative overflow-hidden backdrop-blur-2xl">
            {/* Dramatic Ambient Background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B61FF]/15 rounded-full blur-[90px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00F5FF]/10 rounded-full blur-[90px] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              
              {/* Left Column: Direct Links & Info */}
              <div className="lg:col-span-5 contact-reveal space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F5FF] tracking-wider uppercase mb-3">
                    <Mail className="w-3.5 h-3.5 text-[#00F5FF]" />
                    <span>Opportunités & Collaborations</span>
                  </div>
                  <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
                    Travaillons <br />
                    <span className="font-sans not-italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00F5FF]">
                      ensemble
                    </span>
                  </h2>
                  <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed">
                    Vous recherchez un ingénieur capable de propulser vos projets d'Intelligence Artificielle, d'architecturer des services Cloud SaaS ou de concevoir des applications scalables ? Discutons de votre vision.
                  </p>
                </div>

                {/* Direct Contact Cards */}
                <div className="space-y-3 pt-2">
                  <div
                    onClick={handleCopyEmail}
                    className="p-4 rounded-[2rem] bg-[#0A0A14]/80 border border-[#7B61FF]/25 hover:border-[#00F5FF]/60 flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-[#7B61FF]/20 text-[#00F5FF] group-hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#94A3B8]">Email Professionnel</span>
                        <p className="text-sm font-mono font-medium text-white group-hover:text-[#00F5FF] transition-colors">
                          pnoubissiewilfried@gmail.com
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#7B61FF] group-hover:text-[#00F5FF]">
                      {copiedEmail ? '✓ Copié !' : 'Copier'}
                    </span>
                  </div>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-[2rem] bg-[#0A0A14]/80 border border-[#7B61FF]/25 hover:border-[#00F5FF]/60 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-[#00F5FF]/20 text-[#00F5FF] group-hover:scale-105 transition-transform">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#94A3B8]">Réseau Professionnel</span>
                        <p className="text-sm font-bold text-white group-hover:text-[#00F5FF] transition-colors">
                          LinkedIn / Pieboji Noubissie Wilfried
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00F5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  <a
                    href="https://github.com/pieboji"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-[2rem] bg-[#0A0A14]/80 border border-[#7B61FF]/25 hover:border-[#00F5FF]/60 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-[#A855F7]/20 text-[#A855F7] group-hover:scale-105 transition-transform">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#94A3B8]">Code & Contributions</span>
                        <p className="text-sm font-bold text-white group-hover:text-[#00F5FF] transition-colors">
                          GitHub / pieboji
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00F5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>

                {/* Big CV Action */}
                <div className="pt-2">
                  <button
                    onClick={handleDownloadCV}
                    className="w-full btn-magnetic flex items-center justify-center gap-3 py-4 rounded-[2rem] bg-gradient-to-r from-[#7B61FF] via-[#9333EA] to-[#00F5FF] text-white font-bold text-sm shadow-aura-md hover:shadow-aura-lg border border-white/20 transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    <span>Télécharger mon CV Complet (PDF)</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Contact Interactive Form */}
              <div className="lg:col-span-7 contact-reveal">
                <div className="p-6 md:p-8 rounded-[2.5rem] bg-[#0A0A14]/90 border border-[#7B61FF]/30 backdrop-blur-xl shadow-aura-sm">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Send className="w-5 h-5 text-[#00F5FF]" />
                    <span>Envoyer un message direct</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mb-6">
                    Remplissez ce formulaire et je reviendrai vers vous dans les plus brefs délais.
                  </p>

                  {formSubmitted ? (
                    <div className="p-8 rounded-[2rem] bg-[#10B981]/10 border border-[#10B981]/30 text-center space-y-3 animate-fade-in">
                      <div className="w-14 h-14 rounded-full bg-[#10B981]/20 text-[#10B981] mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Message envoyé avec succès !</h4>
                      <p className="text-xs text-[#94A3B8]">
                        Merci pour votre prise de contact, Pieboji Noubissie Wilfried vous répondra sous peu.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                            Votre Nom complet *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="ex: Sarah Connor"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl bg-[#121124] border border-[#7B61FF]/25 text-white text-sm focus:outline-none focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                            Votre Adresse Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="ex: sarah@entreprise.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl bg-[#121124] border border-[#7B61FF]/25 text-white text-sm focus:outline-none focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                          Sujet de votre message
                        </label>
                        <input
                          type="text"
                          placeholder="ex: Proposition de projet IA / Recrutement"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#121124] border border-[#7B61FF]/25 text-white text-sm focus:outline-none focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                          Votre Message *
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Décrivez brièvement vos besoins ou votre opportunité..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#121124] border border-[#7B61FF]/25 text-white text-sm focus:outline-none focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] transition-all resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full btn-magnetic flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#7B61FF] to-[#00F5FF] text-white font-semibold text-sm shadow-aura-sm hover:shadow-aura-md border border-white/20 transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Transmettre mon message</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* H. FOOTER ÉPURÉ */}
      <footer className="bg-[#06060C] rounded-t-[4rem] border-t border-[#7B61FF]/20 pt-16 pb-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Brand & Note */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-xl font-black tracking-tight text-white">
                Pieboji <span className="text-[#00F5FF]">Noubissie Wilfried</span>
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">• Portfolio Pro</span>
            </div>
            <p className="text-xs font-mono text-[#94A3B8]">
              Ingénieur Logiciel & Spécialiste IA — Fait avec passion & le vibe coding • 2026
            </p>
          </div>

          {/* Online Indicator Status */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#121124] border border-[#7B61FF]/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-[#F0EFF4]">
              En ligne — Statut disponible
            </span>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#94A3B8]">
            <a href="#hero" className="hover:text-[#00F5FF] transition-colors">Haut de page ↑</a>
            <span>•</span>
            <a href="#experience" className="hover:text-[#00F5FF] transition-colors">Expériences</a>
            <span>•</span>
            <a href="#contact" className="hover:text-[#00F5FF] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
