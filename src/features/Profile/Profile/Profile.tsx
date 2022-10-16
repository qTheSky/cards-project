import React from 'react';
import s from './Profile.module.scss'
import noAva from './../../../assets/noAva.png'
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {logout} from 'features/Auth/auth-reducer';
import {Button, Container} from '@mui/material';
import {updateProfile} from 'features/Profile/profile-reducer';
import {EditableText} from 'common/components/EditableText/EditableText';
import {BackToPackListLink} from 'common/components/BackToPackListArrow/BackToPackListLink';

export const Profile = () => {
		const dispatch = useAppDispatch()
		const email = useAppSelector(state => state.profile.profile.email)
		const name = useAppSelector(state => state.profile.profile.name)
		const ava = useAppSelector(state => state.profile.profile.avatar)
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

		const onLogoutClick = () => {
				dispatch(logout())
		}
		const changeNameHandle = (name: string) => {
				dispatch(updateProfile({name}))
		}

		if (!isLoggedIn) return <Navigate to={PATH.login}/>
		return (
				<div>
						<Container>
								<BackToPackListLink/>
								<div>
										<div className={s.profileInfoWrapper}>
												<h1>Personal Information</h1>
												<img className={s.profileAvatar} src={ava || noAva} alt="avatar"/>
												<EditableText callBack={changeNameHandle} value={name}/>
												<h2>{email}</h2>
												<Button sx={{borderRadius: '20px'}} variant="outlined" color="info"
												        onClick={onLogoutClick}>Log
														out</Button>
										</div>
								</div>
						</Container>
				</div>
		);
};
