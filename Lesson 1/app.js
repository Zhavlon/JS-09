// Regular expression
// Primitive - number, string, boolean, null, undefined
// Obj - array, obj, function

// new RegExp(pattern, flag)
// /pattern/flag

// const string = `my name is H2M1`

// const reg = /\w\d\w\d/i

// \d - digits, \w - words, \s - spaces
// i, g, m
// console.log(string.match(reg))
// const password = prompt('enter your password')
// console.log(password.replace(/\\/g, '*'))
// const string = 'random'
// const reg = /\d/g
// console.log(reg.test(string))

// const phoneInput = document.querySelector('#phoneInput'),
// 	phoneBtn = document.querySelector('#phoneBtn'),
// 	phoneResult = document.querySelector('#phoneResult')
//
// const reg = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/
//
// phoneBtn.addEventListener('click', () => {
// 	if(reg.test(phoneInput.value)){
// 		phoneResult.textContent = 'success'
// 		phoneResult.style.color = 'green'
// 	} else {
// 		phoneResult.textContent = 'fail'
// 		phoneResult.style.color = 'red'
// 	}
// })

// functions:
// function declaration
// function expression
// function arrow


// // function declaration - hoisting
// sayHi()
// function sayHi() {
// 	console.log('hi')
// }
//
// // function expression
// const sayHello = function () {
// 	console.log('hello')
// }
// sayHello()
//
//
// // arrow function
// const sayBye = () => {
// 	console.log('bye')
// }
// sayBye()

// const,  let,  var,
// var num = 10
// console.log(num)
// let num2 = 99
// console.log(num2)

// recursion - рекурсия

// let number = 0
// const count = () => {
// 	number++
// 	console.log(number)
// 	if(number > 30){
// 		return
// 		console.log('hi')
// 	}
// 	count()
// }
//
// count()

// let field = ''
// let i = 0

// function print() {
// 	i++
// 	field += `${i} `
//
// 	if(i > 20){
// 		return
// 	}
// 	print()
// }
//
//
// print()
// console.log(field)

// let field = ''
// for (let i = 0; i < 20; i++){
// 	field += `${i} `
// }
// console.log(field)

// const people = {
// 	"John": {
// 		age: 22,
// 		parents: {
// 			"Kelly": {
// 				age: 45
// 			},
// 			"Andrew": {
// 				age: 47,
// 				parents: {
// 					"George": {
// 						age: 89
// 					},
// 					"random": {
// 						age: 89
// 					}
// 				}
// 			}
// 		}
// 	},
// 	"Antony": {
// 		age: 25,
// 		parents: {
// 			"Alice": {
// 				age: 50,
// 				parents: {
// 					"Katy": {
// 						age: 90
// 					}
// 				}
// 			},
// 			"Mikel": {
// 				age: 53,
// 				parents: {
// 					"AmeliaAlbert": {
// 						age: 95
// 					},
// 					"Albert": {
// 						age: 92
// 					}
// 				}
// 			}
// 		}
// 	}
// }
//
// function findParents(obj) {
// 	if(obj.parents){
// 		for (const key in obj.parents) {
// 			console.log(key)
// 			findParents(obj.parents[key])
// 		}
// 	}
// }
//
// for (const key in people) {
// 	findParents(people[key])
// }


// const move = document.querySelector('.move')
// const block = document.querySelector('.block')
//
// move.addEventListener('click', moveBlock)
//
// let position = 0
// function moveBlock () {
// 	position += 3
// 	block.style.left = position + 'px'
// 	if(position > 500){
// 		return
// 	}
// 	setTimeout(moveBlock, 20)
// }

// (0, 1, 2) digit{13}