const faker = require('faker')
const _ = require('lodash');
const forEach = require('async-foreach').forEach;
let gladiatorCount = 3;

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
    _.random(80, 100),
    parseFloat(_.random(2, 5, true).toFixed(1)),
    parseFloat(_.random(1, 5, true).toFixed(3)),
    faker.name.findName()
  )
  gladiators.push(newGladiator)
}
forEach(gladiators, (item, INDEX, gladiators) => {
  let g1 = gladiators[INDEX]
  let timer = setInterval(hitByG1, (5 - g1.Speed + 1) * 1000)
  function hitByG1() {

    if (gladiatorCount === 1) {
      console.log(gladiators[0].Name + ' wins')
      process.exit()
    }

    if (g1.Health > 0) {
      let tempArray = gladiators.filter((x, index) => index !== INDEX)
      let randomIndex = _.random(0, gladiatorCount - 2)
      console.log(tempArray)
      g2 = tempArray[randomIndex]
      const g2InitalSpeed = g2.Speed
      const g2InitalHealth = g2.Health
      console.log(`[${g1.Name} x ${g1.Health}] hits
       [${g2.Name} x ${g2.Health}] with power ${g1.Power} `)
      g2.Health = Math.round((g2.Health - g1.Power) * 100) / 100
      g2.Speed = Math.round(g2InitalSpeed * (g2.Health / g2InitalHealth))
      if (g2.Health >= 15 && g2.Health <= 30) g2.Speed *= 3
      if (g2.Health <= 0) {
        console.log(g2.Name + ' is dying')
        if (_.random(0, 1)) {
          console.log('Caesar showed :+1:  to ' + g2.Name)
          g2.Health += 50
          console.log('Health added to ' + g2.Name)
        } else {
          console.log('Caesar showed :-1:  to ' + g2.Name)
          console.log(g2.Name + ' is dead')
          gladiators.splice(gladiators.indexOf(g2), 1)
          gladiatorCount--
        }
      }
    } else {
      clearInterval(timer)
    }
  }
})