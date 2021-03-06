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
const modalCloseBtn = document.querySelector('.modal__close')

modalTrigger[0].addEventListener('click', openModal)

modalCloseBtn.addEventListener('click', closeModal)
modal.addEventListener('click', (e) => {
	if (e.target === modal) {
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
// const timeoutId = setTimeout(openModal, 5000)


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
		if(num >= 10){
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
class Cards{
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
					<div class="menu__item-cost">????????:</div>
					<div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
				</div>
		`
		wrapper.append(card)
	}
}

const card1 = new Cards('img/tabs/vegy.jpg', '???????? "??????????????"', '???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!', 229, 'this is first card')
card1.render()