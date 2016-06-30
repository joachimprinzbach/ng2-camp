import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {HotelWithCoordinate} from '../../../model/hotelWithCoordinate';

@Component({
  selector: 'hotels-map',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  styles: [`
    .sebm-google-map-container {
      height: 500px;
    }
  `],
  template: require('./hotels-map.component.html')
})
export class HotelsMapComponent {

  @Input()
  hotelsWithCoordinates: Observable<HotelWithCoordinate[]>;
}

