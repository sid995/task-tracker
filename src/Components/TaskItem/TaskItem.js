import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@apollo/client'
import { DELETE_TASK, UPDATE_TASK_BY_PK } from '../../Graphql/Mutations/task'
import { GET_ALL_TASKS } from '../../Graphql/Queries/task'
import Timer from 'react-compound-timer'
import TimeTracker from '../TimerTracker/TimeTracker'
import { client } from '../../client'
import moment from 'moment'

const TaskItem = (props) => {
	const [editedTask, setEditedTask] = useState(null)
	const [editTitle, setEditTitle] = useState('')
	const [startTime, setStartTime] = useState(false)

	const taskClickHandler = (task) => {
		setEditedTask(task.id)
		setEditTitle(task.title)
	}

	const [deleteTask] = useMutation(DELETE_TASK, {
		update: (cache, res) => {
			if (res.data) {
				const { tasks } = cache.readQuery({
					query: GET_ALL_TASKS,
				})
				cache.writeQuery({
					query: GET_ALL_TASKS,
					data: {
						tasks: tasks.filter((task) => task.id !== res.data.delete_tasks_by_pk.id),
					},
				})
			}
		},
		onError: (e) => {
			console.log({ e })
		},
	})

	const [updateTask] = useMutation(UPDATE_TASK_BY_PK, {
		update: (cache, res) => {
			if (res.data) {
				const { tasks } = cache.readQuery({
					query: GET_ALL_TASKS,
				})

				const taskIndex = tasks.findIndex((task) => task.id === res.data.update_task_by_pk.id)
				let updatedTasks = tasks
				updatedTasks.slice(taskIndex, 1, res.data.update_task_by_pk)
				cache.writeQuery({
					query: GET_ALL_TASKS,
					data: {
						tasks: updatedTasks,
					},
				})
			}
		},
		onError: (e) => {
			console.log({ e })
		},
	})

	const getFormattedTime = (time) => {
		// convert the hours, minutes and seconds in milliseconds
		const [hrs, min, sec] = time

		return 1000 * (3600 * hrs + 60 * min + sec)
	}

	const startTask = (time, setTime, start, task) => {
		if (time.filter((t) => t > 0).length === 0) {
			return
		}
		const formattedTime = getFormattedTime(time)

		setTime(formattedTime)
		start()
		setStartTime({ [task.id]: true })

		// update task with startTime
		const startTimeStampUnix = moment().valueOf()
		const endTimeStampUnix = startTimeStampUnix + formattedTime

		const startTime = moment(startTimeStampUnix)
		const endTime = moment(endTimeStampUnix)

		updateTask({
			variables: {
				id: task.id,
				start_time: startTime.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
				end_time: endTime.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
				title: task.title,
			},
		})
	}

	const stopTask = () => {}

	return (
		<div className='task-item'>
			<div className='task-top-section'>
				{/* Edit task name based on double clicking task name. changes setEditedTask in the state */}

				{/* {editedTask === props.task.id ? (
					<>
						<input
							className='edit-task-title'
							placeholder='Edit task name'
							onChange={(e) => setEditTitle(e.target.value)}
							value={editTitle}
							autoFocus
						/>
						<div className='edit-task-controls'>
							<span>Accept</span>
							<span>Reject</span>
						</div>
					</>
				) : (
					<>
						<div className='task-name' onDoubleClick={() => taskClickHandler(props.task)}>
							aa
						</div>
						<div className='task-delete'></div>
					</>
				)} */}

				{/* Skeleton code */}
				<div className='task-name' onDoubleClick={() => taskClickHandler(props.task)}>
					aa
				</div>
				<div className='task-delete'>
					<FontAwesomeIcon
						icon={faTrashAlt}
						onClick={() =>
							deleteTask({
								variables: {
									// id: task.id
								},
							})
						}
					></FontAwesomeIcon>
				</div>
			</div>
			{/* <div className='task-bottom-section'>
				<div className='task-timing'>
					<div className='task-time'>
						<Timer startImmediately={false} initialTime={''} direction='backward'>
							{({ start, stop, timerState, setTime, getTime }) => {
								return (
									<>
										{startTime && startTime[task.id] && (
											<>
												<Timer.Hours />
												<span>h</span>
												<Timer.Minutes />
												<span>m</span>
												<Timer.Seconds />
												<span>s</span>
											</>
										)}
										{!(startTime && startTime[task.id]) && (
											<TimeTracker
												client={client}
												id={task.id}
												saveTime={(time) => {
													startTask(time, setTime, start, task)
												}}
											/>
										)}
									</>
								)
							}}
						</Timer>
					 <span className='task-time-slot'>
							<input placeholder='hr' />
						</span>
						<span className='task-time-slot'>
							<input placeholder='min' />
						</span>
						<span className='task-time-slot'>
							<input placeholder='sec' />
						</span>
					</div>
					<div className='task-time-handler'>
						{startTime ? (
							<span className='task-time-button'>
								<FontAwesomeIcon icon={faStop} onClick={() => startTask()}></FontAwesomeIcon>
							</span>
						) : (
							<span className='task-time-button'>
								<FontAwesomeIcon icon={faPlay} onClick={() => stopTask()}></FontAwesomeIcon>
							</span>
						)}
					</div>
				</div>
				<div className='task-tags'>
					<div className='task-tag'></div>
				</div>
			</div> */}
		</div>
	)
}

export default TaskItem
