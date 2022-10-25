import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from 'common/components/Header/Header';
import {ErrorSnackbar} from 'common/components/ErrorSnackBar';
import {useAppSelector} from 'app/store';
import {getIsAppAppMakingRequest} from 'app/selectors';
import {BackDrop} from 'common/components/BackDrop/BackDrop';

export const MainLayout = () => {
		const isAppMakeRequest = useAppSelector(getIsAppAppMakingRequest)
		return (
				<>
						<Header/>
						<Outlet/>
						<ErrorSnackbar/>
						{isAppMakeRequest && <BackDrop open={isAppMakeRequest}/>}
				</>
		);
};
