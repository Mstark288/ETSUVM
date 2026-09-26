// pages/Admissions.tsx
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion} from 'framer-motion';
import { 
  FiCheckCircle, 
  FiFileText, 
  FiUsers, 
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiDownload,
  FiAlertCircle,
  FiChevronRight,
  FiBookOpen,
  FiAward,
  FiHeart
} from 'react-icons/fi';

interface ApplicationStatus {
  isOpen: boolean;
  deadline: string;
  semester: string;
  message: string;
}

export default function Admissions() {
  const [applicationStatus] = useState<ApplicationStatus>({
    isOpen: true,
    deadline: 'August 31, 2025',
    semester: 'January 2026',
    message: 'Applications are now open for the January 2026 semester.'
  });

  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      step: '01',
      title: 'Submit Application',
      description: 'Complete the online application form with your personal details, academic background, and ministry experience.',
      icon: FiFileText,
      duration: '5-10 minutes'
    },
    {
      step: '02',
      title: 'Provide References',
      description: 'Submit references from church leaders or academic mentors who can speak to your character and calling.',
      icon: FiUsers,
      duration: '1-2 weeks'
    },
    {
      step: '03',
      title: 'Interview',
      description: 'Participate in an interview with our admissions committee to discuss your calling and readiness for ministry.',
      icon: FiCalendar,
      duration: '30-45 minutes'
    },
    {
      step: '04',
      title: 'Acceptance',
      description: 'Receive your acceptance letter and prepare for enrollment at ETS with orientation and registration.',
      icon: FiCheckCircle,
      duration: '2-3 weeks'
    }
  ];

  const requirements = [
    {
      category: 'Academic',
      items: [
        'High school diploma or equivalent',
        'Academic transcripts from previous institutions',
        'Proficiency in English'
      ]
    },
    {
      category: 'Spiritual',
      items: [
        'Recommendation from church leader',
        'Personal statement of faith',
        'Testimony of Christian conversion'
      ]
    },
    {
      category: 'Application',
      items: [
        'Completed application form',
        'Application fee (non-refundable)',
        'Passport-sized photograph'
      ]
    }
  ];

  const importantDates = [
    {
      date: 'August 31, 2025',
      event: 'Application Deadline',
      description: 'All applications must be submitted by this date',
      type: 'deadline'
    },
    {
      date: 'September 15-30, 2025',
      event: 'Interviews',
      description: 'Admissions interviews conducted on campus',
      type: 'interview'
    },
    {
      date: 'October 15, 2025',
      event: 'Acceptance Letters',
      description: 'Notification of admission decisions',
      type: 'notification'
    },
    {
      date: 'January 2026',
      event: 'Semester Begins',
      description: 'Orientation and start of classes',
      type: 'start'
    }
  ];

  const scholarshipInfo = [
    {
      icon: FiBookOpen,
      title: 'Academic Scholarships',
      description: 'Available for students with excellent academic records'
    },
    {
      icon: FiAward,
      title: 'Merit-Based Awards',
      description: 'Recognizing outstanding leadership and ministry potential'
    },
    {
      icon: FiHeart,
      title: 'Financial Aid',
      description: 'Need-based assistance for qualified students'
    }
  ];

  if (!applicationStatus.isOpen) {
    return (
      <>
        <Helmet>
          <title>Admissions Closed | ETS</title>
          <meta name="description" content="Applications are currently closed. Stay informed about upcoming admission periods." />
        </Helmet>

        <section className="pt-24 pb-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-ets-navy mb-4">
                Applications Closed
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We are not currently accepting applications. The next admission period will open soon.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="font-serif text-xl font-semibold text-ets-navy mb-4">
                  Next Admission Period
                </h2>
                <p className="text-gray-600">
                  Stay tuned for upcoming dates. Contact us for more information.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-ets-navy text-white font-medium rounded-full hover:bg-ets-navy/90 transition-colors"
              >
                Contact Admissions
                <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admissions | ETS</title>
        <meta name="description" content="Apply to Evangelical Theological Seminary. Applications now open for January 2026 semester." />
      </Helmet>

      {/* Hero with Application Status */}
      <section className="relative pt-24 pb-16 bg-ets-navy overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/campus/admissions-hero.jpg"
            alt="ETS Admissions"
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
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-4">
              <FiCheckCircle className="mr-2 w-4 h-4" />
              Applications Open
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
              Begin Your Journey
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              {applicationStatus.message} Take the first step toward faithful ministry leadership.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/apply"
                className="inline-flex items-center px-8 py-3 bg-ets-gold text-ets-navy font-medium rounded-full hover:bg-ets-gold/90 transition-colors shadow-lg shadow-ets-gold/20"
              >
                Start Application
                <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a
                href="/downloads/application-form.pdf"
                download
                className="inline-flex items-center px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                <FiDownload className="mr-2 w-4 h-4" />
                Download Form
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ets-navy">
              Application Process
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Four simple steps to begin your theological education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className={`bg-gray-50 rounded-lg p-6 transition-all ${
                    activeStep === index ? 'shadow-lg border-ets-gold' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-ets-gold">{step.step}</span>
                      <span className="text-xs text-gray-400 flex items-center">
                        <FiClock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </span>
                    </div>
                    <Icon className="w-8 h-8 text-ets-navy mb-4" />
                    <h3 className="font-serif text-lg font-semibold text-ets-navy mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <FiChevronRight className="w-6 h-6 text-ets-gold" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-ets-navy">
              Admission Requirements
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {requirements.map((category) => (
              <div key={category.category} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-serif text-xl font-semibold text-ets-navy mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start space-x-2">
                      <FiCheckCircle className="w-4 h-4 text-ets-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-ets-navy">
              Important Dates
            </h2>
          </div>
          <div className="space-y-4">
            {importantDates.map((date, index) => (
              <motion.div
                key={date.event}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  date.type === 'deadline' ? 'bg-red-100' :
                  date.type === 'interview' ? 'bg-yellow-100' :
                  date.type === 'notification' ? 'bg-blue-100' :
                  'bg-green-100'
                }`}>
                  <FiCalendar className={`w-5 h-5 ${
                    date.type === 'deadline' ? 'text-red-600' :
                    date.type === 'interview' ? 'text-yellow-600' :
                    date.type === 'notification' ? 'text-blue-600' :
                    'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-ets-navy">{date.event}</h3>
                    <span className="text-sm text-gray-500">{date.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{date.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-ets-navy">
              Financial Support
            </h2>
            <p className="mt-3 text-gray-600">
              We believe finances shouldn't prevent you from pursuing your calling
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {scholarshipInfo.map((scholarship, index) => {
              const Icon = scholarship.icon;
              return (
                <motion.div
                  key={scholarship.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-ets-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-ets-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-ets-navy mb-2">
                    {scholarship.title}
                  </h3>
                  <p className="text-sm text-gray-600">{scholarship.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-ets-navy">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Application?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join us in preparing for faithful ministry. Applications close {applicationStatus.deadline}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/apply"
              className="inline-flex items-center px-8 py-3 bg-ets-gold text-ets-navy font-medium rounded-full hover:bg-ets-gold/90 transition-colors"
            >
              Apply Now
              <FiArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
            >
              Ask Questions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}