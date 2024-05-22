import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../helper/models/user';
import { UserService } from '../helper/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() userAdded = new EventEmitter<void>();

  users: User[] = [];

  isAddUserVisible = false;

  constructor(private userService: UserService, private message: NzMessageService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.message.success('Users loaded successfully');
      },
      error: () => {
        this.message.error('An error occurred');
      }
    });
  }

  toggleAddUser() {
    this.isAddUserVisible = !this.isAddUserVisible;
  }

  loadUsers() {
    console.log('load users');
    this.getUsers();
  }

  editUser(user: User) {

  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== user.id);
        this.message.success('User deleted successfully');
      },
      error: () => {
        this.message.error('An error occurred');
      }
    });

  }
}
