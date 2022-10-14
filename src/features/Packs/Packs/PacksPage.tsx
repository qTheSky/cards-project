import React from 'react';
import {useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';

export const PacksPage = () => {
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
		if (!isLoggedIn) return <Navigate to={PATH.login}/>
		return (
				<div>
						PacksPage
				</div>
		);
};
