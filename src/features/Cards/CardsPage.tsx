import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {Container} from '@mui/material';
import {BackToPackListLink} from 'common/components/BackToPackListArrow/BackToPackListLink';
import {useAppDispatch, useAppSelector} from 'app/store';
import {fetchCards} from 'features/Cards/cards-reducer';
import {EmptyCards} from 'features/Cards/Cards/EmptyCards';
import {Cards} from 'features/Cards/Cards/Cards';
import {PATH} from 'app/RouteVariables';

export const CardsPage = () => {
		const {packId} = useParams() as { packId: string }
		const dispatch = useAppDispatch()
		const cardsTotalCount = useAppSelector(state => state.cards.cardsState.cardsTotalCount)
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
		const {page, pageCount, cardQuestion} = useAppSelector(state => state.cards.searchParams)
		const [isSearching, setIsSearching] = useState(false)

		useEffect(() => {
				if (!isLoggedIn) {
						return
				}
				dispatch(fetchCards(packId))
		}, [cardQuestion, packId, pageCount, page])

		if (!isLoggedIn) return <Navigate to={PATH.login}/>
		return (
				<div>
						<Container>
								<BackToPackListLink/>
								{cardsTotalCount > 0 || isSearching
										? <Cards switchIsSearching={setIsSearching}/>
										: <EmptyCards/>}
						</Container>
				</div>
		)
}
