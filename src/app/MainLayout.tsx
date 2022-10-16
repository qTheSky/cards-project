import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from 'common/components/Header/Header';
import {ErrorSnackbar} from 'common/components/ErrorSnackBar';

export const MainLayout = () => {
		return (
				<>
						<Header/>
						<Outlet/>
						<ErrorSnackbar/>
				</>
		);
};
