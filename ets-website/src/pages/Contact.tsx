// pages/Contact.tsx
import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, 
  FiMail, 
  FiPhone, 
  FiClock, 
  FiSend, 
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiChevronDown
} from 'react-icons/fi';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);

  const subjects = [
    'General Inquiry',
    'Admissions Question',
    'Program Information',
    'Faculty Contact',
    'Other'
  ];

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Us',
      details: ['Nakawa,Kampala, Uganda'],
      description: 'Our campus is open Monday to Friday'
    },
    {
      icon: FiMail,
      title: 'Email Us',
      details: ['info@etsuvm.org'],
      description: 'We respond within 24-48 hours'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: ['+256 XXX XXX XXX'],
      description: 'Mon-Fri, 8:00 AM - 5:00 PM'
    },
    {
      icon: FiClock,
      title: 'Office Hours',
      details: ['Monday - Friday'],
      description: '8:00 AM - 5:00 PM EAT'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSelectedSubject('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setFormData({ ...formData, subject });
    setIsSubjectOpen(false);
    setErrors({ ...errors, subject: undefined });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | ETS</title>
        <meta name="description" content="Contact Evangelical Theological Seminary. We're here to help with your questions about programs, admissions, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-ets-navy overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/campus/contact-hero.jpg"
            alt="ETS Campus"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ets-navy via-ets-navy/95 to-ets-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Have questions about our programs or admissions? We're here to help you on your journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-ets-navy/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-ets-gold" />
                  </div>
                  <h3 className="font-serif font-semibold text-ets-navy mb-1">{info.title}</h3>
                  {info.details.map((detail) => (
                    <p key={detail} className="text-sm text-gray-600 font-medium">{detail}</p>
                  ))}
                  <p className="text-xs text-gray-500 mt-2">{info.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-2xl font-bold text-ets-navy mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Whether you're interested in our programs, have questions about admissions, 
                  or want to learn more about ETS, we're here to help. Fill out the form and 
                  we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="bg-ets-navy rounded-lg p-6 text-white">
                <h3 className="font-serif text-xl font-semibold mb-3">Why Contact Us?</h3>
                <ul className="space-y-2">
                  {[
                    'Quick response to all inquiries',
                    'Personalized guidance for your calling',
                    'Information about scholarships and aid',
                    'Campus visit arrangements'
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <FiCheckCircle className="w-5 h-5 text-ets-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-ets-navy mb-6">
                  Send a Message
                </h2>

                {/* Name Field */}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-ets-navy mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold focus:border-transparent transition-all ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <FiAlertCircle className="w-3 h-3 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-ets-navy mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold focus:border-transparent transition-all ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <FiAlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Dropdown */}
                <div className="mb-4" ref={subjectDropdownRef}>
                  <label className="block text-sm font-medium text-ets-navy mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                      className={`w-full px-3 py-2.5 border rounded-md text-left focus:outline-none focus:ring-2 focus:ring-ets-gold focus:border-transparent transition-all flex items-center justify-between ${
                        errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <span className={selectedSubject ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedSubject || 'Select a subject'}
                      </span>
                      <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isSubjectOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isSubjectOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
                        >
                          {subjects.map((subject) => (
                            <button
                              key={subject}
                              type="button"
                              onClick={() => handleSubjectSelect(subject)}
                              className="w-full px-3 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md"
                            >
                              {subject}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <FiAlertCircle className="w-3 h-3 mr-1" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-ets-navy mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold focus:border-transparent transition-all resize-none ${
                      errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <FiAlertCircle className="w-3 h-3 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 font-medium rounded-md transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-ets-navy text-white hover:bg-ets-navy/90'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin mr-2 w-4 h-4" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2 w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Success/Error Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700"
                    >
                      <FiCheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="text-sm">Message sent successfully! We'll get back to you soon.</span>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700"
                    >
                      <FiAlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="text-sm">Failed to send message. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-ets-navy mb-3">
              Find Us
            </h2>
            <p className="text-gray-600">
              Visit our campus in Kampala, Uganda
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Replace with actual map embed */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <FiMapPin className="w-12 h-12 text-ets-gold mx-auto mb-3" />
                <p className="text-gray-600 font-medium">ETS–UVM Campus</p>
                <p className="text-sm text-gray-500">Kampala, Uganda</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}