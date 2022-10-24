import React, {ChangeEvent, useState} from 'react';
import s from './Profile.module.scss'
import noAva from './../../../assets/noAva.png'
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {logout} from 'features/Auth/auth-reducer';
import {Button, Container, IconButton} from '@mui/material';
import {updateProfile} from 'features/Profile/profile-reducer';
import {EditableText} from 'common/components/EditableText/EditableText';
import {BackToPackListLink} from 'common/components/BackToPackListArrow/BackToPackListLink';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {convertFileToBase64} from 'utils/convertFileToBase64';
import {getAuthUserProfile} from 'features/Profile/selectors';
import {getIsLoggedIn} from 'features/Auth/selectors';

export const Profile = () => {
		const dispatch = useAppDispatch()
		const {name, email, avatar} = useAppSelector(getAuthUserProfile)
		const isLoggedIn = useAppSelector(getIsLoggedIn)
		const [ava, setAva] = useState(avatar)

		const uploadAvaHandler = async (e: ChangeEvent<HTMLInputElement>) => {
				if (e.target.files && e.target.files.length) {
						const file = e.target.files[0]
						if (file.size < 4000000) {
								convertFileToBase64(file, async (file64: string) => {
										await dispatch(updateProfile({avatar: file64}))
										setAva(file64)
								})
						} else {
								alert('Error: Файл слишком большого размера')
						}
				}
		}

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
												<div style={{position: 'relative'}}>
														<img className={s.profileAvatar} src={ava || noAva} alt="avatar"/>
														<IconButton component="label">
																<CloudUploadOutlinedIcon/>
																<input onChange={uploadAvaHandler} hidden accept="image/*" multiple type="file"/>
														</IconButton>
												</div>
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
