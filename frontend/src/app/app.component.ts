import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { World, Product, Palier, RatioType } from './class';
import { WebserviceService } from './webservice.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { BigvaluePipe } from './bigvalue.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ProductComponent, BigvaluePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  image_server = 'http://localhost:3000/icones/';

  world: World = new World();
  user: string = '';

  // Onglet actif par défaut
  activeTab: string = 'managers';

  // Ajout d'une variable pour la quantité sélectionnée
  selectedQuantity: 'x1' | 'x10' | 'x100' | 'max' = 'x1';

  constructor(private service: WebserviceService) {
    service.getWorld().then((world) => {
      this.world = world.data.getWorld;
    });
    this.user = service.getUser();
  }

  // Méthode pour changer la quantité sélectionnée dynamiquement
  changeQuantity() {
    switch (this.selectedQuantity) {
      case 'x1':
        this.selectedQuantity = 'x10';
        break;
      case 'x10':
        this.selectedQuantity = 'x100';
        break;
      case 'x100':
        this.selectedQuantity = 'max';
        break;
      case 'max':
        this.selectedQuantity = 'x1';
        break;
    }
  }

  // Méthode pour notifier qu'une production est terminée et pour mettre à jour le score
  onProductionDone(message: { p: Product; qt: number }) {
    const gain =
      message.p.revenu *
      message.qt *
      (1 + (this.world.activeangels * this.world.angelbonus) / 100);
    this.world.score += gain;
    this.world.money += gain;
  }

  onBuy(achat: number) {
    this.world.money -= achat;
  }

  showManagers: boolean = false;

  engagerManager(manager: Palier) {
    this.world.money -= manager.seuil;

    // Déverrouille le manager en mettant à jour son statut dans la liste des managers
    manager.unlocked = true;

    // Déverrouiller également le manager dans le produit cible
    const product = this.world.products[manager.idcible - 1]; // Assure-toi que idcible est un index valide
    if (product) {
      product.managerUnlocked = true; // Déverrouille le manager pour le produit
    }

    this.service.engagerManager(manager.name);
  }

  acheterUpgrade(upgrade: Palier) {
    this.world.money -= upgrade.seuil;
    upgrade.unlocked = true;

    if ((upgrade.typeratio = RatioType.gain)) {
      this.world.products.map((p) => {
        p.revenu *= upgrade.ratio;
      });
    } else if ((upgrade.typeratio = RatioType.vitesse)) {
      this.world.products.map((p) => {
        p.vitesse /= upgrade.ratio;
      });
    } else if ((upgrade.typeratio = RatioType.ange)) {
      this.world.angelbonus *= upgrade.ratio;
    }

    this.service.acheterCashUpgrade(upgrade.name);
  }
}
