// pages/News.tsx
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';

const newsItems = [
  {
    id: 1,
    title: 'ETS Announces New Master of Divinity Program',
    excerpt: 'We are excited to announce the launch of our Master of Divinity program starting 2025.',
    date: 'August 15, 2025',
    category: 'Announcement',
    image: '/images/general/news-1.jpg'
  },
  {
    id: 2,
    title: '2025 Graduation Ceremony',
    excerpt: 'Join us as we celebrate our graduating class and their achievements.',
    date: 'July 30, 2025',
    category: 'Event',
    image: '/images/general/news-2.jpg'
  },
  {
    id: 3,
    title: 'New Faculty Members Join ETS',
    excerpt: 'We welcome Dr. Esther Namuli and Prof. David Ssentamu to our faculty team.',
    date: 'July 10, 2025',
    category: 'Faculty',
    image: '/images/general/news-3.jpg'
  },
  {
    id: 4,
    title: 'Scholarship Opportunities Available',
    excerpt: 'ETS announces new scholarship opportunities for deserving students.',
    date: 'June 25, 2025',
    category: 'Admissions',
    image: '/images/general/news-4.jpg'
  }
];

export default function News() {
  return (
    <>
      <Helmet>
        <title>News | ETS</title>
        <meta name="description" content="Latest news and updates from Evangelical Theological Seminary." />
      </Helmet>

      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ets-navy">
              News & Updates
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Stay informed about what's happening at ETS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-medium text-ets-gold">{item.category}</span>
                    <span className="flex items-center text-xs text-gray-400">
                      <FiCalendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-ets-navy group-hover:text-ets-gold transition-colors mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">{item.excerpt}</p>
                  <Link
                    to={`/news/${item.id}`}
                    className="inline-flex items-center text-sm font-medium text-ets-navy hover:text-ets-gold transition-colors"
                  >
                    Read More
                    <FiArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}