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
    'Minecraft',
    'CS:GO',
    'Wolfenstein',
    'Smash',
    'League of Legends',
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
    <section id="register" className="relative py-20 bg-minecraft-green">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-minecraft-brown/80 border-2 border-minecraft-gold rounded-md mb-6">
            <UserPlus className="w-5 h-5 text-minecraft-gold" />
            <span className="text-minecraft-gold font-semibold">INSCRIPTION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-minecraft-gold mb-4" style={{ textShadow: '4px 4px #3B271A' }}>
            REJOIGNEZ LE TOURNOI
          </h2>
          <div className="w-24 h-1 bg-minecraft-gold mx-auto border-2 border-minecraft-brown"></div>
        </div>

        <div className="bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-2xl p-8 lg:p-12" style={{ boxShadow: 'inset 0 8px 0 0 rgba(0,0,0,0.2)' }}>
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-900/50 border-2 border-green-400 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-300 font-bold">Inscription réussie !</p>
                <p className="text-minecraft-gray text-sm">Vous recevrez bientôt une confirmation par email.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-900/50 border-2 border-red-400 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-bold">Erreur</p>
                <p className="text-minecraft-gray text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label htmlFor="email" className="block text-sm font-bold text-minecraft-gold mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-minecraft-gray/50" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#3B271A]/50 border-2 border-[#3B271A] focus:border-minecraft-gold rounded-lg px-12 py-3 text-minecraft-gray placeholder-minecraft-gray/50 outline-none transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="pseudo" className="block text-sm font-bold text-minecraft-gold mb-2">
                  Pseudo *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-minecraft-gray/50" />
                  <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#3B271A]/50 border-2 border-[#3B271A] focus:border-minecraft-gold rounded-lg px-12 py-3 text-minecraft-gray placeholder-minecraft-gray/50 outline-none transition-all duration-300"
                    placeholder="Votre pseudo de jeu"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="game" className="block text-sm font-bold text-minecraft-gold mb-2">
                  Jeu *
                </label>
                <div className="relative">
                  <Gamepad2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-minecraft-gray/50" />
                  <select
                    id="game"
                    name="game"
                    value={formData.game}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#3B271A]/50 border-2 border-[#3B271A] focus:border-minecraft-gold rounded-lg px-12 py-3 text-minecraft-gray outline-none transition-all duration-300 appearance-none cursor-pointer"
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
                <label htmlFor="team_name" className="block text-sm font-bold text-minecraft-gray/80 mb-2">
                  Nom d'équipe (optionnel)
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-minecraft-gray/50" />
                  <input
                    type="text"
                    id="team_name"
                    name="team_name"
                    value={formData.team_name}
                    onChange={handleChange}
                    className="w-full bg-[#3B271A]/50 border-2 border-[#3B271A] focus:border-minecraft-gold rounded-lg px-12 py-3 text-minecraft-gray placeholder-minecraft-gray/50 outline-none transition-all duration-300"
                    placeholder="Nom de votre équipe"
                  />
                </div>
              </div>

              <div className="group md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-bold text-minecraft-gray/80 mb-2">
                  Téléphone (optionnel)
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-minecraft-gray/50" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#3B271A]/50 border-2 border-[#3B271A] focus:border-minecraft-gold rounded-lg px-12 py-3 text-minecraft-gray placeholder-minecraft-gray/50 outline-none transition-all duration-300"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-minecraft-blue text-minecraft-gray font-bold text-lg rounded-md border-b-8 border-blue-900/70 hover:bg-blue-500 active:border-b-2 active:mt-2 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:border-b-8 disabled:border-gray-700"
              >
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
              </button>
            </div>

            <p className="text-center text-minecraft-gray/80 text-sm">
              * Champs obligatoires
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
