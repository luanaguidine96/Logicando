import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginCrianca } from './login-crianca';

describe('LoginCrianca', () => {
  let component: LoginCrianca;
  let fixture: ComponentFixture<LoginCrianca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCrianca],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCrianca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
