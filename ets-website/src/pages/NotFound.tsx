import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | ETS UVM</title>
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-ets-cream px-6">
        <div className="text-center">
          <h1 className="font-serif text-7xl md:text-9xl font-bold text-ets-gold mb-4">404</h1>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ets-navy mb-4">Page Not Found</h2>
          <p className="text-ets-charcoal/70 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Also it may be under construction
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">Return Home</Button>
          </Link>
        </div>
      </section>
    </>
  );
}