import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Professor } from 'src/app/models/Professor';

@Component({
  selector: 'app-professores-alunos',
  templateUrl: './professores-alunos.component.html',
  styleUrls: ['./professores-alunos.component.css']
})
export class ProfessoresAlunosComponent implements OnInit {

  @Input() public professores: Professor[];
  @Output() closeModal = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  professorSelect(prof: Professor): void {
    this.closeModal.emit(null);
    this.router.navigate(['/professor', prof.id]);
  }

}
