import { db } from 'api/src/lib/db'

export default async () => {
  // Création des universités
  const universitySaclay = await db.university.create({
    data: { name: 'Université Paris-Saclay' },
  })

  const universitySorbonne = await db.university.create({
    data: { name: 'Sorbonne Université' },
  })

  const universityGrenoble = await db.university.create({
    data: { name: 'Université Grenoble Alpes' },
  })

  const universityStras = await db.university.create({
    data: { name: 'Université de Strasbourg' },
  })

  const universityLyon = await db.university.create({
    data: { name: 'Université de Lyon' },
  })

  // Création des amphis pour Université Paris-Saclay
  await db.amphi.create({
    data: {
      name: 'Amphi Henri Poincaré',
      lat: 48.712375,
      lon: 2.169235,
      seats: 450,
      description:
        "Grand amphithéâtre principal situé au cœur du campus de l'Université Paris-Saclay, utilisé pour les conférences majeures et les cours de sciences fondamentales.",
      universityId: universitySaclay.id,
    },
  })

  await db.amphi.create({
    data: {
      name: 'Amphi Marie Curie',
      lat: 48.710983,
      lon: 2.173584,
      seats: 380,
      description:
        'Amphithéâtre moderne du bâtiment de physique-chimie, équipé de technologies avancées pour les démonstrations expérimentales.',
      universityId: universitySaclay.id,
    },
  })

  await db.amphi.create({
    data: {
      name: 'Amphi Joliot-Curie',
      lat: 48.714203,
      lon: 2.167822,
      seats: 280,
      description:
        "Situé dans le bâtiment des sciences de la vie, cet amphi dispose d'acoustique exceptionnelle et d'équipements multimédias modernes.",
      universityId: universitySaclay.id,
    },
  })

  await db.amphi.create({
    data: {
      name: 'Amphi CentraleSupélec',
      lat: 48.709562,
      lon: 2.165412,
      seats: 520,
      description:
        'Le plus grand amphithéâtre du campus, situé dans le bâtiment CentraleSupélec, utilisé pour les événements majeurs et cérémonies.',
      universityId: universitySaclay.id,
    },
  })

  await db.amphi.create({
    data: {
      name: 'Amphi Jean Perrin',
      lat: 48.711892,
      lon: 2.170651,
      seats: 200,
      description:
        'Petit amphithéâtre intimiste dédié aux séminaires et aux cours spécialisés en physique quantique.',
      universityId: universitySaclay.id,
    },
  })

  // Création des amphis pour Sorbonne Université
  await db.amphi.create({
    data: {
      name: 'Grand Amphi',
      lat: 48.846912,
      lon: 2.356427,
      seats: 650,
      description:
        "Amphithéâtre historique du campus Jussieu, connu pour son architecture remarquable et sa grande capacité d'accueil.",
      universityId: universitySorbonne.id,
    },
  })

  await db.amphi.create({
    data: {
      name: 'Amphi Richelieu',
      lat: 48.851023,
      lon: 2.344763,
      seats: 300,
      description:
        'Situé au cœur du Quartier Latin, cet amphithéâtre de style classique accueille principalement les cours de lettres et sciences humaines.',
      universityId: universitySorbonne.id,
    },
  })

  // Création des amphis pour les autres universités
  await db.amphi.create({
    data: {
      name: 'Amphi Louis Weil',
      lat: 45.193276,
      lon: 5.767328,
      seats: 400,
      description:
        "Amphithéâtre principal du campus scientifique de Saint-Martin-d'Hères, adapté pour les conférences internationales.",
      universityId: universityGrenoble.id,
    },
  })

  await db.amphi.create({
    data: {
      name: 'Amphi Le Bel',
      lat: 48.579372,
      lon: 7.765324,
      seats: 480,
      description:
        "Grand amphithéâtre du campus central de Strasbourg, nommé d'après le chimiste alsacien Joseph Achille Le Bel.",
      universityId: universityStras.id,
    },
  })

  await db.amphi.create({
    data: {
      name: 'Amphi Charles Mérieux',
      lat: 45.72973,
      lon: 4.82649,
      seats: 550,
      description:
        "Amphithéâtre moderne du campus de la Doua, équipé pour l'enseignement des sciences et technologies avancées.",
      universityId: universityLyon.id,
    },
  })

  console.log('Seeding terminé avec succès!')
}
