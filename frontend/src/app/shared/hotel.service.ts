import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../model/backend-typings';
import {CrudService} from './crud.service';
import {MapService} from '../shared/map.service';
import {HotelWithCoordinate} from '../model/hotelWithCoordinate';

@Injectable()
export class HotelService {

  constructor(private crud: CrudService, private mapService: MapService) {
  }

  saveHotel(hotel: Hotel): Observable<Hotel> {
    return this.crud.post<Hotel>('/rest/hotels', hotel);
  }

  getHotels(): Observable<Hotel[]> {
    return this.crud.get<Hotel[]>('/rest/hotels');
  }

  getHotelsWithCoordinates(): Observable<HotelWithCoordinate[]> {
    return this.getHotels()
      .map((hotels: Hotel[]) => Observable.from(hotels)
        .map(hotel => this.getCoordinate(hotel))
        .concatAll()
        .toArray())
      .concatAll();
  }

  getCoordinate(hotel: Hotel): Observable<HotelWithCoordinate> {
    return this.mapService.getCoordinate(hotel)
      .map(coordinate => new HotelWithCoordinate(hotel, coordinate));
  }

  getHotel(id: number): Observable < Hotel > {
    return this.crud.get<Hotel>('/rest/hotels/' + id);
  }

  deleteHotel(id: number): Observable < Response > {
    return this.crud.doDelete('/rest/hotels/' + id);
  }
}
