import {createStore } from 'redux'
import galleryReducer from '../reducers/galleryReducer'

export const store = createStore(galleryReducer)