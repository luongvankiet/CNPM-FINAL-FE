import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BodyComponent } from './components/body/body.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { AdminPostsComponent } from './components/admin/admin-posts/admin-posts.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { DataTablesModule } from 'angular-datatables';
import 'datatables.net';
import 'datatables.net-bs4';
import { ModalModule } from 'ngx-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { BodySidebarComponent } from './components/body/body-sidebar/body-sidebar.component';
import { BodyHeaderComponent } from './components/body/body-header/body-header.component';
import { BodyContentComponent } from './components/body/body-content/body-content.component';
import { BodyPostDetailComponent } from './components/body/body-post-detail/body-post-detail.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BodyCreatePostComponent } from './components/body/body-create-post/body-create-post.component';
import { BodyContactComponent } from './components/body/body-contact/body-contact.component';
import { BodyProfileDetailComponent } from './components/body/body-profile-detail/body-profile-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    BodyComponent,
    PageNotFoundComponent,
    RegisterComponent,
    AdminComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    LoadingPageComponent,
    AdminPostsComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminCategoriesComponent,
    AdminProductsComponent,
    BodySidebarComponent,
    BodyHeaderComponent,
    BodyContentComponent,
    BodyPostDetailComponent,
    BodyCreatePostComponent,
    BodyContactComponent,
    BodyProfileDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SnotifyModule,
    DataTablesModule,
    ModalModule.forRoot(),
    CKEditorModule,
    CarouselModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
