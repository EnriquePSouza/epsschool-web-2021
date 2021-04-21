// Import from angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import configs.
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import components.
import { AlunosComponent } from './components/alunos/alunos.component';
import { AlunosProfessoresComponent } from './components/professores/alunos-professores/alunos-professores.component';
import { ProfessoresAlunosComponent } from './components/alunos/professores-alunos/professores-alunos.component';
import { ProfessoresComponent } from './components/professores/professores.component';
import { ProfessorDetalheComponent } from './components/professores/professor-detalhe/professor-detalhe.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { TituloComponent } from './components/shared/titulo/titulo.component';

// imports of modules that are not from angular.
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    AlunosProfessoresComponent,
    ProfessoresAlunosComponent,
    ProfessoresComponent,
    ProfessorDetalheComponent,
    SobreComponent,
    DashboardComponent,
    NavComponent,
    TituloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxSpinnerModule,
    ToastrModule.forRoot({ // Default configs to always use with toastr.
      timeOut: 3500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
