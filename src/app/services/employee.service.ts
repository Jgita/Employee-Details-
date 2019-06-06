import { Subject } from 'rxjs';
import { Employee } from '../models/app.employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

    employeeData: Subject<any> = new Subject<Employee>();
    baseUrl = 'http://dummy.restapiexample.com/api/v1';
    constructor(private http: HttpClient) {
    }
    addEmployee(employee) {
        return this.http.post(this.baseUrl + '/create', employee);
    }
    getAll() {
        return this.http.get(this.baseUrl + '/employees');
    }
    deleteEmployee(empID: string) {
        return this.http.delete(this.baseUrl + '/delete/' + empID);
    }
    updateEmployee(employee, empID) {
        const employeeData = {
            age: employee.employee_age,
            name: employee.employee_name,
            salary: employee.employee_salary
        };
        return this.http.put(this.baseUrl + '/update/' + empID, employeeData);
    }
    getEmpById(employee_id: string) {
        return this.http.get(this.baseUrl + '/employee/' + employee_id);
    }
}


