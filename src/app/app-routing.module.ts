import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './component/brand/brand.component';
import { ProductComponent } from './component/product/product.component';


const routes: Routes = [
 // { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'product', component: ProductComponent },
  { path: 'brand', component: BrandComponent },
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  { path: '**', redirectTo: 'brand', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
