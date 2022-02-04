/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");


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

	(0,_services_service__WEBPACK_IMPORTED_MODULE_0__.getCard)('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, title, descr, price, altimg}) => {
				new Cards(img, title, descr, price, altimg).render()
			})
		})

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/clock.js":
/*!*****************************!*\
  !*** ./js/modules/clock.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function clock(deadline, selector) {
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
			if (t.total < 0) {
				days.innerText = addZero(0)
				hours.innerText = addZero(0)
				minutes.innerText = addZero(0)
				seconds.innerText = addZero(0)
				return
			}
			days.innerText = addZero(t.days)
			hours.innerText = addZero(t.hours)
			minutes.innerText = addZero(t.minutes)
			seconds.innerText = addZero(t.seconds)
		}
	}

	setClock(selector, deadline)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clock);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");




function form(modalSelector) {
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

			;(0,_services_service__WEBPACK_IMPORTED_MODULE_1__.post)('http://localhost:3000/requests', json)
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
		const modal = document.querySelector(modalSelector)

		;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector)
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
			;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector)
			resultModal.remove()
		}, 2000)
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
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
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/services/service.js":
/*!********************************!*\
  !*** ./js/services/service.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post": () => (/* binding */ post),
/* harmony export */   "getCard": () => (/* binding */ getCard)
/* harmony export */ });
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


async function getCard (url) {
	const res = await fetch(url)

	if(!res.ok) {
		throw new Error(`Cannot fetch ${url}, status: ${res.status}`)
	}

	return await res.json()
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_clock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/clock */ "./js/modules/clock.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








const timeoutId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', timeoutId), 100000)

;(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])()
;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-modal]')
;(0,_modules_clock__WEBPACK_IMPORTED_MODULE_2__["default"])('2022-04-10', '.timer')
;(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])()
;(0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal')
;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])()
;(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])()
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map