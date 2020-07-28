import React, { useState, useEffect } from 'react'

const Authentication = ({ setAuthentication }) => {
	const [token, setToken] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token !== null) {
			setAuthentication(true)
		}
	}, [setAuthentication])

	return (
		<div>
			<br />
			<br />
			<br />
			Go to{' '}
			<a href='https://test-323-c4fca.web.app/' target='_blank' rel='noopener noreferrer'>
				https://test-323-c4fca.web.app/
			</a>{' '}
			and copy your_token
			<br />
			<br />
			<br />
			<textarea
				rows='10'
				cols='60'
				placeholder='Paste copied token here'
				value={token}
				onChange={(e) => setToken(e.target.value)}
			/>
			<br />
			<br />
			<button
				onClick={() => {
					localStorage.setItem('token', token)
					setAuthentication(true)
				}}
			>
				Submit
			</button>
		</div>
	)
}

export default Authentication
