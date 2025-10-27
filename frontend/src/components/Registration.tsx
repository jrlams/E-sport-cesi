import { useState } from 'react';
import { UserPlus, Mail, User, Users, Gamepad2, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export default function Registration() {
  const [formData, setFormData] = useState({
    email: '',
    pseudo: '',
    team_name: '',
    game: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const games = [
    'League of Legends',
    'Valorant',
    'Counter-Strike 2',
    'Rocket League',
    'FIFA 24',
    'Fortnite',
    'Overwatch 2',
    'Autre'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrorMessage('Veuillez entrer une adresse email valide');
      setSubmitStatus('error');
      return;
    }

    if (!formData.pseudo || !formData.game) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      setSubmitStatus('success');
      setFormData({
        email: '',
        pseudo: '',
        team_name: '',
        game: '',
        phone: '',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <UserPlus className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold">INSCRIPTION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            REJOIGNEZ LE TOURNOI
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto"></div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-500/20 rounded-2xl p-8 lg:p-12 shadow-2xl">
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-semibold">Inscription réussie !</p>
                <p className="text-green-300/80 text-sm">Vous recevrez bientôt une confirmation par email.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-semibold">Erreur</p>
                <p className="text-red-300/80 text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label htmlFor="email" className="block text-sm font-semibold text-cyan-400 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-cyan-500 rounded-lg px-12 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="pseudo" className="block text-sm font-semibold text-cyan-400 mb-2">
                  Pseudo *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-cyan-500 rounded-lg px-12 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300"
                    placeholder="Votre pseudo de jeu"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="game" className="block text-sm font-semibold text-cyan-400 mb-2">
                  Jeu *
                </label>
                <div className="relative">
                  <Gamepad2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <select
                    id="game"
                    name="game"
                    value={formData.game}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-cyan-500 rounded-lg px-12 py-3 text-white outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="">Sélectionnez un jeu</option>
                    {games.map((game) => (
                      <option key={game} value={game}>
                        {game}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="group">
                <label htmlFor="team_name" className="block text-sm font-semibold text-gray-400 mb-2">
                  Nom d'équipe (optionnel)
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="text"
                    id="team_name"
                    name="team_name"
                    value={formData.team_name}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-cyan-500 rounded-lg px-12 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300"
                    placeholder="Nom de votre équipe"
                  />
                </div>
              </div>

              <div className="group md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-400 mb-2">
                  Téléphone (optionnel)
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-cyan-500 rounded-lg px-12 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg py-4 rounded-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-cyan-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      INSCRIPTION EN COURS...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      VALIDER MON INSCRIPTION
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>

            <p className="text-center text-gray-400 text-sm">
              * Champs obligatoires
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
