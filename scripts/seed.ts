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

  // Création des caractéristiques (features) pour les amphis
  const projectorFeature = await db.feature.create({
    data: {
      name: 'Projecteur',
      value: 'HDMI + VGA',
      icon: 'bi-projector',
    },
  })

  const wifiFeature = await db.feature.create({
    data: {
      name: 'WiFi',
      value: 'Haut débit',
      icon: 'bi-wifi',
    },
  })

  const microphoneFeature = await db.feature.create({
    data: {
      name: 'Système audio',
      value: 'Microphones sans fil',
      icon: 'bi-mic',
    },
  })

  const accessibilityFeature = await db.feature.create({
    data: {
      name: 'Accessibilité PMR',
      value: 'Accès complet',
      icon: 'bi-universal-access',
    },
  })

  const recordingFeature = await db.feature.create({
    data: {
      name: 'Enregistrement',
      value: 'Système intégré',
      icon: 'bi-camera-video',
    },
  })

  const climatisationFeature = await db.feature.create({
    data: {
      name: 'Climatisation',
      value: 'Réglable',
      icon: 'bi-thermometer-half',
    },
  })

  const priseFeature = await db.feature.create({
    data: {
      name: 'Prises électriques',
      value: 'À chaque rangée',
      icon: 'bi-plug',
    },
  })

  const videoConferenceFeature = await db.feature.create({
    data: {
      name: 'Visioconférence',
      value: 'Équipement professionnel',
      icon: 'bi-camera-video-fill',
    },
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
      features: {
        connect: [
          { id: projectorFeature.id },
          { id: wifiFeature.id },
          { id: microphoneFeature.id },
          { id: accessibilityFeature.id },
          { id: recordingFeature.id },
        ],
      },
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
      features: {
        connect: [
          { id: projectorFeature.id },
          { id: wifiFeature.id },
          { id: priseFeature.id },
          { id: climatisationFeature.id },
        ],
      },
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
      features: {
        connect: [
          { id: projectorFeature.id },
          { id: microphoneFeature.id },
          { id: recordingFeature.id },
        ],
      },
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
      features: {
        connect: [
          { id: projectorFeature.id },
          { id: wifiFeature.id },
          { id: microphoneFeature.id },
          { id: accessibilityFeature.id },
          { id: videoConferenceFeature.id },
          { id: climatisationFeature.id },
          { id: priseFeature.id },
        ],
      },
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
      features: {
        connect: [{ id: projectorFeature.id }, { id: wifiFeature.id }],
      },
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
      features: {
        connect: [
          { id: projectorFeature.id },
          { id: microphoneFeature.id },
          { id: accessibilityFeature.id },
          { id: climatisationFeature.id },
        ],
      },
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
      features: {
        connect: [
          { id: projectorFeature.id },
          { id: wifiFeature.id },
          { id: accessibilityFeature.id },
        ],
      },
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
      features: {
        connect: [
          { id: projectorFeature.id },
          { id: wifiFeature.id },
          { id: videoConferenceFeature.id },
          { id: priseFeature.id },
        ],
      },
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
      features: {
        connect: [
          { id: projectorFeature.id },
          { id: microphoneFeature.id },
          { id: recordingFeature.id },
          { id: climatisationFeature.id },
        ],
      },
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
      features: {
        connect: [
          { id: projectorFeature.id },
          { id: wifiFeature.id },
          { id: videoConferenceFeature.id },
          { id: microphoneFeature.id },
          { id: accessibilityFeature.id },
          { id: priseFeature.id },
        ],
      },
    },
  })
  await db.image.createMany({
    data: [
      {
        url: 'https://cdn.filestackcontent.com/xA18mNg8T8m4YNdFkvw9',
        title: 'Amphi Henri Poincaré',
        amphiId: 1,
      },
      {
        url: 'https://cdn.filestackcontent.com/ZZFSQjxmS662qZgHKObF',
        title: 'Amphi Marie Curie',
        amphiId: 1,
      },
      {
        url: 'https://cdn.filestackcontent.com/CbVELVLzTPG7m90ZlPb7',
        title: 'Amphi Joliot-Curie',
        amphiId: 1,
      },
      {
        url: 'https://cdn.filestackcontent.com/ZZFSQjxmS662qZgHKObF',
        title: 'Amphi Marie Curie',
        amphiId: 2,
      },
      {
        url: 'https://cdn.filestackcontent.com/CbVELVLzTPG7m90ZlPb7',
        title: 'Amphi Joliot-Curie',
        amphiId: 3,
      },
      {
        url: 'https://cdn.filestackcontent.com/xw5khq8QT5ZfIyQd9PGX',
        title: 'Amphi CentraleSupélec',
        amphiId: 4,
      },
      {
        url: 'https://cdn.filestackcontent.com/xA18mNg8T8m4YNdFkvw9',
        title: 'Amphi Jean Perrin',
        amphiId: 5,
      },
      {
        url: 'https://cdn.filestackcontent.com/xA18mNg8T8m4YNdFkvw9',
        title: 'Grand Amphi',
        amphiId: 6,
      },
      {
        url: 'https://cdn.filestackcontent.com/ZZFSQjxmS662qZgHKObF',
        title: 'Amphi Richelieu',
        amphiId: 7,
      },
      {
        url: 'https://cdn.filestackcontent.com/CbVELVLzTPG7m90ZlPb7',
        title: 'Amphi Louis Weil',
        amphiId: 8,
      },
      {
        url: 'https://cdn.filestackcontent.com/xw5khq8QT5ZfIyQd9PGX',
        title: 'Amphi Le Bel',
        amphiId: 9,
      },
      {
        url: 'https://cdn.filestackcontent.com/xA18mNg8T8m4YNdFkvw9',
        title: 'Amphi Charles Mérieux',
        amphiId: 10,
      },
    ],
  })

  console.log('Seeding terminé avec succès!')
}
