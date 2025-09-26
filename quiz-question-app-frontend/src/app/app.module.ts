import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionFormComponent } from './components/question/question-form/question-form.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { QuizDetailsComponent } from './components/quiz/quiz-details/quiz-details.component';
import { QuizFormComponent } from './components/quiz/quiz-form/quiz-form.component';
import { QuizListComponent } from './components/quiz/quiz-list/quiz-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionFormComponent,
    QuestionListComponent,
    QuizDetailsComponent,
    QuizFormComponent,
    QuizListComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Register the interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
