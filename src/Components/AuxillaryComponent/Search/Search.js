import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
	const [searchText, setSearchText] = useState('')
	const [searchMode, setSearchMode] = useState(false)
	return (
		<div className='search-component'>
			<div className='search-input'>
				<input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
			</div>
			<div className='search-button' onClick={}>
				<FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
			</div>
		</div>
	)
}

export default Search
