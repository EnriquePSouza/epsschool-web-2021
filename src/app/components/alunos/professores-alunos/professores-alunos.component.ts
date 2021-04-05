import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Professor } from 'src/app/models/Professor';
import { Disciplina } from 'src/app/models/Disciplina';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-professores-alunos',
  templateUrl: './professores-alunos.component.html',
  styleUrls: ['./professores-alunos.component.css']
})
export class ProfessoresAlunosComponent implements OnInit {

  @Input() public professores: Professor[];
  @Output() closeModal = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  professorSelect(prof: Professor) {
    this.closeModal.emit(null);
    this.router.navigate(['/professor', prof.id]);
  }

}
