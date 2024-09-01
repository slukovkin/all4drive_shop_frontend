import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ISetting } from '../types/setting.interface'
import { Constants } from '../../../shared/constants/constants'
import { tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SettingService {

  setting?: ISetting

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  create(setting: ISetting) {
    this.http.post<ISetting>(Constants.BASE_URL + Constants.METHODS.CREATE_SETTING, setting)
      .pipe(
        tap((setting) => this.setting = setting),
      )
      .subscribe()
  }

  getAllSettings() {
    this.http.get<ISetting[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_SETTINGS)
      .pipe(
        tap((setting) => this.setting = setting[0]),
      ).subscribe()
  }

  getSettingById(id: number) {
    this.http.get<ISetting>(Constants.BASE_URL + Constants.METHODS.GET_SETTING_BY_ID + id)
      .subscribe()
  }

  updateSettingByID(setting: ISetting) {
    this.http.patch<ISetting>(Constants.BASE_URL + Constants.METHODS.UPDATE_SETTING_BY_ID + setting.id, setting)
      .pipe(
        tap((setting) => this.setting = setting),
      )
      .subscribe()
  }

  deleteSettingById(id: number) {
    this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_SETTING_BY_ID + id)
      .subscribe()
  }
}
