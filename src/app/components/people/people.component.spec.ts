import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from 'src/app/models/person.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    //Arrange
    component.people = [
      new Person('Jesus', 'Mejia', 22, 75, 1.69),
      new Person('David', 'Vergara', 22, 75, 1.69),
      new Person('Santiago', 'Molina', 22, 75, 1.69),
    ];

    //Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    //Assert
    expect(debugElement.length).toEqual(3);
  });

  it('should raise selected event when clicked', () => {
    //Arrange
    const btnDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );

    //Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render the selectedPerson', () => {
    //Arrange
    const btnDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );

    //Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebug = fixture.debugElement.query(
      By.css('.selectedPerson ul > li')
    );

    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDebug.nativeElement.textContent).toContain(
      component.selectedPerson?.name
    );
  });
});
