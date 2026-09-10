import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  
  ngOnInit(): void {
    console.log("we are on dashboard");
    
  }
}
