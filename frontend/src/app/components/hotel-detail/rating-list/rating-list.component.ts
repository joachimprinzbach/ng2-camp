import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Rating} from '../../../model/backend-typings';
import {RatingService} from '../../../shared/rating.service';

@Component({
  selector: 'rating-list',
  directives: [],
  providers: [],
  template: require('./rating-list.component.html')
})
export class RatingListComponent implements OnInit {

  @Input('hotelId') hotelId: Observable<number>;

  ratings: Observable<Rating[]>;

  constructor(private ratingService: RatingService) {
  }

  ngOnInit(): any {
    this.hotelId
      .filter(hotelId => !isNaN(hotelId))
      .subscribe(hotelId => this.ratings = this.ratingService.getByHotelId(hotelId));
  }
}