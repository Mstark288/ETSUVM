import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';

export default function Resources() {
  const resources = [
    { title: 'Library Catalog', description: 'Access our theological library resources online.', icon: '📚' },
    { title: 'Student Portal', description: 'Check grades, assignments, and announcements.', icon: '💻' },
    { title: 'Academic Calendar', description: 'View important dates and academic deadlines.', icon: '📅' },
    { title: 'Student Handbook', description: 'Download the official student handbook.', icon: '📖' },
    { title: 'Writing Center', description: 'Get help with academic writing and research.', icon: '✍️' },
    { title: 'Career Services', description: 'Explore ministry opportunities and placements.', icon: '🎯' }
  ];

  return (
    <>
      <Helmet>
        <title>Resources at ETS UVM | Student Support</title>
        <meta name="description" content="Access resources for students at ETS UVM including library, student portal, academic calendar, and more." />
      </Helmet>

      <section className="section-padding pt-32 bg-ets-cream">
        <div className="container-custom">
          <SectionHeading
            title="Resources"
            subtitle="Tools and support for your academic and ministry journey"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {resources.map((resource) => (
              <Card key={resource.title} className="text-center">
                <div className="text-4xl mb-3">{resource.icon}</div>
                <h3 className="font-serif text-xl font-bold text-ets-navy mb-2">{resource.title}</h3>
                <p className="text-ets-charcoal/70 text-sm">{resource.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}