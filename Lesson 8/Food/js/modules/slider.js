function slider() {
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
}
export default slider