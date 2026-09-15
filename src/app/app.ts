import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './shared/nav-bar/nav-bar';
import { ArticleDetail } from './features/articles/article-detail/article-detail';
import { SideBar } from './shared/side-bar/side-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestion_stock_CIC_2');
}
