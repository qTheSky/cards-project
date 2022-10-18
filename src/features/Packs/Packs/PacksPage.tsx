import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {Container} from '@mui/material';
import {fetchPacks} from 'features/Packs/packs-reducer';
import {PacksTable} from './PacksTable';
import {PackFiltration} from 'features/Packs/Packs/PackFiltration/PackFiltration';
import {AddPackModal} from 'features/Modals/PacksModals/AddPackModal';

export const PacksPage = () => {
		const dispatch = useAppDispatch()
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
		const packs = useAppSelector(state => state.packs.packsState.cardPacks)
		const packTotalCount = useAppSelector(state => state.packs.packsState.cardPacksTotalCount)
		const currentPage = useAppSelector(state => state.packs.searchParams.page)
		const rowsPerPage = useAppSelector(state => state.packs.searchParams.pageCount)
		const userIdFilter = useAppSelector(state => state.packs.searchParams.user_id)
		const packName = useAppSelector(state => state.packs.searchParams.packName)
		const minCardsCount = useAppSelector(state => state.packs.searchParams.min)
		const maxCardsCount = useAppSelector(state => state.packs.searchParams.max)


		useEffect(() => {
				if (!isLoggedIn) {
						return
				}
				dispatch(fetchPacks())
		}, [currentPage, rowsPerPage, userIdFilter, packName, minCardsCount, maxCardsCount])


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
								<PacksTable packs={packs}
								            currentPage={currentPage}
								            packTotalCount={packTotalCount}
								            rowsPerPage={rowsPerPage}/>
						</Container>
				</div>
		);
};
