import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {Actions, Effect} from '@ngrx/effects';
import {CampService} from "../shared/camp.service";
import {CampActions} from "../actions/camp.actions";
import { go } from '@ngrx/router-store';

@Injectable()
export class CampEffects {
  constructor(private actions$: Actions,
              private campService:CampService,
              private campActions:CampActions) {
  }

  @Effect()
  loadCampsOnInit = Observable.of(this.campActions.loadCamps());

  @Effect()
  loadCamps = this.actions$
    .ofType(CampActions.LOAD_CAMPS)
    .switchMapTo(this.campService.getCamps())
    .map(camps => this.campActions.loadCampsSuccess(camps));

  @Effect()
  saveCamp = this.actions$
    .ofType(CampActions.SAVE_CAMP)
    .map(action => action.payload)
    .flatMap(camp => this.campService.saveCamp(camp)
      .map(savedCamp => this.campActions.saveCampSuccess(savedCamp))
      .catch(() => Observable.of(
        this.campActions.saveCampFail(camp)
      ))
    );

  @Effect()
  saveCampSuccess = this.actions$
    .ofType(CampActions.SAVE_CAMP_SUCCESS)
    .map(action => action.payload)
    .do(camp => {
      go(['/camps/', {routeParam: camp.id}])
    }).filter(() => false);

  @Effect()
  deleteCamp = this.actions$
    .ofType(CampActions.DELETE_CAMP)
    .map(action => action.payload)
    .flatMap(camp => this.campService.deleteCamp(camp.id)
      .mapTo(this.campActions.deleteCampSuccess(camp))
      .catch(() => Observable.of(
        this.campActions.deleteCampFail(camp)
      ))
    );

}
