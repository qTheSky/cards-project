import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from 'features/Auth/auth-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {profileReducer} from 'features/Profile/profile-reducer';
import {appReducer} from 'app/app-reducer';
import {packReducer} from 'features/Packs/packs-reducer';

export const rootReducer = combineReducers({
		auth: authReducer,
		profile: profileReducer,
		app: appReducer,
		packs:packReducer,
})

export const store = configureStore({reducer: rootReducer})

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store

