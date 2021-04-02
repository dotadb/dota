import { createStore, createHook } from 'react-sweet-state'

const store = createStore({
  actions: {
    fetch: () => async ({ setState }) => {
      setState({
        loading: true
      })

      try {
        const response = await fetch(
          'https://www.dota2.com/datafeed/herolist?language=english'
        )

        const {
          result: {
            data: { heroes }
          }
        } = await response.json()

        setState({
          heroes
        })
      } finally {
        setState({
          loading: false
        })
      }
    }
  },
  initialState: {
    heroes: [],
    loading: false
  },
  name: 'heroes'
})

export const useHeroes = createHook(store)
