import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  /**
   * used to store response of get employee details
   */
  EmployeeDetails;
  /**
   * used to define currentPage of pagination
   */
  p = 1;
  /**
   * used to store search textbox value
   */
  public searchString: string;
  /**
   * used to store page loader value
   */
  public loading = false;

  constructor(private _EmployeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this._EmployeeService.getAll().subscribe( response => {
      this.loading = false;
      this.EmployeeDetails = response;
    },
    error => {
      this.loading = false;
      alert(error);
    });
  }

  deleteEmployee(empID) {
    this.loading = true;
      this._EmployeeService.deleteEmployee(empID).subscribe(response => {
        alert('successfully! deleted Records');
        this.loading = false;
        this._EmployeeService.getAll().subscribe( data => {
          this.EmployeeDetails = data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          alert(error);
        });
      },
    error => {
      this.loading = false;
      alert(error);
    });
  }

  editEmployee(emp) {
    this.loading = true;
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', emp.id.toString());
    this._EmployeeService.getEmpById(emp.id).subscribe(response => {
      if (response) {
        this.loading = false;
       this.router.navigateByUrl('editEmployee');
       this._EmployeeService.employeeData.next(response);
      }
    },
    error => {
      this.loading = false;
      alert(error);
    });
  }

  addEmployee() {
    this.router.navigateByUrl('/');
  }

}
