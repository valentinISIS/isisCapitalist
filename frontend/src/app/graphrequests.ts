import { gql } from '@urql/core';

export const GET_WORLD = gql`
  query getWorld($user: String!) {
    getWorld(user: $user) {
      name
      logo
      money
      score
      totalangels
      activeangels
      angelbonus
      lastupdate
      products {
        id
        name
        logo
        cout
        croissance
        revenu
        vitesse
        quantite
        timeleft
        managerUnlocked
        paliers {
          name
          logo
          seuil
          idcible
          ratio
          typeratio
          unlocked
        }
      }
      allunlocks {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      upgrades {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      angelupgrades {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      managers {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
  }
`;

export const LANCER_PRODUCTION_PRODUIT = gql`
  mutation lancerProductionProduit($user: String!, $id: Int!){
    lancerProductionProduit(user: $user, id: $id){id}
  }`;

export const ACETER_QT_PRODUIT = gql`
  mutation acheterQtProduit($user: String!, $id: Int!, $quantite: Int!){
    acheterQtProduit(user: $user, id: $id, quantite: $quantite){id}
  }`;

export const ENGAGER_MANAGER = gql`
  mutation engagerManager($user: String!, $name: String!){
    engagerManager(user: $user, name: $name){id}
  }`;


  export const ACHETERCASHUPGRADE = gql`
  mutation acheterCashUpgrade($user: String!, $name: String!){
    acheterCashUpgrade(user: $user, name: $name){id}
  }`;
