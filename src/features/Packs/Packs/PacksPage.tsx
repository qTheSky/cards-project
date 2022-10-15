import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {
		Button,
		Container,
		Paper,
		Table,
		TableBody,
		TableCell,
		TableContainer,
		TableHead,
		TableRow
} from '@mui/material';
import {fetchPacks} from 'features/Packs/packs-reducer';

export const PacksPage = () => {
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
		const packs = useAppSelector(state => state.packs.packsState.cardPacks)
		const dispatch = useAppDispatch()
		useEffect(() => {
				dispatch(fetchPacks())
		}, [])
		if (!isLoggedIn) return <Navigate to={PATH.login}/>
		return (
				<div>
						<Container>
								<div style={{display: 'flex', justifyContent: 'space-between'}}>
										<h1>Packs list</h1>
										<Button variant="contained">Add new pack</Button>
								</div>
								<div>SEARCH</div>

								<TableContainer component={Paper}>
										<Table sx={{minWidth: 650}} aria-label="simple table">

												<TableHead sx={{backgroundColor: '#EFEFEF'}}>
														<TableRow>
																<TableCell>Name</TableCell>
																<TableCell>Cards</TableCell>
																<TableCell>Last updated</TableCell>
																<TableCell>Created by</TableCell>
																<TableCell>Actions</TableCell>
														</TableRow>
												</TableHead>

												<TableBody>
														{packs.map(pack => (
																<TableRow key={pack._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
																		<TableCell>{pack.name}</TableCell>
																		<TableCell>{pack.cardsCount}</TableCell>
																		<TableCell>{String(pack.updated)}</TableCell>
																		<TableCell>{pack.user_name}</TableCell>
																		<TableCell>images</TableCell>
																</TableRow>
														))}
												</TableBody>
										</Table>
								</TableContainer>

						</Container>
				</div>
		);
};
