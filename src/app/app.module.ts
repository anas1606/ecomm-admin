import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { VendorComponent } from './vendor/vendor.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { CountryComponent } from './country/country.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StateComponent } from './state/state.component';
import { LoginComponent } from './login/login.component';
import { HobbyComponent } from './hobby/hobby.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    VendorComponent,
    UserDetailComponent,
    VendorDetailComponent,
    CountryComponent,
    HeaderComponent,
    FooterComponent,
    StateComponent,
    LoginComponent,
    HobbyComponent,
    CategoryComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
