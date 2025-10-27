import { Gamepad2, Mail, MapPin, Calendar } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">CESI E-SPORT</span>
            </div>
            <p className="text-gray-400 mb-4">
              Le plus grand tournoi e-sport organisé par le CESI. Rejoignez-nous pour une expérience gaming inoubliable.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>esport@cesi.fr</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Campus CESI</span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>28 Février 2026</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Liens rapides</h3>
            <div className="space-y-2">
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-cyan-400 transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Inscription
              </button>
              <button
                onClick={() => document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Live Stream
              </button>
              <button
                onClick={() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Feedback
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-gray-500">
            {new Date().getFullYear()} CESI E-Sport Championship. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
