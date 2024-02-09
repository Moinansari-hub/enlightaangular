import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  city: string = ''; 
  @Output() cityChanged = new EventEmitter<string>();

  onCityChange(city:string) {
    this.cityChanged.emit(city);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
