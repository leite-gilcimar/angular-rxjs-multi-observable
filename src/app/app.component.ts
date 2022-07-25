import { Component, OnInit, VERSION } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  user: any;
  information: any;
  name = 'Angular ' + VERSION.major;
  request1: Observable<any> = of({ name: 'José', lastName: 'da Silva'});
  request2: Observable<any> = of({ country: 'Brazil', city: 'Taguatinga'});
  
  multipleRequest = merge(
    this.request1.pipe(map(resp => { return { type : 'profile', resp}})),
    this.request2.pipe(map(resp => { return { type : 'zip', resp}}))
  );
  
  constructor(){
    this.multipleRequest.subscribe( (response: any) => {
      if(response.type === 'profile'){
        this.user = response.resp;
      }else{
        this.information = response.resp;
      }
      if(this.user !== undefined && this.information !== undefined){
        console.log(this.user);
        console.log(this.information);
      }
    });

  }

}
