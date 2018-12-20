const faker = require('faker')
const shuffle = require('shuffle-array') //using the Fisher-Yates algorithm.
const _ = require('lodash');
const gladiatorCount = 30; // choose even number gladiator

class Gladiator {
  constructor(Health, Power, Speed, Name) {
    this.Health = Health
    this.Power = Power
    this.Speed = Speed
    this.Name = Name
  }
}

let gladiators = []

for (let i = 0; i < gladiatorCount; i++) {
  const newGladiator = new Gladiator(
    Math.floor(Math.random() * 21) + 80,
    Math.floor(Math.random() * 4) + 2,
    Math.floor(Math.random() * 5) + 1,
    faker.name.findName()
  )
  gladiators.push(newGladiator)
}

let gladiatorPairs = []

for (let i = 0; i < gladiatorCount / 2; i++) {
  gladiatorPairs[i] = shuffle.pick(gladiators, { 'picks': 2 })
  gladiators = _.differenceBy(gladiators, gladiatorPairs[i], 'Name')
}

gladiatorPairs.forEach(pair => )