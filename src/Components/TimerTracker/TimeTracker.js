import React, { useEffect, useState } from 'react'
import * as moment from 'moment'

const TimeTracker = ({ id, saveTime, client }) => {
	const [timer, setTimer] = useState([0, 0, 0])
	const [showCompleted, setShowCompleted] = useState(false)

	useEffect(() => {}, [])

	return (
		<>
			<span className='task-time-slot'>
				<input placeholder='hr' />
			</span>
			<span className='task-time-slot'>
				<input placeholder='min' />
			</span>
			<span className='task-time-slot'>
				<input placeholder='sec' />
			</span>
		</>
	)
}

export default TimeTracker
