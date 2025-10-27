import { useState, useEffect } from 'react';
import { Radio, Maximize2, Users } from 'lucide-react';

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
    <section id="live" className="relative py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6 animate-pulse">
            <Radio className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">LIVE STREAM</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            SUIVEZ LE TOURNOI EN DIRECT
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ne manquez aucune action ! Regardez les matchs en direct et suivez les meilleurs moments du tournoi.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-500/20 rounded-2xl p-6 lg:p-8 mb-8">
            <div className="mb-6">
              <label htmlFor="stream-url" className="block text-sm font-semibold text-cyan-400 mb-3">
                URL du stream (Twitch ou YouTube)
              </label>
              <input
                type="text"
                id="stream-url"
                value={streamUrl}
                onChange={handleStreamUrlChange}
                placeholder="https://twitch.tv/votre-chaine ou https://youtube.com/watch?v=..."
                className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300"
              />
            </div>

            {embedUrl ? (
              <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  title="Live Stream"
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border-2 border-slate-700 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-slate-700">
                    <Radio className="w-10 h-10 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-400 mb-3">
                    Stream hors ligne
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-4">
                    Le tournoi n'est pas encore en direct. Revenez le 28 février 2026 pour suivre l'action en temps réel.
                  </p>
                  <p className="text-sm text-gray-600">
                    Ou collez l'URL d'un stream Twitch/YouTube ci-dessus pour tester le lecteur.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Plein écran</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Profitez du mode plein écran pour une immersion totale dans les matchs.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Radio className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">HD Quality</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Stream en haute définition pour ne rien manquer de l'action.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Chat en direct</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Échangez avec la communauté pendant les matchs via le chat intégré.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Radio className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Programme du live
                </h4>
                <div className="space-y-2 text-gray-300">
                  <p><strong className="text-cyan-400">10h00 - 12h00:</strong> Phase de groupes</p>
                  <p><strong className="text-cyan-400">12h00 - 14h00:</strong> Pause déjeuner & showmatches</p>
                  <p><strong className="text-cyan-400">14h00 - 17h00:</strong> Quarts et demi-finales</p>
                  <p><strong className="text-cyan-400">17h00 - 20h00:</strong> Grande finale & remise des prix</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
