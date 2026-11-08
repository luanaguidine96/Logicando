import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Duvidas } from './duvidas';

describe('Duvidas', () => {
  let component: Duvidas;
  let fixture: ComponentFixture<Duvidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Duvidas],
    }).compileComponents();

    fixture = TestBed.createComponent(Duvidas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
