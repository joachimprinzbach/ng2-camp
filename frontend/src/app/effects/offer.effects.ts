import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {Actions, Effect} from '@ngrx/effects';
import {OfferService} from "../shared/offer.service";
import {OfferActions} from "../actions/offer.actions";
import {go} from "@ngrx/router-store";

@Injectable()
export class OfferEffects {
  constructor(private actions$:Actions,
              private offerService:OfferService,
              private offerActions:OfferActions) {
  }

  @Effect()
  loadOffersOnInit = Observable.of(this.offerActions.loadOffers());

  @Effect()
  loadOffers = this.actions$
    .ofType(OfferActions.LOAD_OFFERS)
    .switchMapTo(this.offerService.getOffers())
    .map(offers => this.offerActions.loadOffersSuccess(offers));

  /*@Effect()
  saveOffer = this.actions$
    .ofType(OfferActions.SAVE_OFFER)
    .flatMap(offer => this.offerService.saveOfferForHotelId(offer)
      .map(savedOffer => this.offerActions.saveOfferSuccess(savedOffer))
      .catch(() => Observable.of(
        this.offerActions.saveOfferFail(offer)
      ))
    );*/

  @Effect()
  saveOfferSuccess = this.actions$
    .ofType(OfferActions.SAVE_OFFER_SUCCESS)
    .map(action => action.payload)
    .do(offer => {
      go(['/offers/', {routeParam: offer.id}])
    }).filter(() => false);

  @Effect()
  deleteOffer = this.actions$
    .ofType(OfferActions.DELETE_OFFER)
    .map(action => action.payload)
    .flatMap(offer => this.offerService.deleteOffer(offer.id)
      .mapTo(this.offerActions.deleteOfferSuccess(offer))
      .catch(() => Observable.of(
        this.offerActions.deleteOfferFail(offer)
      ))
    );
}
