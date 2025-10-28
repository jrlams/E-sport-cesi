import React from 'react';

const Games = () => {
  const gamesList = [
    'Minecraft',
    'CS:GO',
    'Wolfenstein',
    'Smash',
    'League of Legends',
  ];

  return (
    <section id="games" className="py-20 bg-minecraft-brown/80 border-y-8 border-minecraft-brown">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-minecraft-gold" style={{ textShadow: '4px 4px #3B271A' }}>
          Liste des jeux
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {gamesList.map((game, index) => (
            <div
              key={index}
              className="bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-lg p-6 text-center transition-transform transform hover:-translate-y-2"
              style={{ boxShadow: 'inset 0 6px 0 0 rgba(0,0,0,0.2), 0 8px 0 0 #3B271A' }}
            >
              <h3 className="text-xl font-bold text-minecraft-gold">{game}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
