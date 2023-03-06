import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;

    /**
     * En este punto el input de person es global para todas las pruebas
     */
    // component.person = new Person('Jesus', 'Mejia', 22, 70, 1.4);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Jesus"', () => {
    /**
     * en esta parte estamos enviando informacion expecifica al input
     * solo en esta prueba
     */
    component.person = new Person('Jesus', 'Mejia', 22, 70, 1.4);
    expect(component.person.name).toEqual('Jesus');
  });

  it('should have <h3> with "Hola, {person.name}"', () => {
    //Arrange
    component.person = new Person('David', 'Mejia', 22, 70, 1.4);
    const expectMsg = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;

    //Act
    fixture.detectChanges();

    //Assert
    expect(h3Element?.textContent).toEqual(expectMsg);
  });

  it('should have <p> with "Mi altura es {person.height}"', () => {
    //Arrange
    component.person = new Person('David', 'Mejia', 22, 70, 1.4);
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;

    //Act
    fixture.detectChanges();

    //Assert
    expect(pElement?.textContent).toContain(component.person.height);
  });

  it('should display a text with IMC when call calcIMC', () => {
    //Arrange
    const expectMsg = 'overweight level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.25);
    const button = fixture.debugElement.query(
      By.css('button.btn-imc')
    ).nativeElement;

    //Act
    component.calcIMC();
    fixture.detectChanges();

    //Assert
    expect(button.textContent).toContain(expectMsg);
  });

  it('should display a text with IMC when do click', () => {
    //Arrange
    const expectMsg = 'overweight level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.25);
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = buttonDebug.nativeElement;

    //Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    //Assert
    expect(buttonElement.textContent).toContain(expectMsg);
  });

  it('should raise selected event when do click', () => {
    //Arrange
    const expectPerson = new Person('Juan', 'Perez', 30, 120, 1.25);
    component.person = expectPerson;
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => {
      selectedPerson = person;
    });
    //Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    //Assert
    expect(selectedPerson).toEqual(expectPerson);
  });
});

@Component({
  template: `<app-person
    [person]="person"
    (onSelected)="onSelected($event)"
  ></app-person>`,
})
class HostComponent {
  person = new Person('Santi', 'Molina', 12, 40, 1.5);
  selectedPerson: Person | undefined;
  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponente from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    //Arrange
    const expectName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;

    //Act
    fixture.detectChanges();

    //Assert
    expect(h3Element.textContent).toContain(expectName);
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
    expect(component.selectedPerson).toEqual(component.person);
  });
});
