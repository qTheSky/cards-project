import React from 'react';
import s from './Header.module.scss'
import {useAppSelector} from 'app/store';
import {Button, Container, LinearProgress} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import logo from 'assets/logo.svg'

export const Header = () => {
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
		const isRequestSending = useAppSelector(state=>state.app.isLoading)
		const {pathname} = useLocation()
		return (
				<>
						<header className={s.header}>
								<Container>
										<div className={s.logoAndButton}>
												<Link to={PATH.main}>
														<img src={logo} alt="it-inc-logo"/>
												</Link>
												{
														isLoggedIn
																? <Link to={PATH.profile}>profile</Link>
																: pathname !== PATH.login &&
																<Link to={PATH.login}>
																		<Button variant="contained" size="small">Sign In</Button>
																</Link>
												}
										</div>
								</Container>
						</header>
						{isRequestSending && <LinearProgress/>}
				</>
		);
};
