import { gql } from '@apollo/client'

export const CREATE_TASK_WITH_TAG = gql`
	mutation createTaskWithExistingTag($title: String, $tag_id: Int) {
		insert_tasks_one(object: { title: $title, task_tags: { data: { tag_id: $tag_id } } }) {
			id
			title
			tags {
				id
				name
			}
		}
	}
`

export const CREATE_TASK = gql`
	mutation createTask($title: String, $tag: String) {
		insert_tasks_one(object: { title: $title }) {
			id
			title
		}
	}
`

export const DELETE_TASK = gql`
	mutation deleteTask($id: Int!) {
		delete_tasks_by_pk(id: $id) {
			id
			title
		}
	}
`

export const EDIT_TASK = gql`
	mutation editTask($id: Int!, $title: String) {
		update_tasks_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
			id
			title
			tags {
				id
				name
			}
		}
	}
`

export const CREATE_TAG = gql`
	mutation createTag($name: String) {
		insert_tags_one(object: { name: $name }) {
			id
			name
		}
	}
`

export const DELETE_TAG = gql`
	mutation deleteTag($id: Int!) {
		delete_tags_by_pk(id: $id) {
			id
			name
		}
	}
`
export const UPDATE_TASK_BY_PK = gql`
	mutation updateTask($id: Int!, $start_time: String, $end_time: String, $title: String) {
		update_task_by_pk(id: $id, start_time: $start_time, end_time: $end_time, title: $title) {
			id
			start_time
			end_time
			title
		}
	}
`
