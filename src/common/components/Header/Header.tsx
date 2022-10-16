import React from 'react';
import s from 'common/components/Header/Header.module.scss'
import {useAppSelector} from 'app/store';
import {Button, Container, LinearProgress} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import logo from 'assets/logo.svg'
import noAvatar from 'assets/noAva.png'

export const Header = () => {
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
		const isRequestSending = useAppSelector(state => state.app.isLoading)
		const userName = useAppSelector(state => state.profile.profile.name)
		const userAvatar = useAppSelector(state => state.profile.profile.avatar)
		const {pathname} = useLocation()
		return (
				<>
						<header className={s.header} style={{position: 'relative'}}>
								<Container>
										<div className={s.logoAndButton}>
												<Link to={PATH.main}>
														<img src={logo} alt="it-inc-logo"/>
												</Link>
												{isLoggedIn
														? pathname !== PATH.profile &&
														<Link to={PATH.profile}>
																<div className={s.profile}>
																		<h2>{userName}</h2>
																		<img style={{width: '36px', height: '36px', borderRadius: '50%'}}
																		     src={userAvatar || noAvatar}
																		     alt="ava"/>
																</div>
														</Link>
														: pathname !== PATH.login &&
														<Link to={PATH.login}>
																<Button variant="contained" size="small">Sign In</Button>
														</Link>
												}
										</div>
								</Container>
								{isRequestSending && pathname !== PATH.main &&
										<div style={{position: 'absolute', bottom: '0', width: '100%'}}><LinearProgress/></div>}
						</header>
				</>
		);
};
