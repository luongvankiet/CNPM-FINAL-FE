import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { BodyComponent } from './components/body/body.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardService } from './services/auth/auth-guard/auth-guard.service';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminPostsComponent } from './components/admin/admin-posts/admin-posts.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { BodyContentComponent } from './components/body/body-content/body-content.component';
import { BodyPostDetailComponent } from './components/body/body-post-detail/body-post-detail.component';
import { BodyCreatePostComponent } from './components/body/body-create-post/body-create-post.component';
import { BodyContactComponent } from './components/body/body-contact/body-contact.component';
import { BodyProfileDetailComponent } from './components/body/body-profile-detail/body-profile-detail.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '', component: BodyComponent,
        children: [
          { path: '', component: BodyContentComponent },
          { path: 'posts/create', component: BodyCreatePostComponent },
          { path: 'posts/:post_slug', component: BodyPostDetailComponent },
          { path: 'categories/:category_slug', component: BodyContentComponent },
          { path: 'contact', component: BodyContactComponent },
          { path: 'profile', component: BodyProfileDetailComponent },
          { path: 'profile/:id', component: BodyProfileDetailComponent },
        ]
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuardService],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: AdminDashboardComponent },
          { path: 'posts', component: AdminPostsComponent },
          { path: 'users', component: AdminUsersComponent },
          { path: 'users/:user_id', component: AdminPostsComponent },
          { path: 'categories', component: AdminCategoriesComponent },
          { path: 'categories/:slug', component: AdminPostsComponent },
          { path: 'products', component: AdminProductsComponent },
        ]
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
