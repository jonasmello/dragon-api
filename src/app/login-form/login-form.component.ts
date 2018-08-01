import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { UserService} from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  rForm: FormGroup;
  password: string = '';
  login: string = '';
  titleAlert: string = 'This field is required';

  constructor(private fb: FormBuilder, private router: Router, private user: UserService) {
    
    this.rForm = fb.group({
      login: [
        null, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      ],
      password: [
        null, Validators.compose([
          Validators.required
        ])
      ]
    });

  }

  loginUser(post) {
    this.login = post.login;
    this.password = post.password;
    if (this.login == 'admin' && this.password == 'admin') {
      this.user.setUserLoggedIn();
      this.router.navigate(['/dragons']);
    }
  }

  ngOnInit() {
  }

}
