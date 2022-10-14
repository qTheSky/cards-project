import React from 'react';
import {Container} from 'components/common/Container';
import s from './Profile.module.scss'
import noAva from './../../../assets/noAva.png'
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {logout} from 'features/Auth/auth-reducer';

export const Profile = () => {
		const dispatch = useAppDispatch()
		const email = useAppSelector(state => state.profile.profile.email)
		const name = useAppSelector(state => state.profile.profile.name)
		const ava = useAppSelector(state => state.profile.profile.avatar)
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

		const onLogoutClick = () => {
				dispatch(logout())
		}
		if (!isLoggedIn) return <Navigate to={PATH.login}/>
		return (
				<div className={s.profilePage}>
						<Container>
								<div>
										ARROW back to Packs List
								</div>
								<div>
										<div>
												<h1>Personal Information</h1>
												<img src={ava || noAva} alt="no ava"/>
												<div>{name}</div>
												<div>{email}</div>
												<button onClick={onLogoutClick}>Log out</button>
										</div>
								</div>
						</Container>
				</div>
		);
};
