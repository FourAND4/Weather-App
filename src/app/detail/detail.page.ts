import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  weather: any; // Variabel untuk menampung data cuaca

  constructor(private route: ActivatedRoute, private router: Router) {   
    this.route.queryParams.subscribe(params => {   
      if (params && params['special']) {   
        this.weather = JSON.parse(params['special']);   
      }   
    });
  }

  ngOnInit() {
    // Debugging purpose
    console.log(this.weather);
  }

  // Function untuk menyimpan data ke localStorage
  save() {   
    // Ambil data favorit yang sudah ada
    const favData = localStorage.getItem('fav');
    const existingFavorites = favData ? JSON.parse(favData) : [];
    // Tambahkan cuaca saat ini ke favorit
    existingFavorites.push(this.weather);
    // Simpan kembali ke localStorage
    localStorage.setItem('fav', JSON.stringify(existingFavorites));
  }  
}