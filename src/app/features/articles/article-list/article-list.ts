import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  imports: [],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css',
})
export class ArticleList implements OnInit{
  
  ngOnInit(): void {
    console.log("article page");
    
  }

}
