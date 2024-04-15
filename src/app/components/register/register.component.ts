import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , ReactiveFormsModule} from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ){}

  ngOnInit(){
    this.handleFormGroup();
  }

  handleFormGroup() {
    this.registerForm = this.formBuilder.group({
      user: this.formBuilder.group({
        'username': new FormControl(''),
        'email': new FormControl(''),
        'password': new FormControl(''),
        'firstName': new FormControl(''),
        'lastName': new FormControl(''),
      })
    });
  }

  onSubmit() {
    let user: User = this.registerForm.controls['user'].value;
    this.authService.registerUser(user).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }




}
