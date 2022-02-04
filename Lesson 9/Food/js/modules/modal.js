function openModal(modalSelector, timeoutId) {
	const modal = document.querySelector(modalSelector)

	modal.classList.add('show')
	modal.classList.remove('hide')
	document.body.style.overflow = 'hidden'

	if(timeoutId){
		clearInterval(timeoutId)
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector)

	modal.classList.add('hide')
	modal.classList.remove('show')
	document.body.style.overflow = 'auto'
}

function modal(modalSelector, triggerSelector) {
	const modalTrigger = document.querySelectorAll(triggerSelector)
	const modal = document.querySelector(modalSelector)

	modalTrigger[0].addEventListener('click', () => {
		openModal(modalSelector)
	})

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.classList.contains('modal__close')) {
			closeModal(modalSelector)
		}
	})

	document.body.addEventListener('keydown', (e) => {
		if (e.code === 'Backspace') {
			closeModal(modalSelector)
		}
	})

	function openModalScroll() {
		const page = document.documentElement
		if (page.clientHeight + page.scrollTop >= page.scrollHeight) {
			openModal(modalSelector)
			window.removeEventListener('scroll', openModalScroll)
		}
	}

	window.addEventListener('scroll', openModalScroll)
}

export default modal
export {openModal, closeModal}