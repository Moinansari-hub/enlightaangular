
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any = null;
  errorMessage: string = '';
  loading: boolean = false;
   Object: any;

  constructor(private http: HttpClient) { }

  getWeather() {
    this.loading = true;
    this.errorMessage = '';

    const geocodingApiKey = '65ba2165024d5660860737spwaae037';
    const weatherApiKey = '3cac524057eb4d1582795741240602';
    const geocodingUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(this.city)}&api_key=${geocodingApiKey}`;

    this.http.get(geocodingUrl).subscribe((geocodingData: any) => {
      if (geocodingData.length === 0 || !geocodingData[0].lat || !geocodingData[0].lon) {
        this.handleError('City not found. Please enter a valid city.');
        this.loading = false;
        return;
      }

      const latitude = geocodingData[0].lat;
      const longitude = geocodingData[0].lon;
      const weatherApiUrl = `https://cors-anywhere.herokuapp.com/https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}`;

      this.http.get(weatherApiUrl).subscribe((weatherData: any) => {
        this.weatherData = weatherData.current;
        this.loading = false;
      }, error => {
        this.handleError('Failed to fetch weather data. ' + error.message);
        this.loading = false;
      });
    }, error => {
      this.handleError('Failed to fetch location data. ' + error.message);
      this.loading = false;
    });
  }
  getWeatherIcon(condition: string): string {
  let weatherIcon = '';

  if (condition.includes('snow')) {
    weatherIcon = 'snow.png';
  } else if (condition.includes('rain')) {
    weatherIcon = 'rain.png';
  } else if (condition.includes('cloud')) {
    weatherIcon = 'cloud.png';
  } else if (condition.includes('mist')) {
    weatherIcon = 'mist.png';
  } else {
    weatherIcon = 'clear.png';
  }

  return 'images/' + weatherIcon;
}
onCityChanged(city: string) {
  this.city = city;
}
  private handleError(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}
