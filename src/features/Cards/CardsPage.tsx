import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Container} from '@mui/material';
import {BackToPackListLink} from 'common/components/BackToPackListArrow/BackToPackListLink';
import {useAppDispatch, useAppSelector} from 'app/store';
import {fetchCards} from 'features/Cards/cards-reducer';
import {CardsTable} from 'features/Cards/CardsTable';

export const CardsPage = () => {
		const {id} = useParams() as { id: string }
		const dispatch = useAppDispatch()
		const authUserId = useAppSelector(state => state.profile.profile._id)
		const cards = useAppSelector(state => state.cards.cardsState.cards)
		const packName = useAppSelector(state => state.cards.cardsState.packName)
		const packOwnerId = useAppSelector(state => state.cards.cardsState.packUserId)
		const isOwner = authUserId === packOwnerId
		useEffect(() => {
				dispatch(fetchCards(id))
		}, [])
		return (
				<div>
						<Container>
								<BackToPackListLink/>
								<div style={{display: 'flex', justifyContent: 'space-between', margin: '25px 0'}}>
										<h1>{packName}</h1>
										{cards.length > 0 && <Button variant="contained">Learn to pack</Button>}
								</div>
								{cards.length > 0
										? <CardsTable cards={cards}/>
										: <div style={{textAlign: 'center'}}>
												<h2>This pack is empty.{isOwner && 'Click add new card to fill this pack'}</h2>
												{isOwner && <Button variant="contained">Add new card</Button>}
										</div>
								}
						</Container>
				</div>
		);
};