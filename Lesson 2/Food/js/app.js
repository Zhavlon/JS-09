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

modalTrigger[0].addEventListener('click', () => {
	modal.classList.add('show')
	modal.classList.remove('hide')

	document.body.style.overflow = 'hidden'
})

modalCloseBtn.addEventListener('click', () => {
	modal.classList.add('hide')
	modal.classList.remove('show')
})

modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		modal.classList.add('hide')
		modal.classList.remove('show')
	}
})

document.body.addEventListener('keydown', (e) => {
	if (e.code === 'Backspace') {
		modal.classList.add('hide')
		modal.classList.remove('show')
	}
})