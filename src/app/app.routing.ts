import { Routes, RouterModule } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
    {path: '', component: EmployeeAddComponent},
    {path: 'listEmployee', component: EmployeeListComponent},
    {path: 'editEmployee', component: EmployeeEditComponent}
];

export const appRoutingModule = RouterModule.forRoot(routes);
