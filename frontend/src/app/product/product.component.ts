import { Component, Input, OnInit, Output } from '@angular/core';
import { Product, RatioType } from '../class';
import { BigvaluePipe } from '../bigvalue.pipe';
import { MyProgressBarComponent, Orientation } from '../progressbar.component';
import { EventEmitter } from '@angular/core';
import { WebserviceService } from './../webservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [BigvaluePipe, MyProgressBarComponent, CommonModule],
})
export class ProductComponent implements OnInit {
  image_server = 'http://localhost:3000/icones/';
  service = new WebserviceService();

  product: Product = new Product();
  @Input()
  set prod(value: Product) {
    this.product = value;
    this.initialValue = this.product.vitesse - this.product.timeleft;
    console.log('adresse:' + this.image_server + this.product.logo);
  }
  @Input() worldMoney: number = 0; // Input pour recevoir l'argent du joueur
  @Input() selectedQuantity: 'x1' | 'x10' | 'x100' | 'max' = 'x1'; // Nouvelle input pour la quantité sélectionnée

  @Output() notifyProduction: EventEmitter<{ p: Product; qt: number }> =
    new EventEmitter();

  @Output() notifyBuy: EventEmitter<number> = new EventEmitter();

  initialValue = 0;
  run = false;
  auto = false;
  orientation = Orientation.horizontal;
  private interval: any;
  private lastUpdate: number = Date.now();

  ngOnInit() {
    this.interval = setInterval(() => {
      this.calcScore();
    }, 100);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startFabrication() {
    this.run = true;
    this.product.timeleft = this.product.vitesse;
    this.initialValue = 0;
    this.service.lancerProductionProduit(this.product.id);
  }

  calcScore() {
    let now = Date.now();
    let timelaps = (now - this.lastUpdate) / 1000; // Convertir en secondes
    this.lastUpdate = now;

    let result = this.productGain(this.product, timelaps);

    this.initialValue += timelaps; // Met à jour la barre de progression
    this.product.timeleft = result.timeleft; // ✅ Mise à jour du timeleft

    if (this.initialValue >= this.product.vitesse) {
      this.run = false; // Arrêter la production si elle est terminée, sauf si manager
    }

    // 🚀 Relancer la production automatiquement SEULEMENT si le manager est débloqué
    if (this.product.managerUnlocked && !this.run) {
      this.startFabrication();
    }

    // on prévient le composant parent que ce produit a généré son revenu.
    if (result.qt > 0)
      this.notifyProduction.emit({ p: this.product, qt: result.qt });
  }

  private productGain(product: Product, timelaps: number) {
    if (product.managerUnlocked) {
      if (timelaps - product.timeleft < 0) {
        return { gain: 0, timeleft: product.timeleft - timelaps, qt: 0 };
      } else {
        let qt =
          Math.floor((timelaps - product.timeleft) / product.vitesse) + 1;
        let gain = qt * product.revenu;
        let timeleft =
          product.vitesse - ((timelaps - product.timeleft) % product.vitesse);
        return { gain, timeleft, qt };
      }
    } else {
      if (product.timeleft === 0) {
        return { gain: 0, timeleft: 0, qt: 0 };
      } else if (timelaps > product.timeleft) {
        return { gain: product.revenu, timeleft: 0, qt: 1 };
      } else {
        return { gain: 0, timeleft: product.timeleft - timelaps, qt: 0 };
      }
    }
  }

  acheterProduit() {
    let quantityToBuy = 0;

    // Selon le multiplicateur choisi
    switch (this.selectedQuantity) {
      case 'x1':
        quantityToBuy = 1;
        break;
      case 'x10':
        quantityToBuy = 10;
        break;
      case 'x100':
        quantityToBuy = 100;
        break;
      case 'max':
        // Vérifier si le joueur peut acheter au moins 1 produit avec le multiplicateur 'max'
        quantityToBuy = this.calcMaxCanBuy();
        break;
    }

    let totalCost = this.getCoutTotal();
    this.notifyBuy.emit(totalCost);
    this.product.quantite += quantityToBuy;
    this.product.cout *= Math.pow(
      this.product.croissance * 1.05,
      quantityToBuy
    );
    this.product.revenu *= Math.pow(this.product.croissance, quantityToBuy);
    this.service.acheterQtProduit(this.product.id, quantityToBuy);

    this.verifyPalier();
  }

  calcMaxCanBuy(): number {
    let totalMoney = this.worldMoney; // L'argent disponible du joueur
    let totalCost = 0; // Coût total accumulé
    let quantity = 0; // Quantité de produits achetés

    while (totalCost <= totalMoney) {
      // Calcul du prix pour le produit suivant
      let priceForNextProduct =
        this.product.cout * Math.pow(this.product.croissance, quantity); // prix avec l'augmentation progressive

      if (totalCost + priceForNextProduct > totalMoney) {
        break; // On arrête si l'on ne peut pas se permettre d'acheter le prochain produit
      }

      totalCost += priceForNextProduct; // Ajouter le coût du produit au total
      quantity++; // Incrémenter la quantité achetée
    }

    return quantity; // Retourne le nombre maximal de produits que l'on peut acheter
  }

  // Méthode pour vérifier si le bouton doit être activé
  isBuyable(): boolean {
    let quantityToBuy = 0;

    // Selon le multiplicateur choisi
    switch (this.selectedQuantity) {
      case 'x1':
        quantityToBuy = 1;
        break;
      case 'x10':
        quantityToBuy = 10;
        break;
      case 'x100':
        quantityToBuy = 100;
        break;
      case 'max':
        // Vérifier si le joueur peut acheter au moins 1 produit avec le multiplicateur 'max'
        quantityToBuy = this.calcMaxCanBuy();
        break;
      default:
        return false;
    }

    const totalCost =
      (this.product.cout *
        (1 - Math.pow(this.product.croissance, quantityToBuy))) /
      (1 - this.product.croissance);
    return this.worldMoney >= totalCost; // Retourne vrai si l'argent du joueur est suffisant
  }

  getCoutTotal(): number {
    let quantiteAacheter = this.calcMaxCanBuy();
    if (this.selectedQuantity === 'x1') quantiteAacheter = 1;
    else if (this.selectedQuantity === 'x10') quantiteAacheter = 10;
    else if (this.selectedQuantity === 'x100') quantiteAacheter = 100;

    return (
      (this.product.cout *
        (1 - Math.pow(this.product.croissance, quantiteAacheter))) /
      (1 - this.product.croissance)
    );
  }

  showUnlocks = false; // Gère l'affichage du pop-up

  toggleUnlocksPopup() {
    this.showUnlocks = !this.showUnlocks;
  }

  verifyPalier() {
    this.product.paliers.forEach((palier) => {
      if (palier.unlocked === false && palier.seuil < this.product.quantite) {
        palier.unlocked = true;
        if ((palier.typeratio = RatioType.gain))
          this.product.revenu *= palier.ratio;
        else if ((palier.typeratio = RatioType.vitesse))
          this.product.vitesse /= palier.ratio;
      }
    });
  }
}
