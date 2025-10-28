import { Menu, X, Gamepad2 } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-minecraft-brown/95 backdrop-blur-md border-b-4 border-minecraft-gold/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-8 h-8 text-minecraft-gold" />
            <span className="text-xl font-bold text-minecraft-gold">CESI E-SPORT</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('register')}
              className="text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium"
            >
              Inscription
            </button>
            <button
              onClick={() => scrollToSection('live')}
              className="text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium"
            >
              Live
            </button>
            <button
              onClick={() => scrollToSection('feedback')}
              className="text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium"
            >
              Feedback
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-minecraft-gray hover:text-minecraft-gold transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-minecraft-brown/95 backdrop-blur-md border-t-2 border-minecraft-gold/80">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium py-2"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium py-2"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('register')}
              className="block w-full text-left text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium py-2"
            >
              Inscription
            </button>
            <button
              onClick={() => scrollToSection('live')}
              className="block w-full text-left text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium py-2"
            >
              Live
            </button>
            <button
              onClick={() => scrollToSection('feedback')}
              className="block w-full text-left text-minecraft-gray hover:text-minecraft-gold transition-colors font-medium py-2"
            >
              Feedback
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
