import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioCrianca } from './inicio-crianca';

describe('InicioCrianca', () => {
  let component: InicioCrianca;
  let fixture: ComponentFixture<InicioCrianca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioCrianca],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioCrianca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
