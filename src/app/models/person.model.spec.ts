import { Person } from './person.model';

describe('Test for Person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Jesus', 'Mejia', 22, 40, 1.65);
  });

  it('attrs', () => {
    expect(person.name).toEqual('Jesus');
    expect(person.lastName).toEqual('Mejia');
    expect(person.age).toEqual(22);
  });

  describe('tests for calcIMC', () => {
    it('should return a string: down', () => {
      //Arrange
      person.weight = 40;
      person.height = 1.65;

      //Act
      const rta = person.calcIMC();

      //Assert
      expect(rta).toEqual('down');
    });
  });

  describe('tests for calcIMC', () => {
    it('should return a string: normal', () => {
      //Arrange
      person.weight = 58;
      person.height = 1.65;

      //Act
      const rta = person.calcIMC();

      //Assert
      expect(rta).toEqual('normal');
    });
  });
});
