import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_TASKS } from '../../Graphql/Queries/task'
import TaskItem from '../TaskItem/TaskItem'

const TaskList = () => {
	const [errorMessage, setErrorMessage] = useState(null)
	const { loading, error, data } = useQuery(GET_ALL_TASKS)

	useEffect(() => {
		if (!loading) {
			if (error.graphQLErrors[0].extensions.code === 'invalid-jwt') {
				setErrorMessage(error.message)
			} else {
				setErrorMessage(null)
			}
		}
	}, [error, loading])

	console.log({ errorMessage, loading, error, data })

	// if (loading) {
	// 	return <div>Loading</div>
	// }

	// if (errorMessage !== null) {
	// 	return <div>{errorMessage}</div>
	// }

	return (
		<>
			{data && data.tasks.length === 0 && <div>Add a task using input above</div>}
			{data &&
				data.tasks.map((task) => {
					return <TaskItem task={task} />
				})}

			<TaskItem />
		</>
	)
}

export default TaskList
