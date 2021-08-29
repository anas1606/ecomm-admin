import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  { path: 'customer',
   component: CustomerComponent,
   pathMatch : "full"
  },
  { path: 'vendor',
   component: VendorComponent,
   pathMatch : "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
