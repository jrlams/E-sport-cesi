import { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';

export default function LiveStream() {
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        const response = await fetch('/api/stream');
        const data = await response.json();
        setStreamUrl(data.url);
      } catch (error) {
        console.error('Error fetching stream URL:', error);
      }
    };

    fetchStreamUrl();
  }, []);

  const handleStreamUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setStreamUrl(url);
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('twitch.tv')) {
      const channel = url.split('twitch.tv/')[1]?.split('/')[0];
      return `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`;
    } else if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes('youtu.be')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return '';
  };

  const embedUrl = getEmbedUrl(streamUrl);

  return (
    <section id="live" className="relative py-20 bg-minecraft-brown/80 border-y-8 border-minecraft-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/50 border-2 border-red-500 rounded-md mb-6 animate-pulse">
            <Radio className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">LIVE STREAM</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-minecraft-gold mb-4" style={{ textShadow: '4px 4px #3B271A' }}>
            SUIVEZ LE TOURNOI EN DIRECT
          </h2>
          <div className="w-32 h-2 bg-minecraft-gold mx-auto mb-6 border-2 border-minecraft-brown"></div>
          <p className="text-xl text-minecraft-gray max-w-3xl mx-auto" style={{ textShadow: '2px 2px #3B271A' }}>
            Ne manquez aucune action ! Regardez les matchs en direct et suivez les meilleurs moments du tournoi.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-2xl p-6 lg:p-8 mb-8" style={{ boxShadow: 'inset 0 8px 0 0 rgba(0,0,0,0.2)' }}>
            <div className="mb-6">
              <label htmlFor="stream-url" className="block text-sm font-bold text-minecraft-gold mb-3">
                URL du stream (Twitch ou YouTube)
              </label>
              <input
                type="text"
                id="stream-url"
                value={streamUrl}
                onChange={handleStreamUrlChange}
                placeholder="https://twitch.tv/votre-chaine ou https://youtube.com/watch?v=..."
                className="w-full bg-[#3B271A]/50 border-2 border-[#3B271A] focus:border-minecraft-gold rounded-lg px-4 py-3 text-minecraft-gray placeholder-minecraft-gray/50 outline-none transition-all duration-300"
              />
            </div>

            {embedUrl ? (
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden border-4 border-[#3B271A]">
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  title="Live Stream"
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-[#3B271A]/50 rounded-xl overflow-hidden border-4 border-[#3B271A] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-minecraft-brown rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#3B271A]">
                    <Radio className="w-10 h-10 text-minecraft-gray/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-minecraft-gray/80 mb-3">
                    Stream hors ligne
                  </h3>
                  <p className="text-minecraft-gray/60 max-w-md mx-auto mb-4">
                    Le tournoi n'est pas encore en direct. Revenez le 28 février 2026 pour suivre l'action en temps réel.
                  </p>
                  <p className="text-sm text-minecraft-gray/40">
                    Ou collez l'URL d'un stream Twitch/YouTube ci-dessus pour tester le lecteur.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🖥️', title: 'Plein écran', description: 'Profitez du mode plein écran pour une immersion totale dans les matchs.' },
              { icon: '🏆', title: 'HD Quality', description: "Stream en haute définition pour ne rien manquer de l'action." },
              { icon: '💬', title: 'Chat en direct', description: 'Échangez avec la communauté pendant les matchs via le chat intégré.' }
            ].map((feature, index) => (
              <div key={index} className="bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-xl p-6 transition-transform transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-minecraft-gold rounded-md flex items-center justify-center border-2 border-[#3B271A]">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-minecraft-gold">{feature.title}</h3>
                </div>
                <p className="text-minecraft-gray text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-minecraft-gold/20 rounded-lg flex items-center justify-center border-2 border-minecraft-gold/50">
                <Radio className="w-6 h-6 text-minecraft-gold" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-minecraft-gold mb-2">
                  Programme du live
                </h4>
                <div className="space-y-2 text-minecraft-gray">
                  <p><strong className="text-minecraft-light-green">10h00 - 12h00:</strong> Phase de groupes</p>
                  <p><strong className="text-minecraft-light-green">12h00 - 14h00:</strong> Pause déjeuner & showmatches</p>
                  <p><strong className="text-minecraft-light-green">14h00 - 17h00:</strong> Quarts et demi-finales</p>
                  <p><strong className="text-minecraft-light-green">17h00 - 20h00:</strong> Grande finale & remise des prix</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
