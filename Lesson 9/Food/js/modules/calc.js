function calc(){
	const result = document.querySelector('.calculating__result span')
	let gender, height, weight, age, ratio;


	if(localStorage.getItem('ratio')){
		ratio = localStorage.getItem('ratio')
	} else {
		localStorage.setItem('ratio', 1.55)
	}


	if(localStorage.getItem('gender')){
		gender = localStorage.getItem('gender')
	} else {
		localStorage.setItem('gender', 'male')
	}


	function activeClasses (selector, activeClass) {
		const elements = document.querySelectorAll(selector)

		elements.forEach(item => {
			item.classList.remove(activeClass)

			if(item.getAttribute('id') === localStorage.getItem('gender')){
				item.classList.add(activeClass)
			}

			if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')){
				item.classList.add(activeClass)
			}
		})
	}

	activeClasses('#gender div', 'calculating__choose-item_active')
	activeClasses('.calculating__choose_big > div', 'calculating__choose-item_active')

	function calculate () {
		if(!gender || !height || !weight || !age || !ratio) {
			result.textContent = '____'
			return
		}

		if(gender == 'female') {
			result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))  * ratio);
		}
	}

	function getStaticInfo (parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`)

		elements.forEach(item => {
			item.addEventListener('click', (e) => {
				if(e.target.getAttribute('data-ratio')){
					ratio = +e.target.getAttribute('data-ratio')
					localStorage.setItem('ratio', e.target.getAttribute('data-ratio'))
				} else {
					gender = e.target.getAttribute('id')
					localStorage.setItem('gender', e.target.getAttribute('id'))
				}

				elements.forEach(item => {
					item.classList.remove(activeClass)
				})

				e.target.classList.add(activeClass)

				calculate()
			})
		})
	}

	getStaticInfo('#gender', 'calculating__choose-item_active')
	getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active')

	function getDynamicInfo(selector) {
		const input = document.querySelector(selector)

		input.addEventListener('input', () => {


			if(input.value.match(/\D/g)) {
				input.style.border = '1px solid red'
			} else {
				input.style.border = 'none'
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value
					break;
				case 'weight':
					weight = +input.value
					break;
				case 'age':
					age = +input.value
			}

			calculate()
		})
	}


	getDynamicInfo('#height')
	getDynamicInfo('#weight')
	getDynamicInfo('#age')
}
export default calc