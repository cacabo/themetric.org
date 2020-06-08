import { Reducer } from 'react'
import { ISearchResult, getSearchResults } from '../../helpers/misc'

export interface ISearchReducerState {
  query: string
  results: ISearchResult[]
}

export interface ISearchReducerAction {
  type: 'QUERY'
  query: string
}

export const initialSearchState: ISearchReducerState = {
  query: '',
  results: [],
}

export const searchReducer: Reducer<
  ISearchReducerState,
  ISearchReducerAction
> = (state, action) => {
  switch (action.type) {
    case 'QUERY': {
      const results = getSearchResults(action.query)
      return { ...state, query: action.query, results }
    }
    default: {
      return state
    }
  }
}
