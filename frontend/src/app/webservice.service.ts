import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import { GET_WORLD } from './graphrequests';

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
}




