import { GET_ALL_TASKS } from '../Graphql/Queries/task'

export const updateMutationFunction = (cache, response) => {
	const createdTask = {
		...response.data.insert_tasks_one,
	}
	const { tasks } = cache.readQuery({
		query: GET_ALL_TASKS,
	})
	cache.writeQuery({
		query: GET_ALL_TASKS,
		data: {
			tasks: [...tasks, createdTask],
		},
	})
}
