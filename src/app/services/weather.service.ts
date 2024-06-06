import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherResponse {
  weather: any[];
  main: {
    temp: number;
  };
  name: string; 
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/';
  key = '9e6bbc61d13b6bbf6590e3be91554e78';
  city = 'Sleman';

  constructor(private http: HttpClient) { }

  getData(): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${this.url}weather?q=${this.city}&appid=${this.key}&units=metric`);
  }

  getForecast() {
    return this.http.get(`${this.url}forecast?q=${this.city}&appid=${this.key}&units=metric`);
  }
}