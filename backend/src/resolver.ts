import { origworld } from './origworld';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Palier, Product, World } from './graphql';

@Resolver('World')
export class GraphQlResolver {
  constructor(private service: AppService) {}
  @Query()
  async getWorld(@Args('user') user: string) {
    const world = this.service.readUserWorld(user);
    this.service.updateScore(world);
    return world;
  }

  @Mutation()
  async acheterQtProduit(
    @Args('user') user: string,
    @Args('id') id: number,
    @Args('quantite') quantite: number,
  ) {
    let world = await this.getWorld(user);
    let product = world.products.find((product) => product.id == id);
    if (product == undefined)
      throw new Error(`Le produit avec l'id ${id} n'existe pas`);

    // Calcul du cout
    product.quantite += quantite;
    world.money -=
      product.cout *
      (((1 - product.croissance) ** quantite) /
        (1 - product.croissance));
    product.cout *= (1 + product.croissance) ** quantite;

    world = this.updateProduct(world, product)
    this.service.saveWorld(user, world);
    return product;
  }

  @Mutation()
  async lancerProductionProduit(
    @Args('user') user: string,
    @Args('id') id: number,
  ) {
    let world = await this.getWorld(user);
    let product = this.findProduct(world, id);
    if (product == undefined)
      throw new Error(`Le produit avec l'id ${id} n'existe pas`);

    // Calcul du timeleft
    product.timeleft = product.vitesse;

    world = this.updateProduct(world, product)
    this.service.saveWorld(user, world);
    return product;
  }

  @Mutation()
  async engagerManager(
    @Args('user') user: string,
    @Args('name') name: string,
  ) {
    let world = await this.getWorld(user);
    let manager = this.findManager(world, name);
    if (manager == undefined)
      throw new Error(`Le manager avec le nom ${name} n'existe pas`);

    let product = this.findProduct(world, manager.idcible);
    

    // Update du manager
    product.managerUnlocked = true
    manager.unlocked = true

    world = this.updateProduct(world, product)
    world = this.updateManager(world, manager)
    this.service.saveWorld(user, world);
    return manager;
  }


  private findProduct(world: World, id: number){
    return world.products.find((product) => product.id === id);
  }

  private findManager(world: World, name: string){
    return world.managers.find((manager => manager.name === name))
  }

  private updateProduct(world: World, product: Product){
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
  private updateManager(world: World, manager){
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
