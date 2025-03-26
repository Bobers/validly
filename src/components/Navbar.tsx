
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'glass-nav py-3' : 'bg-transparent',
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 text-primary"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display font-semibold text-xl">Validly</span>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/dashboard" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link 
              to="/hypothesis-builder" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Build Hypothesis
            </Link>
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Button 
              asChild 
              className="rounded-full px-6"
            >
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/dashboard" 
                className="text-sm font-medium transition-colors hover:text-primary p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/hypothesis-builder" 
                className="text-sm font-medium transition-colors hover:text-primary p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Build Hypothesis
              </Link>
              <Link 
                to="/" 
                className="text-sm font-medium transition-colors hover:text-primary p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Button 
                asChild 
                className="rounded-full mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
