import { Users, Target, Award, Zap } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Users,
      title: 'Communauté',
      description: 'Rejoignez une communauté passionnée de gamers et partagez votre passion pour l\'e-sport'
    },
    {
      icon: Target,
      title: 'Competition',
      description: 'Affrontez les meilleurs joueurs dans des tournois compétitifs et professionnels'
    },
    {
      icon: Award,
      title: 'Récompenses',
      description: 'Des prix exceptionnels pour les vainqueurs et de nombreux lots à gagner'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Découvrez les dernières technologies et tendances du gaming professionnel'
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            À PROPOS DE L'ÉVÉNEMENT
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Le CESI E-Sport Championship est bien plus qu'un simple tournoi. C'est une célébration
            de la culture gaming, de la compétition et de l'excellence technique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                L'ESPRIT CESI E-SPORT
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  Le CESI organise cet événement majeur pour rassembler les passionnés d'e-sport
                  et promouvoir l'excellence dans le gaming compétitif. Notre mission est de créer
                  un espace où le talent, la stratégie et la passion se rencontrent.
                </p>
                <p>
                  Que vous soyez joueur amateur ou confirmé, ce tournoi est l'occasion idéale de
                  tester vos compétences, de rencontrer d'autres passionnés et de vivre une
                  expérience e-sport inoubliable.
                </p>
                <p className="font-semibold text-cyan-400">
                  Rejoignez-nous le 28 février 2026 pour une journée de compétition intense et
                  d'émotions fortes.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-6">
                <h4 className="text-xl font-bold text-cyan-400 mb-3">Informations Pratiques</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>Date:</strong> 28 Février 2026</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>Horaires:</strong> 10h00 - 20h00</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>Lieu:</strong> Campus CESI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>Format:</strong> Tournois en équipes et solo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>Inscription:</strong> Gratuite et ouverte à tous</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-6">
                <h4 className="text-xl font-bold text-purple-400 mb-3">Règlement</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span>Fair-play et respect obligatoires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span>Matériel fourni sur place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span>Inscription validée après confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span>Coaching externe non autorisé pendant les matchs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
