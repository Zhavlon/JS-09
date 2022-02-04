function cards() {
	class Cards {
		constructor(img, title, descr, price, altimg) {
			this.img = img
			this.title = title
			this.descr = descr
			this.price = price
			this.altimg = altimg
		}

		render() {
			const wrapper = document.querySelector('#cardWrapper')
			const card = document.createElement('div')
			card.classList.add('menu__item')

			card.innerHTML = `
				<img src=${this.img} alt=${this.altimg}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
		`
			wrapper.append(card)
		}
	}

	async function getCard (url) {
		const res = await fetch(url)

		if(!res.ok) {
			throw new Error(`Cannot fetch ${url}, status: ${res.status}`)
		}

		return await res.json()
	}

	getCard('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, title, descr, price, altimg}) => {
				new Cards(img, title, descr, price, altimg).render()
			})
		})

}

export default cards