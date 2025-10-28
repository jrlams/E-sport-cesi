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
    <section id="games" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Liste des jeux</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {gamesList.map((game, index) => (
            <div key={index} className="bg-slate-800 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">{game}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
