import React, {ChangeEvent, useEffect, useState} from 'react';
import {CardsTable} from 'features/Cards/CardsTable';
import {useAppDispatch, useAppSelector} from 'app/store';
import {AddCardModal} from 'features/Modals/CardsModals/AddCardModal';
import {useParams} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {useDebounce} from 'common/hooks/useDebounce';
import {setCardsSearchParams} from 'features/Cards/cards-reducer';

export const Cards = () => {
		const dispatch = useAppDispatch()
		const {packId} = useParams() as { packId: string }
		const packName = useAppSelector(state => state.cards.cardsState.packName)
		const authUserId = useAppSelector(state => state.profile.profile._id)
		const packOwnerId = useAppSelector(state => state.cards.cardsState.packUserId)
		const isOwner = authUserId === packOwnerId

		const [searchByQuestion, setSearchByQuestion] = useState<string>('')
		const debouncedValue = useDebounce<string>(searchByQuestion, 500)

		const handleChangeSearchByQuestion = (event: ChangeEvent<HTMLInputElement>) => {
				setSearchByQuestion(event.currentTarget.value)
		}

		useEffect(() => {
				return () => {
						dispatch(setCardsSearchParams({cardQuestion: ''}))
				}
		}, [])

		useEffect(() => {
				dispatch(setCardsSearchParams({cardQuestion: searchByQuestion}))
		}, [debouncedValue])
		return (
				<>
						<div style={{display: 'flex', justifyContent: 'space-between', margin: '30px 0'}}>
								<h1>{packName}</h1>
								{isOwner ? <AddCardModal packId={packId}/> : <Button variant="contained">Learn to pack</Button>}
						</div>
						<TextField value={searchByQuestion} onChange={handleChangeSearchByQuestion} label="Search by question"
						           size="small" fullWidth/>
						<CardsTable/>
				</>
		);
};
