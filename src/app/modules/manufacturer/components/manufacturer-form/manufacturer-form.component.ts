import { Component, OnInit } from '@angular/core'
import { ManufacturerService } from '../../services/manufacturer.service'
import { IManufacturer } from '../../types/manufacturer.interface'
import { JsonPipe, Location } from '@angular/common'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatOption, MatSelect } from '@angular/material/select'
import { CountryService } from '../../../country/services/country.service'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { Router } from '@angular/router'

@Component({
  selector: 'app-manufacturer-form',
  standalone: true,
  imports: [
    JsonPipe,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    StopPropagationDirective,
    FormsModule,
  ],
  templateUrl: './manufacturer-form.component.html',
  styleUrl: './manufacturer-form.component.scss',
})
export class ManufacturerFormComponent implements OnInit {

  countryForm!: FormGroup

  constructor(
    public readonly manufacturerService: ManufacturerService,
    public readonly countryService: CountryService,
    private readonly router: Router,
    private readonly _location: Location,
  ) {
    this.countryForm = new FormGroup({
      code: new FormControl('',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      title: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.countryService.getAllCountries()
  }

  onSubmit() {
    if (this.countryForm.valid) {
      const manufacturer: IManufacturer = {
        code: Number(this.countryForm.controls['code'].value),
        title: this.countryForm.controls['title'].value,
        countryId: Number(this.countryForm.controls['countryId'].value),
      }
      this.manufacturerService.createManufacturer(manufacturer)
      this.router.navigate(['manufacturer']).then()
    }
  }

  back() {
    this._location.back()
  }
}
