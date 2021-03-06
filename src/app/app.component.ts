import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rms-webclient';
  loading: boolean;

  constructor(private userService: UserService) {
    // Subscribe to changes in the current user
    // Get the token from local storage
    let token = localStorage.getItem("user-token");
    if (token) {
      this.loading = true;  
      // Subscribe to the next change in the currentUser 
      // -- only the next change. Unsubscribe once a change occurs
      let subscription = this.userService.$currentUser.subscribe( (user) => {
        this.loading = false;
        subscription.unsubscribe();
      });

      // If there is a token, send a request to the server for the user's information.
      this.userService.checkSession(token);
    }

   }

}
