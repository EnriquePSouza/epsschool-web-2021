import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aluno } from 'src/app/models/Aluno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos-professores',
  templateUrl: './alunos-professores.component.html',
  styleUrls: ['./alunos-professores.component.css']
})
export class AlunosProfessoresComponent implements OnInit {

  @Input() public alunos: Aluno[];
  @Output() closeModal = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  alunoSelect(id: number): void {
    this.closeModal.emit(null);
    this.router.navigate(['/alunos', id]);
  }

}
