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
import { HttpClientModule } from '@angular/common/http';


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
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
