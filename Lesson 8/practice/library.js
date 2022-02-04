function MyModule () {
	this.sayHello = () => {
		console.log('Hello world !')
	}

	this.sayBye = () => {
		console.log('GoodBye !')
	}
}

const number = 1000
const string = 'Module export'

export default MyModule
export {number, string}