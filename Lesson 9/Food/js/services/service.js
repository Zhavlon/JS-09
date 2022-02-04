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

export {post, getCard}