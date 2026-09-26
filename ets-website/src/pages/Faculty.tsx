// pages/Faculty.tsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiBook } from 'react-icons/fi';

// Actual Faculty from timetable
const facultyMembers = [
  {
    name: 'Rev. Joshua',
    title: 'Communication Skills Instructor',
    department: 'General Studies',
    courses: ['Communication Skills'],
    bio: 'Rev. Joshua teaches Communication Skills, equipping students with essential skills for effective ministry and leadership.',
    initials: 'RJ'
  },
  {
    name: 'Rev. Samuel',
    title: 'Biblical Interpretation Instructor',
    department: 'Biblical Studies',
    courses: ['Biblical Interpretation', 'Exodus Studies'],
    bio: 'Rev. Samuel specializes in Biblical Interpretation and Old Testament studies, helping students understand Scripture deeply.',
    initials: 'RS'
  },
  {
    name: 'Rev. Godwin',
    title: 'Cultural Studies Instructor',
    department: 'General Studies',
    courses: ['Cultural Studies'],
    bio: 'Rev. Godwin teaches Cultural Studies, helping students understand ministry within diverse cultural contexts.',
    initials: 'RG'
  },
  {
    name: 'Ps. Solomon',
    title: 'Exodus Studies Instructor',
    department: 'Biblical Studies',
    courses: ['Exodus Studies'],
    bio: 'Ps. Solomon teaches Exodus Studies, providing deep insights into God\'s redemptive work in the Old Testament.',
    initials: 'PS'
  },
  {
    name: 'Ps. Cisy',
    title: 'Exodus Studies Instructor',
    department: 'Biblical Studies',
    courses: ['Exodus Studies'],
    bio: 'Ps. Cisy is part of the Exodus Studies teaching team, bringing practical application to biblical texts.',
    initials: 'PC'
  },
  {
    name: 'Msn. David',
    title: 'Exodus Studies Instructor',
    department: 'Biblical Studies',
    courses: ['Exodus Studies'],
    bio: 'Msn. David teaches Exodus Studies with a focus on mission and practical ministry application.',
    initials: 'MD'
  },
  {
    name: 'Msn. Timothy',
    title: 'Exodus Studies Instructor',
    department: 'Biblical Studies',
    courses: ['Exodus Studies'],
    bio: 'Msn. Timothy contributes to Exodus Studies teaching, emphasizing faithful biblical exposition.',
    initials: 'MT'
  },
  {
    name: 'Msn. Samuel',
    title: 'Church History Instructor',
    department: 'Historical Studies',
    courses: ['Church History'],
    bio: 'Msn. Samuel teaches Church History, helping students understand the development of the Christian church.',
    initials: 'MS'
  },
  {
    name: 'Ps. Concy',
    title: 'ICT Instructor',
    department: 'General Studies',
    courses: ['ICT'],
    bio: 'Ps. Concy teaches ICT, equipping students with essential technology skills for modern ministry.',
    initials: 'PC'
  },
  {
    name: 'Ps. Coleb',
    title: 'Exodus Studies Instructor',
    department: 'Biblical Studies',
    courses: ['Exodus Studies (Evening)'],
    bio: 'Ps. Coleb teaches evening Exodus Studies classes, making theological education accessible to all students.',
    initials: 'PC'
  },
  {
    name: 'Ps. Kamara',
    title: 'Exodus Studies Instructor',
    department: 'Biblical Studies',
    courses: ['Exodus Studies (Evening)'],
    bio: 'Ps. Kamara is part of the evening teaching team, focusing on practical application of Scripture.',
    initials: 'PK'
  },
  {
    name: 'Ps. Christmas',
    title: 'Exodus Studies Instructor',
    department: 'Biblical Studies',
    courses: ['Exodus Studies (Evening)'],
    bio: 'Ps. Christmas teaches evening Exodus Studies, bringing energy and passion to biblical education.',
    initials: 'PC'
  }
];

// Courses offered
const courses = [
  'Exodus Studies',
  'Communication Skills',
  'Cultural Studies',
  'Church History',
  'Biblical Interpretation',
  'ICT'
];

export default function Faculty() {
  return (
    <>
      <Helmet>
        <title>Faculty | ETS</title>
        <meta name="description" content="Meet the dedicated faculty at Evangelical Theological Seminary." />
      </Helmet>

      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ets-navy">
              Our Faculty
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Dedicated instructors committed to your theological formation and ministry preparation.
            </p>
          </div>

          {/* Courses Taught */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-ets-navy mb-4 flex items-center">
              <FiBook className="mr-2 text-ets-gold" />
              Courses Offered
            </h2>
            <div className="flex flex-wrap gap-2">
              {courses.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-200"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Faculty Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-ets-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-lg font-bold text-ets-navy">
                        {member.initials}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-semibold text-ets-navy">{member.name}</h2>
                      <p className="text-sm text-ets-gold font-medium">{member.title}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-3">{member.department}</p>
                
                <div className="mb-3">
                  <p className="text-xs font-semibold text-ets-navy mb-1">Teaches:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.courses.map((course) => (
                      <span
                        key={course}
                        className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}