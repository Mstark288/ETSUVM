// pages/About.tsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | ETS of UVM</title>
        <meta name="description" content="Learn about Evangelical Theological Seminary's history, mission, and vision since 2026." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-ets-navy overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/campus/about-hero.jpg"
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
              About ETS of UVM
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Equipping faithful leaders for God's mission since 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <FiTarget className="w-10 h-10 text-ets-gold mx-auto mb-4" />
              <h2 className="font-serif text-xl font-semibold text-ets-navy mb-3">Our Mission</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                To equip Christ-centered leaders through evangelical theological education for faithful ministry in Africa and beyond.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <FiEye className="w-10 h-10 text-ets-gold mx-auto mb-4" />
              <h2 className="font-serif text-xl font-semibold text-ets-navy mb-3">Our Vision</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                To see churches and communities transformed by faithful, well-equipped leaders who proclaim the gospel with integrity.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <FiHeart className="w-10 h-10 text-ets-gold mx-auto mb-4" />
              <h2 className="font-serif text-xl font-semibold text-ets-navy mb-3">Our Values</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Scripture-centered teaching, spiritual formation, academic excellence, and faithful service to the Church.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-ets-navy mb-8 text-center">
            Our History
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Evangelical Theological Seminary (ETS) was established in August 2026 with a vision to provide sound theological education for the growing church in East Africa. What began as a small training center has grown into a respected institution serving students from across the continent.
            </p>
            <p>
              Located in Kampala, Uganda, ETS of UVM has maintained its commitment to evangelical faith and academic rigor. Our graduates serve in pastoral ministry, teaching, missions, and various forms of Christian leadership throughout Africa and beyond.
            </p>
            <p>
              Today, ETS of UVM continues to adapt its programs to meet the changing needs of the church while remaining rooted in Scripture and committed to the historic Christian faith.
            </p>
          </div>
        </div>
      </section>

      {/* Stats
      <section className="py-16 bg-ets-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif font-bold text-ets-gold">45+</div>
              <p className="text-gray-300 text-sm mt-2">Years of Ministry</p>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-ets-gold">500+</div>
              <p className="text-gray-300 text-sm mt-2">Graduates</p>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-ets-gold">10+</div>
              <p className="text-gray-300 text-sm mt-2">Countries Served</p>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-ets-gold">15+</div>
              <p className="text-gray-300 text-sm mt-2">Faculty Members</p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}