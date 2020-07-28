import React, { useState } from 'react'
import './App.css'
import Authentication from './Components/Authentication/Authentication'
import Main from './Components/Main/Main'

function App() {
	const [authenticated, setAuthentication] = useState(false)

	return (
		<div>
			{authenticated ? (
				<Main setAuthentication={setAuthentication} />
			) : (
				<Authentication setAuthentication={setAuthentication} />
			)}
		</div>
	)
}

export default App
