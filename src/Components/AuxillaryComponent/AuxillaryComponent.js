import React from 'react'
import Tags from './Tags/Tags'
// import Search from './Search/Search'

const AuxillaryComponent = ({ selectedTag, setSelectedTag }) => {
	return (
		<div className='auxillary-component'>
			<Tags selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
			{/* <Search /> */}
		</div>
	)
}

export default AuxillaryComponent
