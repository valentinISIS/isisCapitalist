import { RatioType } from './graphql';
export const origworld = {
  name: 'La planète des singes',
  logo: 'icones/Logo_world.png',
  money: 0,
  score: 0,
  totalangels: 0,
  activeangels: 0,
  angelbonus: 2,
  lastupdate: 0,
  products: [
    {
      id: 1,
      name: "Vendeur de rose",
      logo: "icones/vendeur_rose.png",
      cout: 80,
      croissance: 1.18,
      revenu: 1,
      vitesse: 3500,
      quantite: 1,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: "la rose !",
          logo: "icones/rose_basique.png",
          seuil: 60,
          idcible: 1,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "la rose bleue !",
          logo: "icones/rose_bleu.png",
          seuil: 60,
          idcible: 1,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "la rose en or massif !",
          logo: "icones/rose_or_massif.png",
          seuil: 60,
          idcible: 1,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "la rose verte !",
          logo: "icones/rose_verte.png",
          seuil: 60,
          idcible: 1,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "la rose violette !",
          logo: "icones/rose_violette.png",
          seuil: 60,
          idcible: 1,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "la rose multicouleur !",
          logo: "icones/rose_multicolor.png",
          seuil: 60,
          idcible: 1,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        }
      ]
    },
    {
      id: 2,
      name: "Salle de muscu",
      logo: "icones/salle_muscu.png",
      cout: 80,
      croissance: 1.18,
      revenu: 60,
      vitesse: 3500,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: "Le banc de muscu !",
          logo: "icones/banc_muscu.png",
          seuil: 60,
          idcible: 2,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Le tapis de course !",
          logo: "icones/tapis_course.png",
          seuil: 60,
          idcible: 2,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "La barre de traction !",
          logo: "icones/barre_traction.png",
          seuil: 60,
          idcible: 2,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Le vélo !",
          logo: "icones/velo.png",
          seuil: 60,
          idcible: 2,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Kettlebel !",
          logo: "icones/kettlebel.png",
          seuil: 60,
          idcible: 2,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Dumbbell !",
          logo: "icones/dumbebell.jpg",
          seuil: 60,
          idcible: 2,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        }
      ]
    },
    {
      id: 3,
      name: "Instruments de music",
      logo: "icones/instruments_music.png",
      cout: 80,
      croissance: 1.18,
      revenu: 60,
      vitesse: 3500,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: "Le violon !",
          logo: "icones/violon.png",
          seuil: 60,
          idcible: 3,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "La guitare !",
          logo: "icones/guitare.png",
          seuil: 60,
          idcible: 3,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "La harpe !",
          logo: "icones/harpe.png",
          seuil: 60,
          idcible: 3,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Le piano! ",
          logo: "icones/piano.png",
          seuil: 60,
          idcible: 3,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "L'accordéon !",
          logo: "icones/accordeon.png",
          seuil: 60,
          idcible: 3,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "La flûte traversière !",
          logo: "icones/flute.jpg",
          seuil: 60,
          idcible: 3,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        }
      ]
    },
    {
      id: 4,
      name: "Prisons",
      logo: "icones/prisons.png",
      cout: 80,
      croissance: 1.18,
      revenu: 60,
      vitesse: 3500,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: "Bang Kwang Central Prison (Thailand) !",
          logo: "icones/bang_kwang_Central.jpg.jpg",
          seuil: 60,
          idcible: 4,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Cook County Jail (USA) !",
          logo: "icones/cook_county_jail.jpg",
          seuil: 60,
          idcible: 4,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Harris County Jail (USA) !",
          logo: "icones/harris_county_jail.jpeg",
          seuil: 60,
          idcible: 4,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Rikers Island Jail (USA) !",
          logo: "icones/rikers_island_jail.jpg",
          seuil: 60,
          idcible: 4,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "New Bilibid Prison (Philippines) !",
          logo: "icones/new_bilibid.jpg",
          seuil: 60,
          idcible: 4,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Los Angeles County Jail, USA !",
          logo: "icones/los_angeles_county.jpg",
          seuil: 60,
          idcible: 4,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        }
      ]
    },
    {
      id: 5,
      name: "Bijoux",
      logo: "icones/bijoux.png",
      cout: 80,
      croissance: 1.18,
      revenu: 60,
      vitesse: 3500,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: "Le diamant !",
          logo: "icones/diamant.png",
          seuil: 60,
          idcible: 5,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Le lingot d'or !",
          logo: "icones/lingot_or.png",
          seuil: 60,
          idcible: 5,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Le rubis !",
          logo: "icones/rubis.png",
          seuil: 60,
          idcible: 5,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "L'émeraude !",
          logo: "icones/emeraude.png",
          seuil: 60,
          idcible: 5,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "Le saphir !",
          logo: "icones/saphir.png",
          seuil: 60,
          idcible: 5,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "La platine !",
          logo: "icones/platine.png",
          seuil: 60,
          idcible: 5,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        }
      ]
    },
    {
      id: 6,
      name: "Fruits",
      logo: "icones/fruits.png",
      cout: 80,
      croissance: 1.18,
      revenu: 60,
      vitesse: 3500,
      quantite: 0,
      timeleft: 0,
      managerUnlocked: false,
      paliers: [
        {
          name: "La banane !",
          logo: "icones/banane.png",
          seuil: 60,
          idcible: 6,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "L'ananas !",
          logo: "icones/ananas.png",
          seuil: 60,
          idcible: 6,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "L'orange !",
          logo: "icones/orange.jpg",
          seuil: 60,
          idcible: 6,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "La pomme !",
          logo: "icones/pomme.png",
          seuil: 60,
          idcible: 6,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "La mangue !",
          logo: "icones/mangue.png",
          seuil: 60,
          idcible: 6,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        },
        {
          name: "La fraise !",
          logo: "icones/fraise.png",
          seuil: 60,
          idcible: 6,
          ratio: 2,
          typeratio: RatioType.vitesse,
          unlocked: false
        }
      ]
    },
  ],
  allunlocks: [
    {
      name: 'All is better than one',
      logo: 'icones/all.jpg',
      seuil: 30,
      idcible: 0,
      ratio: 2,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'To take and not to give',
      logo: 'icones/all.jpg',
      seuil: 150,
      idcible: 0,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
  ],
  upgrades: [
    {
      name: 'Do you like paper bag ?',
      logo: 'icones/sacpapier.jpg',
      seuil: 1000,
      idcible: 1,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'This is my bin',
      logo: 'icones/recyclage.jpg',
      seuil: 15000,
      idcible: 2,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
  ],
  angelupgrades: [
    {
      name: 'Angel Sacrifice',
      logo: 'icones/angel.png',
      seuil: 10,
      idcible: 0,
      ratio: 3,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Angelic Mutiny',
      logo: 'icones/angel.png',
      seuil: 100000,
      idcible: -1,
      ratio: 2,
      typeratio: RatioType.ange,
      unlocked: false,
    },
  ],
  managers: [
    {
      name: 'Victoria Elletem',
      logo: 'icones/elletem.png',
      seuil: 10000,
      idcible: 1,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Jean-Marie Pectoraux',
      logo: 'icones/pectoraux.png',
      seuil: 15000,
      idcible: 2,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Alexis Single',
      logo: 'icones/single.png',
      seuil: 20000,
      idcible: 3,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Nicolas Barro',
      logo: 'icones/barro.png',
      seuil: 25000,
      idcible: 4,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Lamine Doré',
      logo: 'icones/dore.png',
      seuil: 30000,
      idcible: 5,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
    {
      name: 'Yannick Palmier',
      logo: 'icones/palmier.png',
      seuil: 35000,
      idcible: 6,
      ratio: 0,
      typeratio: RatioType.gain,
      unlocked: false,
    },
  ],
};
