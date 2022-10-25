import React from 'react'
import {Route, Routes} from 'react-router-dom';
import {MainLayout} from 'app/MainLayout';
import {Login} from 'features/Auth/Login/Login';
import {Register} from 'features/Auth/Register/Register';
import {PATH} from 'app/RouteVariables';
import {ForgotPass} from 'features/Auth/ForgotPass/ForgotPass';
import {NewPass} from 'features/Auth/NewPass/NewPass';
import {Profile} from 'features/Profile/Profile/Profile';
import {PacksPage} from 'features/Packs/PacksPage';
import {CardsPage} from 'features/Cards/CardsPage';
import {LearnPage} from 'features/Cards/Learn/LearnPage';
import {Page404} from 'common/components/404Page/Page404';

export const AppRoutes = () => {
		return (
				<Routes>
						<Route path={PATH.main} element={<MainLayout/>}>
								<Route path={PATH.notFound} element={<Page404/>}/>
								<Route path={PATH.login} element={<Login/>}/>
								<Route path={PATH.register} element={<Register/>}/>
								<Route path={PATH.forgotPass} element={<ForgotPass/>}/>
								<Route path={PATH.setNewPass} element={<NewPass/>}/>
								<Route path={PATH.profile} element={<Profile/>}/>
								<Route index element={<PacksPage/>}/>
								<Route path={PATH.cards} element={<CardsPage/>}/>
								<Route path={PATH.learnPage} element={<LearnPage/>}/>
						</Route>
				</Routes>
		)
}