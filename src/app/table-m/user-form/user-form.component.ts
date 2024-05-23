import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../helper/models/user';
import { UserService } from '../helper/user.service';
import { LetterValidator } from '../helper/form.helper';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: User = {} as User;
  @Input() isEdit = false;

  readonly nzModalData = inject(NZ_MODAL_DATA);

  userForm!: FormGroup<any>;

  constructor(private fb: FormBuilder, private userService: UserService, private message: NzMessageService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.isEdit = this.nzModalData.isEdit;
    this.user = this.nzModalData.user;
    this.createForm(this.user);
  }

  createForm(user?: User) {
    this.userForm = this.fb.group({
      firstName: [user?.firstName, [Validators.required, LetterValidator, Validators.maxLength(20), Validators.minLength(3)]],
      lastName: [user?.lastName, [Validators.required, LetterValidator, Validators.maxLength(20), Validators.minLength(3)]],
      email: [user?.email, [Validators.required, Validators.email]],
      age: [user?.age, [Validators.required, Validators.min(18), Validators.max(120)]],
      address: [user?.address, [Validators.required, Validators.maxLength(100)]]
    });
    console.log(this.isEdit);
  }

  addNewUser() {
    const user: User = {
      id: this.userService.users.length + 1,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      age: this.age.value,
      address: this.address.value
    }
    this.userService.addUser(user).subscribe({
      next: () => {
        this.message.success('User added successfully');
        console.log(this.userService.users);
      },
      error: () => {
        this.message.error('An error occurred');
      }
    });
    this.modalRef.close(true);
  }

  editUser() {
    const updatedUser: User = {
      id: this.user.id,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      age: this.age.value,
      address: this.address.value
    }
    this.userService.editUser(updatedUser).subscribe({
      next: () => {
        this.message.success('User updated successfully');
        console.log(this.userService.users);
      },
      error: () => {
        this.message.error('An error occurred');
      }
    });
    this.modalRef.close(true);
  }

  get firstName(): AbstractControl {
    return this.userForm.controls['firstName'];
  }

  get lastName(): AbstractControl {
    return this.userForm.controls['lastName'];
  }

  get email(): AbstractControl {
    return this.userForm.controls['email'];
  }

  get age(): AbstractControl {
    return this.userForm.controls['age'];
  }

  get address(): AbstractControl {
    return this.userForm.controls['address'];
  }

}
