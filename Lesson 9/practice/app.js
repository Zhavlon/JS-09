'use strict'
// замыкания

// function count() {
// 	let currentNum = 1
// 	return ++currentNum
// }
//
// console.log( count() )
// console.log( count() )

// function makeCount() {
// 	let currentNum = 1
//
// 	return function (){
// 		return ++currentNum
// 	}
// }
//
// const count = makeCount()
//
//
// console.log( count() )
// console.log( count() )

// let number = 10
//
// function inc() {
// 	return ++number
// }
//
// console.log( inc() )
// console.log( inc() )

// 1) this - обычная ф-у: this - window, strict - undefined
// 2) в методах объекта - сам объект
// 3) ручная привязка
// 4) в обработчиках (function): сам элемент, а если arrow => window

// function showThis(){
// 	console.log(this)
// }
//
// showThis()

// function showThis(surname, num){
// 	console.log(this.name)
// 	console.log(surname)
// 	console.log(num)
// }

// const obj = {
// 	name: 'Jordan',
// 	age: 50
// }
//
// // call, apply, bind
//
// // showThis.call(obj, 'Anderson', 21)
// // showThis.apply(obj, ['Anderson', 31])


// function double(num){
// 	console.log(num * this)
// }
//
// const count = double.bind(3)
//
// count(2)
// count(3)
// count(10)

// const btn = document.querySelector('.btn')
//
// btn.addEventListener('click', () => {
// 	console.log(this)
// })

const obj = {
	name: 'Jordan',
	age: 50,
	showThis: function (){
		return () => {
			console.log(this)
		}
	}
}

const arrow = obj.showThis()
arrow()

// DOM = document object model
// DOM API - queryselectory, getelement