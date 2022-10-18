import React, {useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {Container} from '@mui/material';
import {BackToPackListLink} from 'common/components/BackToPackListArrow/BackToPackListLink';
import {useAppDispatch, useAppSelector} from 'app/store';
import {fetchCards} from 'features/Cards/cards-reducer';
import {EmptyCards} from 'features/Cards/EmptyCards';
import {Cards} from 'features/Cards/Cards';
import {PATH} from 'app/RouteVariables';

export const CardsPage = () => {
		const {packId} = useParams() as { packId: string }
		const dispatch = useAppDispatch()
		const cardsTotalCount = useAppSelector(state => state.cards.cardsState.cardsTotalCount)
		const searchedQuestion = useAppSelector(state => state.cards.searchParams.cardQuestion)
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

		useEffect(() => {
				if (!isLoggedIn) {
						return
				}
				dispatch(fetchCards(packId))
		}, [searchedQuestion,packId])

		if (!isLoggedIn) return <Navigate to={PATH.login}/>
		return (
				<div>
						<Container>
								<BackToPackListLink/>
								{cardsTotalCount > 0 || searchedQuestion ? <Cards/> : <EmptyCards/>}
						</Container>
				</div>
		)
}
