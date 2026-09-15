import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  menuOuvert = false;

ouvrirMenu() {
  this.menuOuvert = true;
}

fermerMenu() {
  this.menuOuvert = false;
}
}
