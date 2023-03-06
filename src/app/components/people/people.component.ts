import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  people: Person[] = [
    new Person('Jesus', 'Mejia', 22, 75, 1.69),
    new Person('David', 'Vergara', 22, 75, 1.69),
  ];

  selectedPerson: Person | null = null;

  constructor() {}

  ngOnInit(): void {}

  choose(person: Person) {
    this.selectedPerson = person;
  }
}
