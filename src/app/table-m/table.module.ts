import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableRoutingModule } from './table-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { UserFormComponent } from './user-form/user-form.component';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [TableComponent, UserFormComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    NzTableModule,
    NzMessageModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,

    // *required for forms!
    ReactiveFormsModule
  ],
})
export class TableMModule { }
