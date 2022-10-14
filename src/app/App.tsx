import React, {useEffect} from 'react';
import {AppRoutes} from 'app/AppRoutes';
import {useAppDispatch, useAppSelector} from 'app/store';
import {initializeApp} from 'app/app-reducer';
import {CircularProgress} from '@mui/material';

export const App = () => {
    const dispatch = useAppDispatch()
    const isAppInitialized = useAppSelector(state => state.app.isInitialized)
    useEffect(() => {
        dispatch(initializeApp())
    }, [])
    if (!isAppInitialized) {
        return <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return <AppRoutes/>
}

