import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BookTourComponent } from './book-tour/book-tour.component';
import { StateComponent } from './state/state.component';
import { TourDetailsComponent } from './tour-details/tour-details.component';
import { LoginComponent } from './login/login.component';
import { IndianToursComponent } from './indian-tours/indian-tours.component';
import { InternationalToursComponent } from './international-tours/international-tours.component';
import { SignupComponent } from './signup/signup.component';
import { ApiService } from './api.service'
import { from } from 'rxjs';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import { FaqComponent } from './faq/faq.component';
import { TcComponent } from './tc/tc.component';
import { AmericaComponent } from './america/america.component';
import { AustraliaComponent } from './australia/australia.component';
import { GujaratComponent } from './gujarat/gujarat.component';
import { HimachalComponent } from './himachal/himachal.component';
import { KeralaComponent } from './kerala/kerala.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'myaccount', component: AccountComponent },
  { path: 'state', component: StateComponent },
  { path: 'america', component: AmericaComponent },
  { path: 'australia', component: AustraliaComponent },
  { path: 'kerala', component: KeralaComponent },
  { path: 'gujarat', component: GujaratComponent },
  { path: 'himachal', component: HimachalComponent },
  { path: 'tour-details', component: TourDetailsComponent },
  // { path: 'book-tour', component: BookTourComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'indian-tours', component: IndianToursComponent },
  { path: 'international-tours', component: InternationalToursComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'tc', component: TcComponent },
  { path: '', component: HomeComponent },
  //{ path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ContactUsComponent,
    BookTourComponent,
    StateComponent,
    TourDetailsComponent,
    LoginComponent,
    IndianToursComponent,
    InternationalToursComponent,
    SignupComponent,
    AdminComponent,
    AccountComponent,
    FaqComponent,
    TcComponent,
    AmericaComponent,
    AustraliaComponent,
    GujaratComponent,
    HimachalComponent,
    KeralaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule
  ],
  providers: [ApiService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
