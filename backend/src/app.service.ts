import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Product, RatioType, World } from './graphql';
import { origworld } from './origworld';
import * as path from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  readUserWorld(user: string): World {
    try {
      const data = fs.readFileSync(
        path.join(process.cwd(), 'userworlds/', user + '-world.json'),
      );
      return JSON.parse(data.toString());
    } catch (e: unknown) {
      console.log((e as Error).message);
      return origworld;
    }
  }

  saveWorld(user: string, world: World) {
    fs.writeFile(
      path.join(process.cwd(), 'userworlds/', user + '-world.json'),
      JSON.stringify(world),
      (err) => {
        if (err) {
          console.error(err);
          throw new Error(`Erreur d'écriture du monde coté serveur`);
        }
      },
    );
  }

  updateScore(world: World): World{

    const now = Date.now()
    const timelaps = now - world.lastupdate;
    let gain = 0;
    let pg;
    world.products.forEach(p => {
      pg = this.productGain(p, timelaps);
      gain += pg.gain;
      p.timeleft = pg.timeleft;
      this.updateProduct(world, p);
    });
    world.angelupgrades.forEach(a => {
      if (a.unlocked) gain *= a.ratio;
    });


    world.lastupdate = now;
    world.money += gain;
    world.score += gain;

    return world;
  }

  private productGain(product, timelaps: number){
    if (product.managerUnlocked){
      if ((timelaps-product.timeleft) < 0){
        return {gain: 0, timeleft: product.timeleft - timelaps, qt: 0};
      }
      else {
        return {gain: ((((timelaps-product.timeleft) / product.vitesse) | 0) + 1) * product.revenu, timeleft: product.vitesse-((timelaps-product.timeleft) % product.vitesse), qt: ((((timelaps-product.timeleft) / product.vitesse) | 0) + 1)};
      }
    }
    else {
      if (product.timeleft === 0){
        return {gain: 0, timeleft: 0, qt: 0};
      }
      else if (timelaps > product.timeleft) {
        return {gain: product.revenu, timeleft: 0, qt: 1};
      }
      else {
        return {gain: 0, timeleft: product.timeleft - timelaps, qt: 0};
      }
    }
  }

  updateUnlocks(world: World, idProduct: number){
    this.updateProduct(world, this.updateProductUnlock(this.findProduct(world, idProduct)));
    let mini_seuil = Number.POSITIVE_INFINITY;
    world.products.forEach(product => {
      mini_seuil = Math.min(mini_seuil, product.quantite);
    });

    world.upgrades.forEach(palier => {
      if (palier.unlocked === false && palier.seuil < mini_seuil){
        palier.unlocked = true;
        if (palier.typeratio = RatioType.gain){
          world.products.map((p) => {
            p.revenu *= palier.ratio;
          })
        }
        else if (palier.typeratio = RatioType.vitesse){
          world.products.map((p) => {
            p.vitesse /= palier.ratio;
          })
        }
      }
    });

    // TODO: Sauvegarder world
  }

  private updateProductUnlock(product: Product): Product{
    product.paliers.forEach(palier => {
      if (palier.unlocked === false && palier.seuil < product.quantite){
        palier.unlocked = true;
        if (palier.typeratio = RatioType.gain) product.revenu *= palier.ratio;
        else if (palier.typeratio = RatioType.vitesse) product.vitesse /= palier.ratio;
      }
    });
    return product;
  }



  findProduct(world: World, id: number){
    return world.products.find((product) => product.id === id);
  }

  findManager(world: World, name: string){
    return world.managers.find((manager => manager.name === name))
  }

  updateProduct(world: World, product: Product){
    world.products.map((p) => {
      if (p.id === product.id){
        p = product;
      }
      else {
        p = p;
      }
    })
    return world
  }
  
  updateManager(world: World, manager){
    world.managers.map((m) => {
      if (m.name === manager.name){
        m = manager;
      }
      else {
        m = m;
      }
    })
    return world
  }
}


