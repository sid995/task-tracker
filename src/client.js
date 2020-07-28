import { InMemoryCache, ApolloClient, HttpLink, ApolloLink } from '@apollo/client'

const httpLink = new HttpLink({
	uri: 'https://test-323.herokuapp.com/v1/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem('token')
	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : ``,
		},
	})

	return forward(operation)
})

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})
