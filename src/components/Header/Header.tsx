import React from 'react';
import s from './Header.module.scss'
import {Container} from 'components/common/Container';
import {useAppSelector} from 'app/store';
import {Button} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';

export const Header = () => {
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
		const {pathname} = useLocation()
		return (
				<header className={s.header}>
						<Container>
								<div className={s.logoAndButton}>
										<img src="" alt="it-inc-logo"/>
										{
												isLoggedIn
														? <div>profile</div>
														: pathname !== PATH.login &&
														<Link to={PATH.login}>
																<Button variant="contained" size="small">Sign In</Button>
														</Link>
										}
								</div>
						</Container>
				</header>
		);
};
