import React, {useEffect} from 'react';
import {AppRoutes} from 'app/AppRoutes';
import {useAppDispatch, useAppSelector} from 'app/store';
import {initializeApp} from 'app/app-reducer';
import {Spinner} from 'common/components/Spinner/Spinner';

export const App = () => {
		const dispatch = useAppDispatch()
		const isAppInitialized = useAppSelector(state => state.app.isInitialized)
		useEffect(() => {
				dispatch(initializeApp())
		}, [])


		if (!isAppInitialized) return <Spinner/>


		return <AppRoutes/>
}

