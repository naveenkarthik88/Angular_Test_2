import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightDirective } from "./directive/highlight.directive";
import { DecoratorPipe } from "./pipes/decorator.pipe";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { DeleteServiceService } from "./service/delete-service.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { ReactiveLoginComponent } from "./components/reactive-login/reactive-login.component";
import { AuthGuard } from "./guards/auth.guard";
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';

export const appRoutes: Routes = [ 
  {
    path: "",
    loadChildren:
      "./modules/authentication/authentication.module#AuthenticationModule"
  }, 
  {
    path: "home",
    component: HomePageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "employeeList", component: EmployeeListComponent },
      {
        path: "employeeAdd",
        component: AddEmployeeComponent
      },
      {
        path: "employee/:key",
        component: EmployeeComponent
      }
    ]
  }
];

// const appRoutes: Routes = [
//   {
//     path: "home",
//     component: HomePageComponent,
//     children: [
//       { path: "employeeList", component: EmployeeListComponent },
//       { path: "employeeAdd", component: AddEmployeeComponent },
//       { path: "employee/:key", component: EmployeeComponent }
//     ]
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    DecoratorPipe,
    EmployeeListComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    HomePageComponent,
    ReactiveLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
