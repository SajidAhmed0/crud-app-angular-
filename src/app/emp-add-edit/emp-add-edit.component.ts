import { Component, Inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
  providers: [EmployeeService]
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];

  constructor(
      private _fb: FormBuilder, 
      private _empService: EmployeeService, 
      private _dialogRef: MatDialogRef<EmpAddEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee updated successfully");
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee added successfully");
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }
}
