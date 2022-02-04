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


export default tabs