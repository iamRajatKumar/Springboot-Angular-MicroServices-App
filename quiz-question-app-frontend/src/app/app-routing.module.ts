import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Quiz components
import { QuizListComponent } from './components/quiz/quiz-list/quiz-list.component';
import { QuizFormComponent } from './components/quiz/quiz-form/quiz-form.component';
import { QuizDetailsComponent } from './components/quiz/quiz-details/quiz-details.component';

// Question components
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { QuestionFormComponent } from './components/question/question-form/question-form.component';

// Auth components
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

// Other
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  { path: '', redirectTo: 'quiz', pathMatch: 'full' }, //error in routing

  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Quiz routes (protected)
  { path: 'quiz', component: QuizListComponent, canActivate: [AuthGuard] },
  { path: 'quiz/add', component: QuizFormComponent, canActivate: [AuthGuard] },
  { path: 'quiz/:id', component: QuizDetailsComponent, canActivate: [AuthGuard] },

  // Question routes (protected)
  { path: 'question', component: QuestionListComponent, canActivate: [AuthGuard] },
  { path: 'question/add', component: QuestionFormComponent, canActivate: [AuthGuard] },

  // About page
  { path: 'about', component: AboutComponent },

  // Fallback route
  { path: '**', redirectTo: 'quiz' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}