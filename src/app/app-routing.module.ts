import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CountryComponent } from './country/country.component';
import { CustomerComponent } from './customer/customer.component';
import { HobbyComponent } from './hobby/hobby.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { StateComponent } from './state/state.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/customer',
    pathMatch : "full"
  },
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
  { path: 'state',
   component: StateComponent,
   pathMatch : "full"
  },
  { path: 'hobby',
   component: HobbyComponent,
   pathMatch : "full"
  },
  { path: 'category',
   component: CategoryComponent,
   pathMatch : "full"
  },
  { path: 'order',
   component: OrderComponent,
   pathMatch : "full"
  },
  { path: 'login',
   component: LoginComponent,
   pathMatch : "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
