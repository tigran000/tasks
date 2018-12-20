//Note, for now only one pair fights, and Caesar part is not implemeted yet.

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
// Genrating gladiators
for (let i = 0; i < gladiatorCount; i++) {
  const newGladiator = new Gladiator(
    _.random(80, 100),
    parseFloat(_.random(2, 5, true).toFixed(1)),
    // we can also genrate  2000 to 5000, because later we must multiple by 1000
    parseFloat(_.random(1, 5, true).toFixed(3)),
    faker.name.findName()
  )
  gladiators.push(newGladiator)
}

let gladiatorPairs = []
// Pairing gladiators, there are many ways shown in the web,
// I come with my solution
// For now works without error, but may crash if faker gives 
// 2 gladiators with the same name
for (let i = 0; i < gladiatorCount / 2; i++) {
  gladiatorPairs[i] = shuffle.pick(gladiators, { 'picks': 2 })
  gladiators = _.differenceBy(gladiators, gladiatorPairs[i], 'Name')
}
// Formula for calculating powers / second ratio
//           5   - 1 
// if power  3.5 - x 
// x =  5 - 3.5 + 1

// Sample  of one pair
const g1 = gladiatorPairs[0][0]
const g2 = gladiatorPairs[0][1]


const g1InitalSpeed = g1.Speed
const g1InitalHealth = g1.Health
const g2InitalSpeed = g2.Speed
const g2InitalHealth = g2.Health

setInterval(hitByG1, (5 - g1.Speed + 1) * 1000)
setInterval(hitByG2, (5 - g2.Speed + 1) * 1000)

function hitByG1() {
  console.log(`[${g1.Name} x ${g1.Health}] hits  
    [${g2.Name} x ${g2.Health}] with power ${g1.Power} `)
  g2.Health = Math.round((g2.Health - g1.Power) * 100) / 100
  g2.Speed = g2InitalSpeed * (g2.Health / g2InitalHealth)
  if (g2.Health >= 15 && g2.Health <= 30) g2.Speed *= 3
  if (g2.Health <= 0) {
    console.log(`${g1.Name} Wins`)
    process.exit()
  }
}

function hitByG2() {
  console.log(`[${g2.Name} x ${g2.Health}] 
    hits [${g1.Name} x ${g1.Health}] with power ${g2.Power} `)
  g1.Health = Math.round((g1.Health - g2.Power) * 100) / 100
  g1.Speed = g1InitalSpeed * (g1.Health / g1InitalHealth)
  if (g1.Health >= 15 && g1.Health <= 30) g1.Speed *= 3
  if (g1.Health <= 0) {
    console.log(`${g2.Name} Wins`)
    process.exit()
  }
}



