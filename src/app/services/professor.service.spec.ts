import { TestBed, inject } from '@angular/core/testing';
import { ProfessorService } from './professor.service';

describe('Service: Professor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessorService]
    });
  });

  it('should ...', inject([ProfessorService], (service: ProfessorService) => {
    expect(service).toBeTruthy();
  }));
});
