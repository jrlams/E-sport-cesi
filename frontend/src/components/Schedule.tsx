import React from 'react';

const Schedule = () => {
  const scheduleData = [
    { time: '09:00 – 09:45', game: 'Minecraft', duration: '45 min', details: 'Partie 1 (10 joueurs)' },
    { time: '09:45 – 10:30', game: 'Minecraft', duration: '45 min', details: 'Partie 2 (10 joueurs)' },
    { time: '10:30 – 11:15', game: 'Minecraft', duration: '45 min', details: 'Partie 3 (10 joueurs)' },
    { time: '11:15 – 11:45', game: 'CS:GO', duration: '30 min', details: '1 match 5v5' },
    { time: '11:45 – 12:00', game: 'Pause courte', duration: '15 min', details: 'Petite pause avant midi' },
    { time: '12:00 – 13:00', game: 'Pause déjeuner', duration: '1h', details: 'Pause midi' },
    { time: '13:00 – 13:30', game: 'Wolfenstein', duration: '30 min', details: '1 match' },
    { time: '13:30 – 15:30', game: 'Smash', duration: '2h', details: '16 matchs 1v1 (premier tour + quart)' },
    { time: '15:30 – 17:30', game: 'League of Legends', duration: '2h', details: '4 matchs (8 équipes)' },
    { time: '17:30 – 18:00', game: 'Smash', duration: '30 min', details: 'Demi-finale / finale' },
  ];

  return (
    <section id="schedule" className="py-20 bg-minecraft-green text-minecraft-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-minecraft-gold" style={{ textShadow: '4px 4px #3B271A' }}>
          Programme de l'événement
        </h2>
        <div className="overflow-x-auto bg-minecraft-brown/70 border-4 border-[#3B271A] rounded-lg p-4" style={{ boxShadow: 'inset 0 6px 0 0 rgba(0,0,0,0.2)' }}>
          <table className="min-w-full">
            <thead>
              <tr className="border-b-4 border-[#3B271A]">
                <th className="py-3 px-4 text-left text-minecraft-gold font-bold">Heure</th>
                <th className="py-3 px-4 text-left text-minecraft-gold font-bold">Jeu</th>
                <th className="py-3 px-4 text-left text-minecraft-gold font-bold">Durée</th>
                <th className="py-3 px-4 text-left text-minecraft-gold font-bold">Détails</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((item, index) => (
                <tr key={index} className="border-t border-[#3B271A]/50">
                  <td className="py-3 px-4 font-mono">{item.time}</td>
                  <td className="py-3 px-4 font-bold">{item.game}</td>
                  <td className="py-3 px-4">{item.duration}</td>
                  <td className="py-3 px-4">{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
