const btns = document.querySelectorAll('button')
const parent = document.querySelector('.btn-block')

parent.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		e.target.classList.toggle('red')
	}
})

// btns.forEach(item => {
// 	item.addEventListener('click', (e) => {
// 		e.target.classList.toggle('red')
// 	})
// })

const newBtn = document.createElement('button')
const newBtn2 = document.createElement('button')

newBtn.classList.add('newChild')

parent.append(newBtn)
parent.append(newBtn2)