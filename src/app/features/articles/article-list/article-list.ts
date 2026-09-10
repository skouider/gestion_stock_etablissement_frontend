import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../core/services/article-service';
import { ArticleDTO } from '../../../models/article.dto';

@Component({
  selector: 'app-article-list',
  imports: [],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css',
})
export class ArticleList implements OnInit{


  constructor(private articleService:ArticleService){

  }

  ngOnInit(): void {
    console.log("we are on article liste");
    this.findAll()
     }

  findAll(){
    this.articleService.getAll().subscribe(data=>{
      console.log(data);
      
    },err=>{
      console.log(err);
      
    })
  }
  
    getById(id: number) {
  
      this.articleService.getById(id).subscribe(data=>{
        console.log("id article",id);
        
      },err=>{
        console.log(err);
        
      })
  
    }
  
    getByCode(code: string) {
  
      this.articleService.getByCode(code).subscribe(data=>{
        console.log("code article",code);
        console.log("code data ==",data);
        
      },err=>{
        console.log(err);
        
      })
  
    }
  
    getByStock(stockId: number) {
  
     this.articleService.getByStock(stockId).subscribe(data=>{
        console.log("id data",data);

      },err=>{
        console.log(err);
        
      })
  
    }
  
    search(nom: string) {
  
      
      this.articleService.search(nom).subscribe(data=>{
        console.log("nom===",data);
        
      },err=>{
        console.log(err);
        
      })
  
    }
  
    save(article: ArticleDTO) {
  
      this.articleService.save(article).subscribe(data=>{
        console.log("save article===",data);
        
      },err=>{
        console.log(err);
        
      })
  
    }
  
    update(id: number,article: ArticleDTO) {    
  
    }
  
    delete(id: number){
  
      
  
    }

}
