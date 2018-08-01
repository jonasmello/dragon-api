import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DragonsComponent } from './dragons/dragons.component';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { DragonComponent } from './dragon/dragon.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'dragons',
    canActivate: [AuthGuard],
    component: DragonsComponent
  },
  {
    path: 'dragon/',
    canActivate: [AuthGuard],
    component: DragonComponent
  },
  {
    path: 'dragon/:slug',
    canActivate: [AuthGuard],
    component: DragonComponent
  },
  {
    path: 'dragon/:slug/:action',
    canActivate: [AuthGuard],
    component: DragonComponent
  },
  {
    path: '**',
    component: LoginFormComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginFormComponent,
    DragonsComponent,
    DragonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
