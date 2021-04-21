import { Component, OnInit, OnDestroy } from '@angular/core';
import { Professor } from '../../models/Professor';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from '../../services/professor.service';
import { takeUntil } from 'rxjs/operators';
import { Util } from '../../util/util';
import { Router } from '@angular/router';
import { CoursesSubjects } from 'src/app/models/CoursesSubjects';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit, OnDestroy {

  public titulo = 'Professores';
  public professorSelecionado: Professor;
  private unsubscriber = new Subject();
  public contains = '';

  public professores: Professor[];

  constructor(
    private router: Router,
    private professorService: ProfessorService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  carregarProfessores(): void {
    this.spinner.show();
    this.professorService.getAll()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((professores: Professor[]) => {
        professores.forEach(p => {
            p.subject.forEach(s => {
              p.profSubjectName = s.name;
              p.allProfCourses = this.coursesConcat(s.coursesSubjects);
            });
        });
        this.professores = professores;
        this.toastr.success('Professores foram carregado com Sucesso!');
      }, (error: any) => {
        this.toastr.error('Professores não carregados!');
        console.log(error);
      }, () => this.spinner.hide()
      );
  }

  ngOnInit(): void {
    this.carregarProfessores();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  coursesConcat(coursesSubjects: CoursesSubjects[]): string {
    return Util.nomeConcat(coursesSubjects);
  }
}
