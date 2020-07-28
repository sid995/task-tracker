import React, { useState } from 'react'
import { CREATE_TAG, DELETE_TAG } from '../../../Graphql/Mutations/task'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_TAGS } from '../../../Graphql/Queries/task'

const Tags = ({ selectedTag, setSelectedTag }) => {
	const [tagMode, setTagMode] = useState(false)
	const [tagTitle, setTagTitle] = useState('')

	const [createTag] = useMutation(CREATE_TAG, {
		update: (cache, response) => {
			const { tags } = cache.readQuery({
				query: GET_ALL_TAGS,
			})
			cache.writeQuery({
				query: GET_ALL_TAGS,
				data: {
					tags: [...tags, response.data.insert_tags_one],
				},
			})
		},
		onError: (e) => {
			console.log({ e })
		},
	})

	const [deleteTag] = useMutation(DELETE_TAG, {
		update: (cache, res) => {
			if (res.data) {
				const { tags } = cache.readQuery({
					query: GET_ALL_TAGS,
				})
				cache.writeQuery({
					query: GET_ALL_TAGS,
					data: {
						tags: tags.filter((tag) => tag.id !== res.data.delete_tags_by_pk.id),
					},
				})
			}
		},
		onError: (e) => {
			console.log({ e })
		},
	})

	const { loading, error, data: tagsData } = useQuery(GET_ALL_TAGS)

	// if (loading) {
	// 	return <div>Loading Tags</div>
	// }

	// if (error) {
	// 	console.log({ error })
	// }

	return (
		<div className='tags-component'>
			{/* {tagsData && tagsData.map(tag => (
				// tag elements here
			))} */}
			<div
				// selectedTag === tag.id
				className={`tags-item ${selectedTag ? 'selected-tag' : ''}`}
				onClick={() => {
					setTagMode(false)
					// setSelectedTag(tag.id)
				}}
			>
				Tag1
				<span
					className='tag-delete'
					// onClick={() => deleteTag({ variables: { id: tag.id } })}
				>
					x
				</span>
			</div>
			{!tagMode ? (
				<div className='add-tag' onClick={() => setTagMode(true)}>
					+
				</div>
			) : (
				<div style={{ display: 'flex', flex: '0 0 auto' }}>
					<input
						type='text'
						value={tagTitle}
						onChange={(e) => setTagTitle(e.target.value)}
						placeholder='Enter tag name'
						onBlur={() => {
							setTagMode(false)
							setTagTitle('')
						}}
						autoFocus
						className='tag-input'
					/>
					<div
						className='add-tag'
						onClick={() => {
							createTag({
								variables: {
									name: tagTitle,
								},
							})
							setTagTitle('')
							setTagMode(false)
						}}
					>
						+
					</div>
				</div>
			)}
		</div>
	)
}

export default Tags
