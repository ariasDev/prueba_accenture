import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MainServiceService} from '../../main-service.service'
import { Subscription} from 'rxjs';
import { ageValidator } from '../../utils/customValidators'

@Component({
  selector: 'app-registry-component',
  templateUrl: './registry-component.component.html',
  styleUrls: ['./registry-component.component.css']
})
export class RegistryComponentComponent implements OnInit, OnDestroy {

  checkoutForm: FormGroup;
  suscribeGet: Subscription;
  suscribePost: Subscription;

  constructor(private formBuilder: FormBuilder, private mainService:MainServiceService) {
    this.checkoutForm = this.formBuilder.group({
      birthdate: new FormControl('', [Validators.required, ageValidator(18)]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      identification: new FormControl('', [Validators.required, Validators.minLength(10),])
    });

  }

    onSubmit(userData) {
      if(userData.birthdate && userData.firstname && userData.lastname && userData.identification){
        if(this.checkoutForm.valid){
          this.suscribeGet = this.mainService.getAllClients().subscribe(response=>{
              let responseString = JSON.stringify(response)
              if(responseString.indexOf(`identification":"${userData.identification}`) === -1){
                let yearBirthdateUser = userData.birthdate.split('-')[0]
                let currentYear = new Date().getFullYear()
                if(currentYear - yearBirthdateUser > 18){
                  this.suscribePost = this.mainService.registerNewCustomer(userData).subscribe(response => {
                    alert('Usurio Registrado con exito')
                  })
                }
                else{
                  alert('Para registrarte debes tener minimo 18 años')
                }
              } else {
                alert('Este usuario ya se encuentra registrado')
              }
              
          })
            this.checkoutForm.reset();
        } else {
          alert('Algunos Datos que diligenciaste no son validos')
        }

      } else {
        alert('Todos los campos deben estar Diligenciados')
      }
    }

  ngOnInit(): void {
  }

  get identification() {return this.checkoutForm.get('identification')}
  get firstname() {return this.checkoutForm.get('firstname')}
  get lastname() {return this.checkoutForm.get('lastname')}
  get birthdate() {return this.checkoutForm.get('birthdate')}

  ngOnDestroy(){
    this.suscribeGet.unsubscribe()
    this.suscribePost.unsubscribe()
  }

}
