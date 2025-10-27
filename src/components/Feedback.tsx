import { useState } from 'react';
import { MessageSquare, Mail, Star, Send, CheckCircle, AlertCircle } from 'lucide-react';

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
      const response = await fetch('http://localhost:3000/api/feedback', {
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
    <section id="feedback" className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold">FEEDBACK</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            VOTRE AVIS COMPTE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Aidez-nous à améliorer nos événements en partageant votre expérience du tournoi.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/20 rounded-2xl p-8 lg:p-12 shadow-2xl">
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-semibold">Merci pour votre feedback !</p>
                <p className="text-green-300/80 text-sm">Votre avis nous aide à améliorer nos événements.</p>
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

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="feedback-email" className="block text-sm font-semibold text-purple-400 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="feedback-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-purple-500 rounded-lg px-12 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="space-y-6">
              {ratingCategories.map((category) => (
                <div key={category.key}>
                  <label className="block text-sm font-semibold text-purple-400 mb-3">
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
                              ? 'text-yellow-400 fill-yellow-400 scale-110'
                              : 'text-gray-600 hover:text-yellow-400/50 hover:scale-105'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-2xl font-bold text-white flex items-center">
                      {formData[category.key as keyof typeof formData] || '-'}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-semibold text-purple-400 mb-2">
                Commentaires & suggestions (optionnel)
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={5}
                className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-purple-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 resize-none"
                placeholder="Partagez vos impressions, suggestions d'amélioration..."
              />
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="would_participate_again"
                  checked={formData.would_participate_again}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-2 border-slate-600 bg-slate-800 checked:bg-gradient-to-r checked:from-cyan-500 checked:to-purple-600 focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
                />
                <div>
                  <span className="text-white font-semibold group-hover:text-purple-400 transition-colors">
                    Je souhaite participer aux prochains événements CESI E-Sport
                  </span>
                  <p className="text-sm text-gray-400 mt-1">
                    Recevez des informations sur nos futurs tournois et événements.
                  </p>
                </div>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-cyan-600 text-white font-bold text-lg py-4 rounded-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ENVOI EN COURS...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      ENVOYER MON FEEDBACK
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
