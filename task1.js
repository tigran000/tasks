const faker = require('faker');

class Person {
  constructor(name, age) {
    this.age = age
    this.name = name
    setInterval(() => this.age++, 1000)
  }
}

const checkAge = People => {
  setInterval(() => console.log(People.filter(Person => Person.age <= 40))
    , 1000)
}

const addPerson = People => {
  setInterval(cb, 2000)

  function cb() {
    const newPerson = new Person(faker.name.findName(),
      Math.floor((Math.random() * 50) + 1))
    People.push(newPerson)
  }
}

const Armen = new Person('Armen', 15)
const Ann = new Person('Ann', 0)
const Areg = new Person('Areg', 5)
const Arsen = new Person('Arsen', 12)
const People = []
People.push(Armen, Ann, Areg, Arsen)
checkAge(People)
addPerson(People)