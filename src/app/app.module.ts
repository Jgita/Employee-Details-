import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchByNamePipe  } from './filters/search-by-name.pipe';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularFontAwesomeModule } from 'angular-font-awesome';



@NgModule({
  // Used to Register component, directive, pipe
  declarations: [
    AppComponent,
    EmployeeHomeComponent,
    EmployeeAddComponent,
    EmployeeListComponent,
    SearchByNamePipe,
    EmployeeEditComponent
  ],
  // Used to Register Modules
  imports: [
    BrowserModule,
    FormsModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    AngularFontAwesomeModule
  ],
  // Used to register services
  providers: [EmployeeService],
  exports: [
    SearchByNamePipe
],
  // Used to chnage entry point of application
  bootstrap: [AppComponent]
})
export class AppModule { }
