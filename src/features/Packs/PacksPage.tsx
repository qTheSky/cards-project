import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {Container} from '@mui/material';
import {fetchPacks} from 'features/Packs/packs-reducer';
import {PacksTable} from 'features/Packs/Packs/PacksTable';
import {PackFiltration} from 'features/Packs/Packs/PackFiltration/PackFiltration';
import {AddPackModal} from 'features/Packs/PacksModals/AddPackModal';
import {getPacksSearchParams} from 'features/Packs/selectors';
import {getIsLoggedIn} from 'features/Auth/selectors';

export const PacksPage = () => {
		const dispatch = useAppDispatch()
		const isLoggedIn = useAppSelector(getIsLoggedIn)
		const {page, packName, pageCount, sortPacks, max, min, user_id} = useAppSelector(getPacksSearchParams)


		useEffect(() => {
				if (!isLoggedIn) {
						return
				}
				dispatch(fetchPacks())
		}, [page, packName, pageCount, sortPacks, user_id, min, max])


		if (!isLoggedIn) return <Navigate to={PATH.login}/>
		return (
				<div>
						<Container>
								<div
										style={{display: 'flex', justifyContent: 'space-between', marginTop: '25px', marginBottom: '25px'}}>
										<h1>Packs list</h1>
										<AddPackModal/>
								</div>
								<PackFiltration/>
								<PacksTable/>
						</Container>
				</div>
		);
};
