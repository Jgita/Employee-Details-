import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  /**
 * Used to store Employee Information Form
 */
EditEmployeeInfoForm: FormGroup;
/**
   * used to store page loader value
   */
public loading = false;

  constructor(private _EmployeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    const EmpId = localStorage.getItem('editUserId');
    if (!EmpId) {
      alert('Invalid action.');
      this.router.navigate(['listEmployee']);
    }
    const numericNumberReg = '^[0-9]*$';
    const lettersReg = '^[a-zA-Z ]*$';
    const minAge = 18;
    const maxAge = 100;
    this.EditEmployeeInfoForm = new FormGroup({
      employee_name: new FormControl(null, [Validators.required, Validators.pattern(lettersReg)]),
      employee_salary: new FormControl(null, [Validators.required, Validators.pattern(numericNumberReg)]),
      employee_age: new FormControl(null, [Validators.required, Validators.min(minAge), Validators.max(maxAge),
      Validators.pattern(numericNumberReg)])
    });
    this._EmployeeService.getEmpById(EmpId).subscribe(data => {
      this.loading = false;
      this.EditEmployeeInfoForm.patchValue(data);
    });
  }

  onSubmit() {
    this.loading = true;
    const Id = localStorage.getItem('editUserId');
    this._EmployeeService.updateEmployee(this.EditEmployeeInfoForm.value, Id).subscribe(response => {
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
