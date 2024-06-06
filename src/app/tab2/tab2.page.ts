import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { DatePipe } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DatePipe]
})
export class Tab2Page implements OnInit {
  public forecast: any[] = [];

  constructor(
    private weatherService: WeatherService, 
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.weatherService.getForecast().subscribe((result: any) => {
      this.forecast = result.list.map((item: any) => {
        // Konversi waktu UTC ke WIB (Jakarta)
        const utcDate = new Date(item.dt_txt);
        const jakartaDate = new Date(utcDate.getTime() + (7 * 60 * 60 * 1000)); // UTC +7 hours
        const formattedDate = this.datePipe.transform(jakartaDate, 'dd MMM - hh a', 'id'); // 'id' untuk Indonesia
        return { 
          ...item, 
          formattedDate, 
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max
        };
      });
      console.log(this.forecast);
    });
  }

  detailpage(w: any): void {
    let weather = {   
      date: w.dt_txt,   
      temp: w.main.temp,   
      main: w.weather[0].main,   
      desc: w.weather[0].description,   
      icon: w.weather[0].icon   
    };   

    let extras: NavigationExtras = {   
      queryParams: {   
        special: JSON.stringify(weather)   
      }   
    };   

    this.router.navigate(['/detail'], extras);   
  }
}