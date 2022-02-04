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

export default clock