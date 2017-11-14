import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration } from 'models';
import { NgForm } from '@angular/forms';

/**
 * Registration for new user
 */
@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm)
    ngForm: NgForm;

    model = new UserRegistration();
    userExists : boolean;
    badAvatar : boolean;
    badPass : boolean;

    constructor(
        private registrationService: RegistrationService,
        private router: Router
    ) { }

    register() {
        this.userExists = false; 
        this.badPass = false; 
        this.badAvatar = false;
        var badUser = false;
        if (this.ngForm.form.invalid) {
            return;
        }
        
        this.registrationService.usernameExists(this.model.username) 
        .then( (result) => {
            badUser = result;
            if(this.model.password == null || this.model.password.length > 5)          
                this.badPass = true;
    
            if(this.model.pictureUrl == null ){
                this.badAvatar = true;
            }
            
            if(badUser)
                this.userExists = true;
                
            if(this.badPass || this.badAvatar || this.userExists){
                return;
            } 
            else 
            {   
                this.registrationService.register(this.model)
                    .then(
                    
                        ()=>{console.log("ok"); this.router.navigateByUrl("/login");},
                        
                        e =>{
                        this.userExists = true;
                    });
            }
        });
    }
}
