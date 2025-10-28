import { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin } from 'lucide-react';

export default function Hero() {
  const targetDate = new Date('2026-02-28T10:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const scrollToRegister = () => {
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{
        backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/2016/07/Minecraft-Wallpapers-HD-Backgrounds.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-minecraft-brown/80 border-2 border-minecraft-gold rounded-md">
          <Trophy className="w-5 h-5 text-minecraft-gold" />
          <span className="text-minecraft-gold font-semibold">TOURNOI OFFICIEL CESI</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-minecraft-gold" style={{ textShadow: '4px 4px #7C4F2E' }}>
          CESI E-SPORT
          <span className="block mt-2">
            CHAMPIONSHIP 2026
          </span>
        </h1>

        <p className="text-xl text-minecraft-gray mb-12 max-w-2xl mx-auto" style={{ textShadow: '2px 2px #333' }}>
          Rejoignez le plus grand tournoi e-sport organisé par le CESI. Compétition, passion et gaming au rendez-vous.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12 text-minecraft-gray">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-minecraft-gold" />
            <span className="font-bold">28 Février 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-minecraft-gold" />
            <span className="font-bold">Campus CESI</span>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-minecraft-gold mb-6" style={{ textShadow: '3px 3px #7C4F2E' }}>COMPTE À REBOURS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: timeLeft.days, label: 'JOURS' },
              { value: timeLeft.hours, label: 'HEURES' },
              { value: timeLeft.minutes, label: 'MINUTES' },
              { value: timeLeft.seconds, label: 'SECONDES' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-lg p-6 transform transition-transform"
                style={{ boxShadow: 'inset 0 6px 0 0 rgba(0,0,0,0.2)' }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-minecraft-gold mb-2 font-mono" style={{ textShadow: '3px 3px #3B271A' }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm text-minecraft-gray font-bold tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollToRegister}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-minecraft-blue text-minecraft-gray font-bold text-lg rounded-md border-b-8 border-blue-900/70 hover:bg-blue-500 active:border-b-2 active:mt-2 transition-all duration-100"
        >
          <span className="relative z-10">S'INSCRIRE MAINTENANT</span>
          <Trophy className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
        </button>
      </div>
    </section>
  );
}
