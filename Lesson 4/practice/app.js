// // JSON - javascript object notation
//
// const obj = {
// 	a: 2112,
// 	b: 123123
// }
//
// // JSON.stringify() - obj => json
// // JSON.parse() - json => obj
//
// const json = JSON.stringify(obj)
// const parse = JSON.parse(json)
//
// console.log(parse)

// console.log('first message')
// console.log('second message')
//
// setTimeout(() => {
// 	console.log('async')
// }, 3000)
//
// const num1 = 1000
// console.log(num1)

// const btn = document.querySelector('#btn')
//
// btn.addEventListener('click', () => {
// 	console.log('btn is clicked')
// })
//
// console.log('random')


// // AJAX - asynchronous javascript and xml
// const request = new XMLHttpRequest()
//
// request.open('GET', 'hello.txt')
// request.send()
//
// // response
// // readyState
// // status
//
// request.addEventListener('readystatechange', () => {
// 	if(request.readyState === 4){
// 		console.log(request.response)
// 	}
// })


// document.querySelector('#btn').addEventListener('click', () => {
// 	const request = new XMLHttpRequest()
//
// 	request.open('GET', 'data.json')
// 	request.setRequestHeader('Content-type', 'application/json')
// 	request.send()
//
// 	request.addEventListener('load', () => {
// 		const data = JSON.parse(request.response)
// 		document.querySelector('#name').innerHTML = data.name
// 		document.querySelector('#age').innerHTML = data.age
// 	})
// })


// number, sting, boolean, null, undefined - передаются по значению
// obj, function, array - передаются по ссылке

// поверхностное клонирование
const object1 = {
	name: 'Alex',
	isMarried: false,
	age: 35,
	children: {
		childName: 'Child 1',
		childAge: 10,
		family: {
			mother: 'Joanna',
			father: 'Aibek',
			sister: 'Elsa'
		}
	}
}

// const object2 = {...object1}
// object2.name = 'George'
// object2.children.childName = 'next Child'
//
// console.log(object1)
// console.log(object2)

// глубокое клонирование
const object2 =  JSON.parse(JSON.stringify(object1))

object2.name = 'George'
object2.children.childName = 'next Child'
object2.children.family.sister = 'Diana'

console.log(object1)
console.log(object2)