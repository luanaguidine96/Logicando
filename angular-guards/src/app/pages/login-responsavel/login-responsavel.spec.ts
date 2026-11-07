import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginResponsavel } from './login-responsavel';

describe('LoginResponsavel', () => {
  let component: LoginResponsavel;
  let fixture: ComponentFixture<LoginResponsavel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginResponsavel],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginResponsavel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
