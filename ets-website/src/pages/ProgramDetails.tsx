// pages/ProgramDetails.tsx - Updated for coming soon programs
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiClock } from 'react-icons/fi';

const programData = {
  'diploma-theology': {
    name: 'Diploma in Theology',
    duration: '2 Years',
    description: 'A foundational program providing essential theological education for church ministry.',
    overview: 'The Diploma in Theology is designed for those beginning their theological journey. It provides a solid foundation in biblical studies, theology, and practical ministry skills.',
    courses: [
      'Old Testament Survey',
      'New Testament Survey',
      'Basic Christian Doctrine',
      'Church History',
      'Introduction to Ministry',
      'Evangelism and Discipleship',
      'Biblical Interpretation',
      'Pastoral Care Basics'
    ],
    careerPaths: [
      'Church Ministry',
      'Lay Leadership',
      'Sunday School Teaching',
      'Mission Work',
      'Youth Ministry'
    ],
    available: true,
    status: 'Available Now'
  },
  'bachelor-theology': {
    name: 'Bachelor of Theology',
    duration: '4 Years',
    description: 'Comprehensive theological education for pastoral and teaching ministry.',
    overview: 'The Bachelor of Theology will provide rigorous academic training combined with practical ministry experience. This program is currently in development.',
    courses: [
      'Biblical Languages (Greek & Hebrew)',
      'Systematic Theology I & II',
      'Old & New Testament Exegesis',
      'Church History Survey',
      'Pastoral Theology',
      'Homiletics',
      'Mission Studies',
      'Christian Ethics'
    ],
    careerPaths: [
      'Pastoral Ministry',
      'Teaching',
      'Church Planting',
      'Mission Leadership',
      'Christian Education'
    ],
    available: false,
    status: 'Coming Soon'
  },
  'masters-divinity': {
    name: 'Master of Divinity',
    duration: '3 Years',
    description: 'Advanced theological education for experienced ministers and leaders.',
    overview: 'The Master of Divinity will offer advanced theological training for experienced ministers. This program is planned for future development.',
    courses: [
      'Advanced Biblical Exegesis',
      'Theological Ethics',
      'Leadership Development',
      'Research Methodology',
      'Advanced Homiletics',
      'Church Planting Strategies'
    ],
    careerPaths: [
      'Senior Pastoral Leadership',
      'Theological Education',
      'Denominational Leadership',
      'Mission Leadership'
    ],
    available: false,
    status: 'Coming Soon'
  }
};

export default function ProgramDetails() {
  const { programId } = useParams<{ programId: string }>();
  const program = programId ? programData[programId as keyof typeof programData] : null;

  if (!program) {
    return (
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="font-serif text-4xl font-bold text-ets-navy mb-4">Program Not Found</h1>
          <p className="text-gray-600 mb-8">The program you're looking for doesn't exist.</p>
          <Link
            to="/programs"
            className="inline-flex items-center text-ets-navy hover:text-ets-gold transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Programs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{program.name} | ETS</title>
        <meta name="description" content={program.description} />
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-ets-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/programs"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-6"
          >
            <FiArrowLeft className="mr-2 w-4 h-4" />
            All Programs
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
                {program.name}
              </h1>
              {!program.available && (
                <span className="inline-flex items-center text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded font-medium">
                  <FiClock className="w-4 h-4 mr-1" />
                  Coming Soon
                </span>
              )}
            </div>
            <p className="text-lg text-gray-300">{program.duration}</p>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-ets-navy mb-4">Program Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{program.overview}</p>

              <h2 className="font-serif text-2xl font-bold text-ets-navy mb-4">Core Courses</h2>
              <ul className="grid md:grid-cols-2 gap-2 mb-8">
                {program.courses.map((course) => (
                  <li key={course} className="flex items-start space-x-2 text-gray-600 text-sm">
                    <FiCheck className="w-4 h-4 text-ets-gold mt-0.5 flex-shrink-0" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-serif text-lg font-semibold text-ets-navy mb-4">Career Paths</h3>
                <ul className="space-y-2">
                  {program.careerPaths.map((path) => (
                    <li key={path} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-ets-gold rounded-full" />
                      <span>{path}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {program.available ? (
                <div className="bg-ets-navy rounded-lg p-6">
                  <h3 className="font-serif text-lg font-semibold text-white mb-3">Ready to Apply?</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Start your application for the {program.name}.
                  </p>
                  <Link
                    to="/admissions"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-ets-gold text-ets-navy font-medium rounded-md hover:bg-ets-gold/90 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="font-serif text-lg font-semibold text-ets-navy mb-3">Stay Informed</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This program is coming soon. Contact us to stay updated on availability.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-ets-navy text-ets-navy font-medium rounded-md hover:bg-ets-navy hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}