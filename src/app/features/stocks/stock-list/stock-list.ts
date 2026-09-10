import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../core/services/stock-service';
import { StockRequestDTO } from '../../../models/stock-request.dto';

@Component({
  selector: 'app-stock-list',
  imports: [],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.css',
})
export class StockList implements OnInit{

  

  constructor(private stockService:StockService){

  }
  ngOnInit(): void {
    this.getAll()
  }

getAll() {

    return this.stockService.getAll().subscribe(data=>{
      console.log("liste stock",data);
            
    },err=>{
      console.log(err);
      
    })

  }

  getById(id: number){

    this.stockService.getById(id).subscribe(data=>{
      console.log('le stock par id :',data);
      
    })

  }

  create(stock: StockRequestDTO) {

    this.stockService.create(stock).subscribe(data=>{
      console.log('save stock ==',data);
      
    },err=>{
      console.log(err);
      
    })

  }

  update(id: number,stock: StockRequestDTO) {
    

  }

  delete(id: number) {

    

  }
  
}
