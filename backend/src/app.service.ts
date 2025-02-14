import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Product, World } from './graphql';
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

  updateScore(world: World){
    const now = Date.now()
    const timelaps = now - world.lastupdate;
    let gain = 0;
    world.products.forEach(p => {
      gain += this.productGain(p, timelaps);
    });
    world.angelupgrades.forEach(a => {
      if (a.unlocked) gain *= a.ratio;
    });


    world.lastupdate = now;
    world.money += gain;
    world.score += gain;
  }

  private productGain(product: Product, timelaps: number): number{
    if (product.managerUnlocked){
      if ((timelaps-product.timeleft) < 0){
        product.timeleft = product.timeleft - timelaps;
        return 0;
      }
      else {
        product.timeleft = (timelaps-product.timeleft) % product.vitesse
        return (((timelaps-product.timeleft) / product.vitesse) | 0) * product.revenu;
      }
    }
    else {
      if (product.timeleft === 0){
        return 0;
      }
      else if (timelaps > product.timeleft) {
        product.timeleft = 0
        return product.revenu;
      }
      else {
        product.timeleft -= timelaps
      }
    }
    return 0;
  }
}
