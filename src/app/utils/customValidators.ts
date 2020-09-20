import { AbstractControl } from '@angular/forms'
import * as moment from 'moment'

export function ageValidator(limit: number) {
    return (control: AbstractControl) => {
        const age = moment(control.value)
        const difference = age.diff(moment(), 'years') 
        return difference > limit ? null : {"isMinor": true}
    }
}