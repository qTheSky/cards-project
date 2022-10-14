import React from 'react';
import s from './Profile.module.scss'
import noAva from './../../../assets/noAva.png'
import {useAppDispatch, useAppSelector} from 'app/store';
import {Link, Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {logout} from 'features/Auth/auth-reducer';
import {Button, Container} from '@mui/material';
import {updateProfile} from "../profile-reducer";

export const Profile = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.profile.profile.email)
    const name = useAppSelector(state => state.profile.profile.name)
    const ava = useAppSelector(state => state.profile.profile.avatar)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const onLogoutClick = () => {
        dispatch(logout())
    }
    const onDoubleClickHandle = () => {
        dispatch(updateProfile({name: 'Михаил'}))
    }
    if (!isLoggedIn) return <Navigate to={PATH.login}/>
    return (
        <div>
            <Container>
                <Link to={PATH.main}>
                    ARROW back to Packs List
                </Link>
                <div>
                    <div className={s.profileInfoWrapper}>
                        <h1>Personal Information</h1>
                        <img style={{width: '96px', height: '96px', borderRadius: '50%'}} src={ava || noAva}
                             alt="no ava"/>
                        <div onDoubleClick={onDoubleClickHandle}>{name}</div>
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
