import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/index';

/**
 * Logout a user
 */
@Component({
    selector: 'logout',
    templateUrl: 'logout.html'
})
export class LogoutComponent {

    constructor( private authService: AuthenticationService) {}

    Disconnect(){
        this.authService.logout();
    }
}