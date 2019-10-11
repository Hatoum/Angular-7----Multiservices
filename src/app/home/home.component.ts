import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { OuvrierService, Ouvrier } from './ouvrier.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  submitted = false;
  success = false;
  ouvrier: any;
  ouvriers: Ouvrier[];
  messageForm = new FormGroup({
  username: new FormControl('', [Validators.required]),
  Adresse: new FormControl('', [Validators.required]),
  tel: new FormControl('', [Validators.required]),
  Typedouvrier: new FormControl('', [Validators.required]),
  Service: new FormControl('', [Validators.required]),

  })
 
  constructor(private service: OuvrierService,) { }

  ngOnInit() {
  

      this.service.getOuvrier().subscribe(data => {
        this.ouvriers = data
      })
  
    }
    onSubmit() {
      
      this.submitted = true;
  
      if (this.messageForm.invalid) {
        return;
      }
  
      this.success = true;
      this.service. addOuvrier(this.messageForm.value).subscribe(
        data => {
          if (data) {
  
          }
  
  
        },
        err => {
          console.log("error sending data")
        },
        () => {
          alert("Confirmez?")
          console.log("data sent")
        }
  
  
  
      )
     
    }
  
    Delete(ouvrierr) {
      this.service.deleteOuvrier(ouvrierr)
        .subscribe(data => {
          this.ouvriers = this.ouvriers.filter(p => p !== ouvrierr);
          alert(" voulez vous supprimer ?");
        })
     
    }
}