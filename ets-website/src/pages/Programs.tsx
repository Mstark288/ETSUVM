// pages/Programs.tsx
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock } from 'react-icons/fi';

export default function Programs() {
  const programs = [
    {
      name: 'Diploma in Theology',
      duration: '2 Years',
      description: 'A foundational program designed for those beginning their theological journey.',
      features: ['Old Testament Survey', 'New Testament Survey', 'Basic Theology', 'Church History'],
      href: '/programs/diploma-theology',
      available: true,
      status: 'Available Now'
    },
    {
      name: 'Bachelor of Theology',
      duration: '4 Years',
      description: 'Comprehensive degree preparing students for pastoral and teaching ministry.',
      features: ['Biblical Languages', 'Systematic Theology', 'Pastoral Ministry', 'Mission Studies'],
      href: '/programs/bachelor-theology',
      available: false,
      status: 'Coming Soon'
    },
    {
      name: 'Master of Divinity',
      duration: '3 Years',
      description: 'Advanced theological education for experienced ministers and leaders.',
      features: ['Advanced Exegesis', 'Leadership Development', 'Research Methods', 'Church Planting'],
      href: '/programs/masters-divinity',
      available: false,
      status: 'Coming Soon'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Programs | ETS</title>
        <meta name="description" content="Explore theological programs at ETS. Diploma in Theology available now, with Bachelor and Master's degrees coming soon." />
      </Helmet>

      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ets-navy">
              Academic Programs
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Our programs are designed to equip you for faithful ministry through rigorous study and practical formation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div
                key={program.name}
                className={`relative bg-white border rounded-lg p-6 transition-all ${
                  program.available 
                    ? 'border-gray-200 hover:shadow-lg hover:border-ets-gold/50' 
                    : 'border-gray-200 opacity-70'
                }`}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {program.available ? (
                    <span className="inline-flex items-center text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
                      {program.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                      <FiClock className="w-3 h-3 mr-1" />
                      {program.status}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <h2 className="font-serif text-xl font-semibold text-ets-navy pr-24">
                    {program.name}
                  </h2>
                </div>

                <p className="text-sm text-gray-500 mb-4">{program.duration}</p>
                <p className="text-sm text-gray-600 mb-4">{program.description}</p>

                <ul className="space-y-1 mb-6">
                  {program.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1 h-1 bg-ets-gold rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {program.available ? (
                  <Link
                    to={program.href}
                    className="inline-flex items-center text-sm font-medium text-ets-navy hover:text-ets-gold transition-colors"
                  >
                    Learn More
                    <FiArrowRight className="ml-1 w-4 h-4" />
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
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-serif text-lg font-semibold text-ets-navy mb-2">
              Program Expansion
            </h3>
            <p className="text-sm text-gray-600">
              ETS–UVM is expanding its academic offerings. The Bachelor of Theology and Master of Divinity programs 
              are currently in development and will be available soon. 
              <Link to="/contact" className="text-ets-gold hover:text-ets-navy font-medium ml-1">
                Contact us
              </Link> to stay informed about upcoming programs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}