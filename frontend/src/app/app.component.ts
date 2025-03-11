import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { World } from './class';
import { WebserviceService } from './webservice.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  image_server = 'http://localhost:3000/icones/';

  world: World = new World();
  user: string = "";
  constructor(private service: WebserviceService) {
    service.getWorld().then((world) => {
      this.world = world.data.getWorld;
      console.log(world.data.getWorld);
    });
    this.user = service.getUser()
  }
}
