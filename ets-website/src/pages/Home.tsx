// pages/Home.tsx
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiBook, FiUsers, FiGlobe, FiCheck, FiClock, FiAward, FiHeart } from 'react-icons/fi';

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  
  // Optimized animation variants with proper TypeScript types
  const fadeInUp = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" as const },
    transition: { duration: prefersReducedMotion ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" as const },
    transition: { duration: prefersReducedMotion ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: prefersReducedMotion ? 0 : 20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" as const },
    transition: { duration: prefersReducedMotion ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
  };

  const programs = [
    {
      name: 'Diploma in Theology',
      duration: '2 Years',
      description: 'Foundational theological training for ministry and church leadership.',
      href: '/programs/diploma-theology',
      available: true,
      status: 'Available Now',
      icon: FiBook,
      color: 'bg-green-50 text-green-700'
    },
    {
      name: 'Bachelor of Theology',
      duration: '4 Years',
      description: 'Comprehensive theological education for pastoral and teaching ministry.',
      href: '/programs/bachelor-theology',
      available: false,
      status: 'Coming Soon',
      icon: FiAward,
      color: 'bg-yellow-50 text-yellow-700'
    },
    {
      name: 'Master of Divinity',
      duration: '3 Years',
      description: 'Advanced theological training for experienced ministers.',
      href: '/programs/masters-divinity',
      available: false,
      status: 'Coming Soon',
      icon: FiHeart,
      color: 'bg-yellow-50 text-yellow-700'
    }
  ];

  const whyEts = [
    {
      number: '01',
      icon: FiBook,
      title: 'Biblical Training',
      description: 'Rooted in Scripture, our theological education equips faithful leaders for churches across Africa.',
      details: ['Old & New Testament Studies', 'Biblical Languages', 'Hermeneutics']
    },
    {
      number: '02',
      icon: FiUsers,
      title: 'Ministry Formation',
      description: 'Prepare for ministry through sound biblical teaching, practical formation, and devoted mentorship.',
      details: ['Pastoral Mentorship', 'Practical Ministry', 'Spiritual Formation']
    },
    {
      number: '03',
      icon: FiGlobe,
      title: 'Global Fellowship',
      description: 'Join a growing community serving Uganda, East Africa, and beyond.',
      details: ['International Network', 'Mission Opportunities', 'Alumni Community']
    }
  ];

  const stats = [
    { value: 'UVM', label: 'Has served East Africa since 2009' },
    { value: '3', label: 'Programs Offered' },
    { value: '10+', label: 'Faculty Members' }
  ];

  return (
    <>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/general/hero.jpg"
            alt="ETS Campus"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ets-navy/90 via-ets-navy/70 to-ets-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ets-navy/80 via-transparent to-ets-navy/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl"
          >
            
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              Equipping Leaders for God's Mission!
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow">
              Preparing faithful leaders to serve churches and communities across Africa and beyond.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/admissions"
                className="group inline-flex items-center px-6 py-3 bg-ets-gold text-ets-navy font-medium rounded-full hover:bg-ets-gold/90 transition-all hover:shadow-lg hover:shadow-ets-gold/30"
              >
                Apply Now
                <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium rounded-full hover:bg-white/20 transition-all"
              >
                Explore Programs
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/20">
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-3">
                  {index > 0 && <div className="w-px h-8 bg-white/20" />}
                  <div>
                    <span className="text-white text-2xl font-serif font-bold block">{stat.value}</span>
                    <span className="text-white/80 text-sm">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR CALLING */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeInLeft}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                <img
                  src="/images/general/etswelcome.jpg"
                  alt="ETS Community"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ets-navy/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
                  <p className="font-serif text-lg font-bold text-ets-navy">We Invite You</p>
                  <p className="text-xs text-gray-600">Ready to Join!</p>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-ets-gold/20 rounded-xl -z-10" />
            </motion.div>

            <motion.div
              {...fadeInRight}
              className="order-1 lg:order-2"
            >
              <span className="text-ets-gold font-medium text-sm uppercase tracking-wider mb-2 block">
                Our Calling
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ets-navy mb-6">
                Equipping Christ-Centered Leaders
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                ETS of UVM equips Christ-centered leaders through evangelical theological education in Kampala, serving churches and communities across East Africa, Africa, Europe, and India.
              </p>
              
              <div className="space-y-3">
                {[
                  'Sound evangelical theology',
                  'Practical ministry formation',
                  'Devoted mentorship',
                  'Vision for Africa and beyond'
                ].map((point) => (
                  <div key={point} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-ets-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiCheck className="w-3 h-3 text-ets-gold" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center mt-8 text-ets-navy font-medium hover:text-ets-gold transition-colors group"
              >
                Learn More About Us
                <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <span className="text-ets-gold font-medium text-sm uppercase tracking-wider mb-2 block">
              Academic Programs
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ets-navy">
              Programs
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Choose the program that aligns with your calling and ministry goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" as const }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
                >
                  <div
                    className={`relative group bg-white border rounded-xl p-6 transition-all ${
                      program.available 
                        ? 'border-gray-200 hover:shadow-xl hover:border-ets-gold/50 hover:-translate-y-1' 
                        : 'border-gray-200 opacity-70'
                    }`}
                  >
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${program.color}`}>
                        {!program.available && <FiClock className="w-3 h-3 mr-1" />}
                        {program.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="w-12 h-12 bg-ets-navy/5 rounded-lg flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-ets-gold" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-ets-navy pr-20 group-hover:text-ets-gold transition-colors">
                        {program.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">{program.duration}</p>
                    <p className="text-sm text-gray-600 mb-4">{program.description}</p>

                    {program.available ? (
                      <Link
                        to={program.href}
                        className="inline-flex items-center text-sm font-medium text-ets-navy hover:text-ets-gold transition-colors group"
                      >
                        Learn More
                        <FiArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <Link
                        to="/contact"
                        className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Express Interest
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

{/* WHY ETS - Timeline with Balanced Background Photo */}
<section className="relative py-20 overflow-hidden">
  {/* Background Image - Balanced Visibility */}
  <div className="absolute inset-0">
    <img
      src="/images/programs/grouppic.jpg"
      alt="Students studying Scripture"
      className="w-full h-full object-cover"
      loading="lazy"
    />
    {/* Balanced overlay */}
    <div className="absolute inset-0 bg-white/70" />
    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
  </div>

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      {...fadeInUp}
      className="text-center mb-16"
    >
      <span className="text-ets-gold font-medium text-sm uppercase tracking-wider mb-2 block">
        Why Choose ETS
      </span>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-ets-navy">
        Your Journey with Us
      </h2>
    </motion.div>

    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-ets-gold/40 md:left-1/2 md:-translate-x-px" />

      <div className="space-y-12">
        {whyEts.map((item, index) => {
          const Icon = item.icon;
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" as const }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
              className={`relative flex items-start md:items-center ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Number Circle */}
              <div className="absolute left-8 -translate-x-1/2 z-10 md:left-1/2">
                <div className="w-16 h-16 bg-ets-navy rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="font-serif text-xl font-bold text-ets-gold">{item.number}</span>
                </div>
              </div>

              {/* Content Card - Balanced transparency */}
              <div className={`ml-20 md:ml-0 md:w-1/2 ${
                isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
              }`}>
                <div className="bg-white/75 backdrop-blur-sm rounded-xl p-6 hover:bg-white/90 hover:shadow-xl transition-all duration-300 border border-white/70 shadow-md">
                  <div className={`flex items-center mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                    <div className="w-10 h-10 bg-ets-gold/15 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-ets-gold" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-ets-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                    {item.details.map((detail) => (
                      <span
                        key={detail}
                        className="text-xs bg-white/90 text-gray-700 px-2 py-1 rounded-full border border-gray-200 shadow-sm"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
</section>

      {/* CAMPUS / STUDENT EXPERIENCE */}
      <section className="py-20 bg-ets-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInLeft}>
              <span className="text-ets-gold font-medium text-sm uppercase tracking-wider mb-2 block">
                Campus Life
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                Campus & Student Experience
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                Experience community life at ETS through daily chapel services, small group fellowship, and hands-on ministry opportunities.
              </p>
              <ul className="space-y-3">
                {['Daily Chapel Services', 'Community Groups', 'Ministry Practicum', 'Student Retreats'].map((item) => (
                  <li key={item} className="flex items-center text-gray-300">
                    <FiCheck className="w-5 h-5 text-ets-gold mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeInRight} className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                <img
                  src="/images/campus/classtime.jpg"
                  alt="Student Life at ETS"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ets-navy/50 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <span className="text-ets-gold font-medium text-sm uppercase tracking-wider mb-2 block">
              Our Team
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ets-navy">
              Our Faculty
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Dedicated instructors committed to your theological formation and ministry preparation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rev. Joshua', title: 'Communication Skills Instructor', initials: 'RJ' },
              { name: 'Rev. Samuel', title: 'Biblical Interpretation Instructor', initials: 'RS' },
              { name: 'Ps. Solomon', title: 'Exodus Studies Instructor', initials: 'PS' }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" as const }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="text-center bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-ets-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-2xl font-bold text-ets-navy">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-ets-navy">{member.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{member.title}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/faculty"
              className="inline-flex items-center text-ets-navy hover:text-ets-gold transition-colors font-medium group"
            >
              View All Faculty
              <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ADMISSIONS CTA */}
      <section className="py-20 bg-ets-gold">
        <motion.div
          {...fadeInUp}
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ets-navy mb-4">
            Be Part of this Journey
          </h2>
          <p className="text-ets-navy/80 text-lg mb-8">
            Join us as we begin this journey of equipping faithful leaders for ministry. Applications now open.
          </p>
          <Link
            to="/admissions"
            className="inline-flex items-center px-8 py-3 bg-ets-navy text-white font-medium rounded-full hover:bg-ets-navy/90 transition-all hover:shadow-lg group"
          >
            Apply Today
            <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}