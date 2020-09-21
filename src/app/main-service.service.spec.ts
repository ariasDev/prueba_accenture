import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import { MainServiceService } from './main-service.service';

interface Post{
  identification: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
}

describe('MainServiceService', () => {
  let service: MainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MainServiceService]
    });
    service = TestBed.inject(MainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('la peticion get puede devolver un objeto', () => {
    service.getAllClients().subscribe(response => {
      expect(response).toBe('object')
    })
  });

  it('la peticion post puede devolver un objeto', ()=> {
    const customerData = {
      "birthdate":"01-01-1992",
      "firstname":"juan",
      "lastname":"magan",
      "identification":"1001618038"
      }
    service.registerNewCustomer(customerData).subscribe(response => {
      expect(response).toBe('object')
    })
  })


});
