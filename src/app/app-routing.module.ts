import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CustomerComponent } from './customer/customer.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
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
  { path: 'userdetail',
   component: UserDetailComponent,
   pathMatch : "full"
  },
  { path: 'vendordetail',
   component: VendorDetailComponent,
   pathMatch : "full"
  },
  { path: 'country',
   component: CountryComponent,
   pathMatch : "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
