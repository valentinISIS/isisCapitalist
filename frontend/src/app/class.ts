
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
  id: number = 0;
  name: string = "";
  logo: string = "";
  cout: number = 0;
  croissance: number = 0;
  revenu: number = 0;
  vitesse: number = 0;
  quantite: number = 0;
  timeleft: number = 0;
  managerUnlocked: boolean = false;
  paliers: Palier[] = [];
}

export class World {
  name: string = "";
  logo: string = "";
  money: number = 0;
  score: number = 0;
  totalangels: number = 0;
  activeangels: number = 0;
  angelbonus: number = 0;
  lastupdate: number = 0;
  products: Product[] = [];
  allunlocks: Palier[] = [];
  upgrades: Palier[] = [];
  angelupgrades: Palier[] = [];
  managers: Palier[] = [];
}
