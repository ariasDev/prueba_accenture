import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registry-component',
  templateUrl: './registry-component.component.html',
  styleUrls: ['./registry-component.component.css']
})
export class RegistryComponentComponent implements OnInit {

  checkoutForm;
  URL_BASE;

  constructor(private formBuilder: FormBuilder) {
    this.URL_BASE='https://testbankapi.firebaseio.com/clients.json'
    this.checkoutForm = this.formBuilder.group({
      birthdate: '',
      firstname: '',
      lastname: '',
      identification: ''
    });

  }

  onSubmit(userData) {
    if(userData.birthdate && userData.firstname &&userData.lastname &&userData.identification){

    } else {
      alert('Todos los campos deben estar Diligenciados')
    }

    this.checkoutForm.reset();
    console.warn('user registered: ', userData);
  }

  ngOnInit(): void {
  }

}
