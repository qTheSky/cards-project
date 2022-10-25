import React from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {Header} from 'common/components/Header/Header';
import {ErrorSnackbar} from 'common/components/ErrorSnackBar';
import {useAppSelector} from 'app/store';
import {getIsAppAppMakingRequest} from 'app/selectors';
import {BackDrop} from 'common/components/BackDrop/BackDrop';
import {PATH} from 'app/RouteVariables';

export const MainLayout = () => {
		const isAppMakeRequest = useAppSelector(getIsAppAppMakingRequest)
		const {pathname} = useLocation()
		return (
				<>
						<Header/>
						<Outlet/>
						<ErrorSnackbar/>
						{(isAppMakeRequest && !pathname.includes(PATH.learn)) && <BackDrop open={isAppMakeRequest}/>}
				</>
		);
};
