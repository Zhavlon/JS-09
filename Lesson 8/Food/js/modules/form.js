import modal from "./modal";

function form() {
	const forms = document.querySelectorAll('form')

	forms.forEach(item => {
		postData(item)
	})

	const messages = {
		success: 'Спасибо, ожидайте ответа !',
		fail: 'Что-то пошло не так :(',
		loading: 'img/form/spinner.svg'
	}

	const post = async (url, body) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: body
		})

		return await res.json()
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


			post('http://localhost:3000/requests', json)
				.then(() => {
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
}

export default form