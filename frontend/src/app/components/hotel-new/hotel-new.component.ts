import {Component, OnInit} from '@angular/core';
import {Hotel, Country} from '../../model/backend-typings';
import {HotelService} from '../../shared/hotel.service';
import {Router} from '@ngrx/router';
import {CountryService} from '../../shared/country.service';
import {MaterializeDirective} from 'angular2-materialize';

@Component({
  selector: 'hotel-new',
  directives: [MaterializeDirective],
  providers: [],
  template: require('./hotel-new.component.html')
})
export class HotelNewComponent implements OnInit {
  hotel: Hotel = {};
  countries: Country[];

  constructor(private hotelService: HotelService,
              private countryService: CountryService,
              private router: Router) {
  }

  ngOnInit() {
    this.countryService.getAllCountries().subscribe((countries:Country[]) =>{
      this.countries = countries;
    });
  }

  saveHotel() {
    this.hotelService.saveHotel(this.hotel).subscribe((hotel:Hotel) =>
      this.openHotel(hotel));
  }

  openHotel(hotel: Hotel) {
    this.router.go('/hotels/' + hotel.id);
  }
}
