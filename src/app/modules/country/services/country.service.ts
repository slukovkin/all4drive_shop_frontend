import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { ICountry } from '../types/country.interface'
import { catchError, tap } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  countries: ICountry[] = []

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService,
  ) {
  }

  createCountry(country: ICountry) {
    return this.http.post(Constants.BASE_URL + Constants.METHODS.CREATE_COUNTRY, country)
      .pipe(
        tap(() => this.getAllCountries()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Country saved successfully')
      })
  }

  getAllCountries() {
    return this.http.get<ICountry[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_COUNTRIES)
      .subscribe((countries) => this.countries = countries)
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
