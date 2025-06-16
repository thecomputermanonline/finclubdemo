import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PageComponent } from './page/page.component';


export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'page/:slug', component: PageComponent },
  { path: '', redirectTo: 'admin', pathMatch: 'full' }
 
];