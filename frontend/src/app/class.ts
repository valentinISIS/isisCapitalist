
export enum RatioType {
  gain = "gain",
  vitesse = "vitesse",
  ange = "ange"
}

export class Palier {
  name: string | undefined;
  logo: string | undefined;
  seuil: number | undefined;
  idcible: number | undefined;
  ratio: number | undefined;
  typeratio: RatioType | undefined;
  unlocked: boolean | undefined;
}

export class Product {
  id: number | undefined;
  name: string | undefined;
  logo: string | undefined;
  cout: number | undefined;
  croissance: number | undefined;
  revenu: number | undefined;
  vitesse: number | undefined;
  quantite: number | undefined;
  timeleft: number | undefined;
  managerUnlocked: boolean | undefined;
  paliers: Palier[] | undefined;
}

export class World {
  name: string | undefined;
  logo: string | undefined;
  money: number | undefined;
  score: number | undefined;
  totalangels: number | undefined;
  activeangels: number | undefined;
  angelbonus: number | undefined;
  lastupdate: number | undefined;
  products: Product[] | undefined;
  allunlocks: Palier[] | undefined;
  upgrades: Palier[] | undefined;
  angelupgrades: Palier[] | undefined;
  managers: Palier[] | undefined;
}
