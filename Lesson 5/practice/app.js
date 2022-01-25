const som = document.querySelector('#som'),
	usdBlock = document.querySelector('#usd')

const convert = (element, target) => {
	element.addEventListener('input', () => {
		const request = new XMLHttpRequest()

		request.open('GET', 'data.json')
		request.setRequestHeader('Content-type', 'application/json')
		request.send()

		request.addEventListener('load', () => {
			const response = JSON.parse(request.response)

			if (element === som) {
				console.log(response)
					target.value = (+element.value / response.usd).toFixed(2)
				} else {
					target.value = (+element.value * response.usd).toFixed(2)
				}

				element.value === '' ? target.value = '' : null
			}
		)
	})
}


convert(som, usdBlock)
convert(usdBlock, som)