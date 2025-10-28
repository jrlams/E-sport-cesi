export default function About() {
  const features = [
    {
      icon: '👥',
      title: 'Communauté',
      description: 'Rejoignez une communauté passionnée de gamers et partagez votre passion pour l\'e-sport'
    },
    {
      icon: '🎯',
      title: 'Competition',
      description: 'Affrontez les meilleurs joueurs dans des tournois compétitifs et professionnels'
    },
    {
      icon: '🏆',
      title: 'Récompenses',
      description: 'Des prix exceptionnels pour les vainqueurs et de nombreux lots à gagner'
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'Découvrez les dernières technologies et tendances du gaming professionnel'
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-minecraft-brown/80 border-y-8 border-minecraft-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-minecraft-gold mb-4" style={{ textShadow: '4px 4px #3B271A' }}>
            À PROPOS DE L'ÉVÉNEMENT
          </h2>
          <div className="w-32 h-2 bg-minecraft-gold mx-auto mb-6 border-2 border-minecraft-brown"></div>
          <p className="text-xl text-minecraft-gray max-w-3xl mx-auto" style={{ textShadow: '2px 2px #3B271A' }}>
            Le CESI E-Sport Championship est bien plus qu'un simple tournoi. C'est une célébration
            de la culture gaming, de la compétition et de l'excellence technique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-lg p-6 text-center transition-transform transform hover:-translate-y-2"
              style={{ boxShadow: 'inset 0 6px 0 0 rgba(0,0,0,0.2), 0 8px 0 0 #3B271A' }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-minecraft-gold rounded-md flex items-center justify-center mb-4 mx-auto border-4 border-[#3B271A]">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-minecraft-gold mb-2">{feature.title}</h3>
                <p className="text-minecraft-gray">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-minecraft-gold mb-6" style={{ textShadow: '3px 3px #3B271A' }}>
                L'ESPRIT CESI E-SPORT
              </h3>
              <div className="space-y-4 text-minecraft-gray">
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
                <p className="font-bold text-minecraft-light-green">
                  Rejoignez-nous le 28 février 2026 pour une journée de compétition intense et
                  d'émotions fortes.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#3B271A]/50 border-2 border-minecraft-gold/30 rounded-lg p-6">
                <h4 className="text-xl font-bold text-minecraft-gold mb-3">Informations Pratiques</h4>
                <ul className="space-y-3 text-minecraft-gray">
                  <li className="flex items-start gap-2">
                    <span className="text-minecraft-gold mt-1">🗓️</span>
                    <span><strong>Date:</strong> 28 Février 2026</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-minecraft-gold mt-1">⏰</span>
                    <span><strong>Horaires:</strong> 10h00 - 20h00</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-minecraft-gold mt-1">📍</span>
                    <span><strong>Lieu:</strong> Campus CESI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-minecraft-gold mt-1">🎮</span>
                    <span><strong>Format:</strong> Tournois en équipes et solo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-minecraft-gold mt-1">🎟️</span>
                    <span><strong>Inscription:</strong> Gratuite et ouverte à tous</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#3B271A]/50 border-2 border-minecraft-blue/30 rounded-lg p-6">
                <h4 className="text-xl font-bold text-minecraft-blue mb-3">Règlement</h4>
                <ul className="space-y-2 text-minecraft-gray text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-minecraft-blue mt-1">🤝</span>
                    <span>Fair-play et respect obligatoires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-minecraft-blue mt-1">💻</span>
                    <span>Matériel fourni sur place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-minecraft-blue mt-1">✅</span>
                    <span>Inscription validée après confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-minecraft-blue mt-1">🚫</span>
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
