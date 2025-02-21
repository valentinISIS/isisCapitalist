import { origworld } from './origworld';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Palier, Product, RatioType, World } from './graphql';

@Resolver('World')
export class GraphQlResolver {
  constructor(private service: AppService) {}
  @Query()
  async getWorld(@Args('user') user: string) {
    const world = this.service.readUserWorld(user);
    const updated_world = this.service.updateScore(world);
    this.service.saveWorld(user, updated_world);
    return updated_world;
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
      ((1 - product.croissance) ** quantite / (1 - product.croissance));
    product.cout *= (1 + product.croissance) ** quantite;

    world = this.service.updateProduct(world, product);
    this.service.updateUnlocks(user, world, product.id);
    this.service.saveWorld(user, world);
    return product;
  }

  @Mutation()
  async lancerProductionProduit(
    @Args('user') user: string,
    @Args('id') id: number,
  ) {
    let world = await this.getWorld(user);
    let product = this.service.findProduct(world, id);
    if (product == undefined)
      throw new Error(`Le produit avec l'id ${id} n'existe pas`);

    // Calcul du timeleft
    product.timeleft = product.vitesse;

    world = this.service.updateProduct(world, product);
    this.service.saveWorld(user, world);
    return product;
  }

  @Mutation()
  async acheterAngelUpgrade(
    @Args('user') user: string,
    @Args('name') name: string,
  ) {
    let world = await this.getWorld(user);
    let angelUpgarde = this.service.findAngelUpgrade(world, name);
    if (angelUpgarde == undefined)
      throw new Error(`L'upgrade avec le nom ${name} n'existe pas`);

    let product = this.service.findProduct(world, angelUpgarde.idcible);

    // Update de l'upgrade
    angelUpgarde.unlocked = true;
    world.activeangels -= angelUpgarde.seuil;

    if (product == undefined) {
      if ((angelUpgarde.typeratio = RatioType.gain)) {
        world.products.map((p) => {
          p.revenu *= angelUpgarde.ratio;
        });
      } else if ((angelUpgarde.typeratio = RatioType.vitesse)) {
        world.products.map((p) => {
          p.vitesse /= angelUpgarde.ratio;
        });
      }
    } else {
      world = this.service.updateProduct(world, product);
      world = this.service.updateCashUpgrade(world, angelUpgarde);
    }

    this.service.saveWorld(user, world);
    return angelUpgarde;
  }

  @Mutation()
  async acheterCashUpgrade(
    @Args('user') user: string,
    @Args('name') name: string,
  ) {
    let world = await this.getWorld(user);
    let upgarde = this.service.findUpgrade(world, name);
    if (upgarde == undefined)
      throw new Error(`L'upgrade avec le nom ${name} n'existe pas`);

    let product = this.service.findProduct(world, upgarde.idcible);

    // Update de l'upgrade
    upgarde.unlocked = true;
    world.money -= upgarde.seuil;

    if (product == undefined) {
      if ((upgarde.typeratio = RatioType.gain)) {
        world.products.map((p) => {
          p.revenu *= upgarde.ratio;
        });
      } else if ((upgarde.typeratio = RatioType.vitesse)) {
        world.products.map((p) => {
          p.vitesse /= upgarde.ratio;
        });
      } else if ((upgarde.typeratio = RatioType.ange)) {
        world.angelbonus *= upgarde.ratio;
      }
    } else {
      world = this.service.updateProduct(world, product);
      world = this.service.updateCashUpgrade(world, upgarde);
      this.service.saveWorld(user, world);
    }
    return upgarde;
  }

  @Mutation()
  async engagerManager(@Args('user') user: string, @Args('name') name: string) {
    let world = await this.getWorld(user);
    let manager = this.service.findManager(world, name);
    if (manager == undefined)
      throw new Error(`Le manager avec le nom ${name} n'existe pas`);

    let product = this.service.findProduct(world, manager.idcible);

    // Update du manager
    product.managerUnlocked = true;
    manager.unlocked = true;

    world = this.service.updateProduct(world, product);
    world = this.service.updateManager(world, manager);
    this.service.saveWorld(user, world);
    return manager;
  }

  @Mutation()
  async resetWorld(
    @Args('user') user: string,
  ) {
    let userWorld = await this.getWorld(user);
    let newWorld = origworld;

    newWorld.totalangels = (Math.sqrt(userWorld.score) / 100 | 0);
    newWorld.activeangels = newWorld.totalangels;
    newWorld.score = userWorld.score;

    this.service.saveWorld(user, newWorld);
    return newWorld;
  }
}
