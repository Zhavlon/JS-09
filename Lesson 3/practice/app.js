class Person{
	constructor(name, age, isMarried) {
		this.name = name
		this.age = age
		this.isMarried = isMarried
	}
}

const person1 = new Person('John', 25, true)
const person2 = new Person('Alex', 80, true)
const person3 = new Person('George', 25, false)

console.log(person1)
console.log(person2)
console.log(person3)