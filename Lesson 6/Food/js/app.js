// tabs
const tabs = document.querySelectorAll('.tabheader__item')
const tabsParent = document.querySelector('.tabheader__items')
const tabsContent = document.querySelectorAll('.tabcontent')

function hideTabsContent() {
	tabsContent.forEach(item => {
		item.classList.add('hide')
		item.classList.remove('show', 'animate')
	})

	tabs.forEach(item => {
		item.classList.remove('tabheader__item_active')
	})
}

function showTabsContent(i) {
	tabsContent[i].classList.add('show', 'animate')
	tabsContent[i].classList.remove('hide')

	tabs[i].classList.add('tabheader__item_active')
}

hideTabsContent()
showTabsContent(0)


tabsParent.addEventListener('click', (e) => {
	tabs.forEach((item, i) => {
		if (e.target === item) {
			hideTabsContent()
			showTabsContent(i)
		}
	})
})

// modal
const modalTrigger = document.querySelectorAll('[data-modal]')
const modal = document.querySelector('.modal')

modalTrigger[0].addEventListener('click', openModal)

modal.addEventListener('click', (e) => {
	if (e.target === modal || e.target.classList.contains('modal__close')) {
		closeModal()
	}
})

document.body.addEventListener('keydown', (e) => {
	if (e.code === 'Backspace') {
		closeModal()
	}
})

function openModal() {
	modal.classList.add('show')
	modal.classList.remove('hide')
	document.body.style.overflow = 'hidden'

	clearInterval(timeoutId)
}

function closeModal() {
	modal.classList.add('hide')
	modal.classList.remove('show')
	document.body.style.overflow = 'auto'
}


function openModalScroll() {
	const page = document.documentElement
	if (page.clientHeight + page.scrollTop >= page.scrollHeight) {
		openModal()
		window.removeEventListener('scroll', openModalScroll)
	}
}

// window.addEventListener('scroll', openModalScroll)
const timeoutId = setTimeout(openModal, 100000)


// clock
const deadline = '2022-02-2'

function getTimeRemaining(deadline) {
	const t = new Date(deadline) - new Date(),
		days = Math.floor((t / (1000 * 60 * 60 * 24))),
		hours = Math.floor((t / (1000 * 60 * 60) % 24)),
		minutes = Math.floor((t / 1000 / 60) % 60),
		seconds = Math.floor((t / 1000) % 60);

	return {
		"total": t,
		"days": days,
		"hours": hours,
		"minutes": minutes,
		"seconds": seconds
	}
}

function setClock(parent, deadline) {
	const parentBlock = document.querySelector(parent)
	const days = parentBlock.querySelector('#days'),
		hours = parentBlock.querySelector('#hours'),
		minutes = parentBlock.querySelector('#minutes'),
		seconds = parentBlock.querySelector('#seconds');


	function addZero(num) {
		if (num >= 10) {
			return num
		} else {
			return `0${num}`
		}
	}

	updateClock()
	setInterval(updateClock, 1000)

	function updateClock() {
		const t = getTimeRemaining(deadline)
		days.innerText = addZero(t.days)
		hours.innerText = addZero(t.hours)
		minutes.innerText = addZero(t.minutes)
		seconds.innerText = addZero(t.seconds)
	}
}

setClock('.timer', deadline)

// Cards
class Cards {
	constructor(src, title, description, price, alt) {
		this.src = src
		this.title = title
		this.description = description
		this.price = price
		this.alt = alt
	}

	render() {
		const wrapper = document.querySelector('#cardWrapper')
		const card = document.createElement('div')
		card.classList.add('menu__item')

		card.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.description}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
		`
		wrapper.append(card)
	}
}

const card1 = new Cards('img/tabs/vegy.jpg', 'Меню "Постное"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229, 'this is first card')
card1.render()


// form
const forms = document.querySelectorAll('form')

forms.forEach(item => {
	postData(item)
})

const messages = {
	success: 'Спасибо, ожидайте ответа !',
	fail: 'Что-то пошло не так :(',
	loading: 'img/form/spinner.svg'
}

function postData(form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault()
		const messageBlock = document.createElement('img')
		// form.append(messageBlock)
		messageBlock.src = messages.loading
		messageBlock.style.cssText = `
			display: block;
			margin: 20px auto 0;
		`

		form.insertAdjacentElement('afterend', messageBlock)
		const formData = new FormData(form)
		const object = {}

		formData.forEach((item, i) => {
			object[i] = item
		})
		const json = JSON.stringify(object)

		fetch('server1.php', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: json
		}).then(() => {
			showResultModal(messages.success)
		}).catch(() => {
			showResultModal(messages.fail)
		}).finally(() => {
			form.reset()
			messageBlock.remove()
		})
	})
}


function showResultModal(message) {
	openModal()
	const previousModal = document.querySelector('.modal__dialog')
	previousModal.classList.add('hide')

	const resultModal = document.createElement('div')
	resultModal.classList.add('modal__dialog')

	resultModal.innerHTML = `
	 	<div class="modal__content">
			<div class="modal__close">x</div>
			<div class="modal__title">${message}</div>
		</div>
	`
	modal.append(resultModal)

	setTimeout(() => {
		previousModal.classList.remove('hide')
		closeModal()
		resultModal.remove()
	}, 2000)
}

// slider
const slides = document.querySelectorAll('.offer__slide'),
	prev = document.querySelector('.offer__slider-prev'),
	next = document.querySelector('.offer__slider-next'),
	currentSlide = document.querySelector('#current'),
	totalSlides = document.querySelector('#total');

let slidesIndex = 1


if(slidesIndex < 10){
	totalSlides.textContent = slides.length
} else {
	totalSlides.textContent = `0${slides.length}`
}

function slide(i) {
	if(i > slides.length) {
		slidesIndex = 1
	}

	if(i < 1) {
		slidesIndex = slides.length
	}

	if(slidesIndex < 10){
		currentSlide.textContent = `0${slidesIndex}`
	} else {
		currentSlide.textContent = slidesIndex
	}


	slides.forEach(item => {
		item.style.display = 'none'
		item.classList.remove('animate')
	})

	slides[slidesIndex - 1].style.display = 'block'
	slides[slidesIndex - 1].classList.add('animate')
}

slide(slidesIndex)

prev.addEventListener('click', () => {
	slide(slidesIndex -= 1)
})

next.addEventListener('click', () => {
	slide(slidesIndex += 1)
})