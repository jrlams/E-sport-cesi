import { useState } from 'react';
import { Mail, Star, CheckCircle, AlertCircle } from 'lucide-react';

export default function Feedback() {
  const [formData, setFormData] = useState({
    email: '',
    rating: 0,
    organization_rating: 0,
    gameplay_rating: 0,
    venue_rating: 0,
    comments: '',
    would_participate_again: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const ratingCategories = [
    { key: 'rating', label: 'Évaluation globale', icon: Star },
    { key: 'organization_rating', label: 'Organisation', icon: Star },
    { key: 'gameplay_rating', label: 'Expérience de jeu', icon: Star },
    { key: 'venue_rating', label: 'Lieu & équipements', icon: Star }
  ];

  const handleRatingClick = (category: string, value: number) => {
    setFormData({
      ...formData,
      [category]: value
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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

    if (formData.rating === 0 || formData.organization_rating === 0 || formData.gameplay_rating === 0 || formData.venue_rating === 0) {
      setErrorMessage('Veuillez noter toutes les catégories');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/feedback', {
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
        rating: 0,
        organization_rating: 0,
        gameplay_rating: 0,
        venue_rating: 0,
        comments: '',
        would_participate_again: true,
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
    <section id="feedback" className="relative py-20 bg-minecraft-green">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-minecraft-brown/80 border-2 border-minecraft-gold rounded-md mb-6">
            <span className="text-2xl">📝</span>
            <span className="text-minecraft-gold font-semibold">FEEDBACK</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-minecraft-gold mb-4" style={{ textShadow: '4px 4px #3B271A' }}>
            VOTRE AVIS COMPTE
          </h2>
          <div className="w-24 h-1 bg-minecraft-gold mx-auto border-2 border-minecraft-brown mb-6"></div>
          <p className="text-xl text-minecraft-gray max-w-3xl mx-auto" style={{ textShadow: '2px 2px #3B271A' }}>
            Aidez-nous à améliorer nos événements en partageant votre expérience du tournoi.
          </p>
        </div>

        <div className="bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-2xl p-8 lg:p-12" style={{ boxShadow: 'inset 0 8px 0 0 rgba(0,0,0,0.2)' }}>
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-900/50 border-2 border-green-400 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-300 font-bold">Merci pour votre feedback !</p>
                <p className="text-minecraft-gray text-sm">Votre avis nous aide à améliorer nos événements.</p>
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

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="feedback-email" className="block text-sm font-bold text-minecraft-gold mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-minecraft-gray/50" />
                <input
                  type="email"
                  id="feedback-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#3B271A]/50 border-2 border-[#3B271A] focus:border-minecraft-gold rounded-lg px-12 py-3 text-minecraft-gray placeholder-minecraft-gray/50 outline-none transition-all duration-300"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="space-y-6">
              {ratingCategories.map((category) => (
                <div key={category.key}>
                  <label className="block text-sm font-bold text-minecraft-gold mb-3">
                    {category.label} *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRatingClick(category.key, value)}
                        className="group relative"
                      >
                        <Star
                          className={`w-10 h-10 transition-all duration-300 ${
                            value <= (formData[category.key as keyof typeof formData] as number)
                              ? 'text-minecraft-gold fill-minecraft-gold scale-110'
                              : 'text-minecraft-gray/30 hover:text-minecraft-gold/50 hover:scale-105'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-2xl font-bold text-minecraft-gray flex items-center">
                      {formData[category.key as keyof typeof formData] || '-'}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-bold text-minecraft-gold mb-2">
                Commentaires & suggestions (optionnel)
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={5}
                className="w-full bg-[#3B271A]/50 border-2 border-[#3B271A] focus:border-minecraft-gold rounded-lg px-4 py-3 text-minecraft-gray placeholder-minecraft-gray/50 outline-none transition-all duration-300 resize-none"
                placeholder="Partagez vos impressions, suggestions d'amélioration..."
              />
            </div>

            <div className="bg-[#3B271A]/50 border-2 border-[#3B271A] rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="would_participate_again"
                  checked={formData.would_participate_again}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-2 border-minecraft-gray/50 bg-[#3B271A] checked:bg-minecraft-blue focus:ring-2 focus:ring-minecraft-gold transition-all cursor-pointer"
                />
                <div>
                  <span className="text-minecraft-gray font-semibold group-hover:text-minecraft-gold transition-colors">
                    Je souhaite participer aux prochains événements CESI E-Sport
                  </span>
                  <p className="text-sm text-minecraft-gray/70 mt-1">
                    Recevez des informations sur nos futurs tournois et événements.
                  </p>
                </div>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-minecraft-blue text-minecraft-gray font-bold text-lg rounded-md border-b-8 border-blue-900/70 hover:bg-blue-500 active:border-b-2 active:mt-2 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ENVOI EN COURS...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">📤</span>
                    ENVOYER MON FEEDBACK
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
