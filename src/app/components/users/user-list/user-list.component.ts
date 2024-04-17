import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  public users: User[] = [];

  constructor(private userService: UserService){};

  ngOnInit(): void {
    this.getAllUsers();
    }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((response: User[]) => this.users = response);
  }

  updateUser(username: string, fields: any): void {
    
    this.userService.updateUserByFields(username, fields)
      .subscribe({
        next: (response: User) => console.log('User updated successfully:', response),
        error: (err) => console.log(err)
      })
  }
}
