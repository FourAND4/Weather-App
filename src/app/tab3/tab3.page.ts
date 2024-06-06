import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public fav: any[] = [];

  constructor() { }

  ngOnInit() {   
    const favData = localStorage.getItem('fav');
    if (favData) {
      this.fav = JSON.parse(favData);
    }
    console.log(this.fav);   
  }
}