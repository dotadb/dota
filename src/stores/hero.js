import { createStore, createHook } from 'react-sweet-state'

const store = createStore({
  actions: {
    fetch: (id) => async ({ getState, setState }) => {
      setState({
        loading: true
      })

      try {
        const response = await fetch(
          `https://www.dota2.com/datafeed/herodata?language=english&hero_id=${id}`
        )

        const {
          result: {
            data: {
              heroes: [hero]
            }
          }
        } = await response.json()

        const { heroes } = getState()

        setState({
          heroes: {
            ...heroes,
            [id]: hero
          }
        })
      } finally {
        setState({
          loading: false
        })
      }
    }
  },
  initialState: {
    heroes: {},
    loading: false
  },
  name: 'hero'
})

export const useHero = createHook(store)
