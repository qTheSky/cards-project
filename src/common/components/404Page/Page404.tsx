import React from 'react';
import {Button, Container} from '@mui/material';
import notFoundImg from 'assets/404.svg'
import {PATH} from 'app/RouteVariables';
import {Link} from 'react-router-dom';
import s from './Page404.module.scss'

export const Page404 = () => {
		return (
				<div>
						<Container>
								<div className={s.block}>
										<div className={s.textAndButton}>
												<h2 className={s.ooops}>Ooops!</h2>
												<h1 className={s.pageNotFoundText}>Sorry! Page not found!</h1>
												<Link to={PATH.main}>
														<Button variant="contained">Back to home page</Button>
												</Link>
										</div>
										<img className={s.image} src={notFoundImg} alt="404"/>
								</div>
						</Container>
				</div>
		);
};
