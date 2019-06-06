import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
/**
 * Used to store Employee Information Form
 */
  EmployeeInfoForm: FormGroup;
/**
   * used to store page loader value
   */
  loading: boolean;

  constructor(private _EmployeeService: EmployeeService, private router: Router) {
    const numericNumberReg = '^[0-9]*$';
    const lettersReg = '^[a-zA-Z ]*$';
    const minAge = 18;
    const maxAge = 100;
    this.EmployeeInfoForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(lettersReg)]),
      salary: new FormControl(null, [Validators.required, Validators.pattern(numericNumberReg)]),
      age: new FormControl(null, [Validators.required, Validators.min(minAge), Validators.max(maxAge),
        Validators.pattern(numericNumberReg)])
    });
   }

  ngOnInit() {
  }

  addEmployee() {
    this.loading = true;
   if (this.EmployeeInfoForm.invalid) {
     return;
   }
   this._EmployeeService.addEmployee(this.EmployeeInfoForm.value).subscribe(
     response => {
     if (response) {
      this.loading = false;
       alert('Changes Saved Successfully');
       this.router.navigate(['listEmployee']);
     }
    },
     error => {
       this.loading = false;
       alert(error.error.text);
     }
   );
  }
}
