import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroResponsavel } from './inicio-responsavel';

describe('CadastroResponsavel', () => {
  let component: CadastroResponsavel;
  let fixture: ComponentFixture<CadastroResponsavel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroResponsavel],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroResponsavel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
