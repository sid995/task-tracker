import React, { useEffect, useState } from 'react'
import CreateTask from '../CreateTask/CreateTask'
import AuxillaryComponent from '../AuxillaryComponent/AuxillaryComponent'
import TaskList from '../TaskList/TaskList'

const Main = ({ setAuthentication }) => {
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			setAuthentication(false)
		}
	}, [setAuthentication])

	const [selectedTag, setSelectedTag] = useState(null)

	return (
		<div
			style={{
				maxWidth: 800,
				width: '80%',
				margin: '0 auto',
				paddingTop: 20,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<CreateTask selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
			<AuxillaryComponent selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
			<TaskList />
		</div>
	)
}

export default Main
