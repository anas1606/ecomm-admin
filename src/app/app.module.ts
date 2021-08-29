import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { VendorComponent } from './vendor/vendor.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    VendorComponent,
    UserDetailComponent,
    VendorDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
