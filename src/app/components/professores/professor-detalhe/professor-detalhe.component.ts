import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessorService } from 'src/app/services/professor.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Professor } from 'src/app/models/Professor';
import { AlunoService } from 'src/app/services/aluno.service';
import { Aluno } from 'src/app/models/Aluno';
import { Course } from 'src/app/models/Course';
import { Util } from 'src/app/util/util';
import { CoursesSubjects } from 'src/app/models/CoursesSubjects';

@Component({
  selector: 'app-professor-detalhe',
  templateUrl: './professor-detalhe.component.html',
  styleUrls: ['./professor-detalhe.component.css']
})
export class ProfessorDetalheComponent implements OnInit, OnDestroy {

  public modalRef: BsModalRef;
  public professorSelecionado: Professor;
  public courseSubjects: CoursesSubjects[];
  public titulo = '';
  public alunosProfs: Aluno[];
  private unsubscriber = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private professorService: ProfessorService,
    private alunoService: AlunoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  openModal(template: TemplateRef<any>, courseId: number): void {
    this.alunosProfessores(template, courseId);
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  alunosProfessores(template: TemplateRef<any>, id: number): void {
    this.spinner.show();
    this.alunoService.getByCourseId(id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((alunos: Aluno[]) => {
        this.alunosProfs = alunos;
        this.modalRef = this.modalService.show(template);
      }, (error: any) => {
        this.toastr.error(`erro: ${error}`);
        console.log(error);
      }, () => this.spinner.hide()
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.carregarProfessor();
  }

  coursesConcat(courses: Course[]): string {
    return Util.nomeConcat(Util.removeDuplicate(courses));
  }

  carregarProfessor(): void {
    const profId = +this.route.snapshot.paramMap.get('id');
    this.professorService.getById(profId)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((professor: Professor) => {
        this.professorSelecionado = professor;
        professor.subject.forEach(s => {
          this.professorSelecionado.profSubjectName = s.name;
          this.courseSubjects = s.coursesSubjects;
        });
        this.titulo = 'Professor: ' + this.professorSelecionado.id;
        this.toastr.success('Professor carregado com Sucesso!');
      }, (error: any) => {
        this.toastr.error('Professor n??o carregados!');
        console.log(error);
      }, () => this.spinner.hide()
    );
  }

  voltar(): void {
    this.router.navigate(['/professores']);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
