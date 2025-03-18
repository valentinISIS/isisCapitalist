import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import { ACETER_QT_PRODUIT, ACHETERCASHUPGRADE, ENGAGER_MANAGER, GET_WORLD, LANCER_PRODUCTION_PRODUIT } from './graphrequests';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor() { }

  server = 'http://localhost:3000/graphql';
  user = 'toto'

  createClient() {
    return new Client({url : this.server,
        exchanges: [fetchExchange]
    });
  }

  getWorld() {
    return this.createClient().query(GET_WORLD, {"user" : this.user}).toPromise();
  }

  getUser() {
    return this.user;
  }

  lancerProductionProduit(id: number){
    return this.createClient().mutation(LANCER_PRODUCTION_PRODUIT, {"user" : this.user, id: id}).toPromise();
  }

  acheterQtProduit(id: number, quantite: number){
    return this.createClient().mutation(ACETER_QT_PRODUIT, {"user" : this.user, id: id, quantite: quantite}).toPromise();
  }

  engagerManager(name: String){
    return this.createClient().mutation(ENGAGER_MANAGER, {"user" : this.user, "name": name}).toPromise();
  }

  acheterCashUpgrade(name: String){
    return this.createClient().mutation(ACHETERCASHUPGRADE, {"user" : this.user, "name": name}).toPromise();
  }
}




