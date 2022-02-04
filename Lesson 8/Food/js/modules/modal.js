function modal() {
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

	window.addEventListener('scroll', openModalScroll)
	const timeoutId = setTimeout(openModal, 100000)
}

export default modal