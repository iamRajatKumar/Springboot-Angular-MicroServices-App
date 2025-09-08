import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './components/quiz/quiz-list/quiz-list.component';
import { QuestionFormComponent } from './components/question/question-form/question-form.component';
import { QuizDetailsComponent } from './components/quiz/quiz-details/quiz-details.component';
import { QuizFormComponent } from './components/quiz/quiz-form/quiz-form.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: "", component:QuizListComponent},
  {path: "quiz/add", component: QuizFormComponent},
  {path: "quiz/:id", component: QuizDetailsComponent},
  {path: "question", component: QuestionListComponent },
  {path: "question/add", component: QuestionFormComponent},
  {path: "about", component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
