import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_TASK, CREATE_TASK_WITH_TAG } from '../../Graphql/Mutations/task'
import { updateMutationFunction } from '../../Utility'

const CreateTask = ({ selectedTag, setSelectedTag }) => {
	const [taskTitle, setTaskTitle] = useState('')

	const [createTask] = useMutation(CREATE_TASK, {
		update: (cache, response) => {
			updateMutationFunction(cache, response)
		},
		onCompleted: (data) => {
			console.log(data)
			setTaskTitle('')
		},
		onError: (e) => {
			console.log(e)
		},
	})

	const [createTaskWithExistingTag] = useMutation(CREATE_TASK_WITH_TAG, {
		update: (cache, response) => {
			updateMutationFunction(cache, response)
		},
		onCompleted: (data) => {
			console.log(data)
			setTaskTitle('')
			setSelectedTag(null)
		},
		onError: (e) => {
			console.log(e)
		},
	})

	const createTaskHandler = (e) => {
		e.preventDefault()
		if (selectedTag) {
			createTaskWithExistingTag({
				variables: {
					title: taskTitle,
					tag_id: selectedTag,
				},
			})
		} else {
			createTask({
				variables: {
					title: taskTitle,
				},
			})
		}
	}

	return (
		<div className='create-task-section'>
			<input
				className='create-task--input'
				value={taskTitle}
				onChange={(e) => setTaskTitle(e.target.value)}
				placeholder='Enter Tasks'
			/>
			<button
				className='create-task--button'
				disabled={taskTitle === ''}
				onClick={(e) => createTaskHandler(e)}
			>
				Submit
			</button>
		</div>
	)
}

export default CreateTask
