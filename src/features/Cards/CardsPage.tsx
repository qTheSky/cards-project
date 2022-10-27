import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {Container} from '@mui/material';
import {BackToPackListLink} from 'common/components/BackToPackListArrow/BackToPackListLink';
import {useAppDispatch, useAppSelector} from 'app/store';
import {fetchCards, resetCardsState} from 'features/Cards/cards-reducer';
import {EmptyCards} from 'features/Cards/Cards/EmptyCards';
import {Cards} from 'features/Cards/Cards/Cards';
import {PATH} from 'app/RouteVariables';
import {getCardsSearchParams, getCardsTotalCount, getPackName} from 'features/Cards/selectors';
import {getIsLoggedIn} from 'features/Auth/selectors';
import {getIsAppAppMakingRequest} from 'app/selectors';

export const CardsPage = () => {
		const {packId} = useParams() as { packId: string }
		const dispatch = useAppDispatch()
		const cardsTotalCount = useAppSelector(getCardsTotalCount)
		const isLoggedIn = useAppSelector(getIsLoggedIn)
		const {page, pageCount, cardQuestion} = useAppSelector(getCardsSearchParams)
		const packName = useAppSelector(getPackName)
		const isAppMakeRequest = useAppSelector(getIsAppAppMakingRequest)
		const [isSearching, setIsSearching] = useState(false)

		useEffect(() => {
				if (!isLoggedIn) {
						return
				}
				dispatch(fetchCards(packId))
		}, [cardQuestion, packId, pageCount, page])

		useEffect(() => {
				return () => {
						dispatch(resetCardsState())
				}
		}, [])

		if (!isLoggedIn) return <Navigate to={PATH.login}/>
		if (!packName) return <Container><BackToPackListLink/></Container>
		return (
				<div>
						<Container>
								<BackToPackListLink/>
								{cardsTotalCount > 0 || isSearching || isAppMakeRequest
										? <Cards switchIsSearching={setIsSearching}/>
										: <EmptyCards/>}
						</Container>
				</div>
		)
}
