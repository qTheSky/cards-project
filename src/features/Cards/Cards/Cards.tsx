import React, {ChangeEvent, useEffect, useState} from 'react';
import {CardsTable} from 'features/Cards/Cards/CardsTable';
import {useAppDispatch, useAppSelector} from 'app/store';
import {Link, useParams} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {useDebounce} from 'common/hooks/useDebounce';
import {setCardsSearchParams} from 'features/Cards/cards-reducer';
import {PackOwnerMenu} from 'features/Cards/Cards/PackOwnerMenu';
import {PATH} from 'app/RouteVariables';
import {AddCardModal} from '../CardsModals/AddCardModal';
import {getCardsSearchParams, getPackName, getPackOwnerId} from 'features/Cards/selectors';
import {getAuthUserId} from 'features/Profile/selectors';


interface IProps {
		switchIsSearching: (isSearching: boolean) => void
}

export const Cards = ({switchIsSearching}: IProps) => {
		const dispatch = useAppDispatch()
		const {packId} = useParams() as { packId: string }
		const packName = useAppSelector(getPackName)
		const authUserId = useAppSelector(getAuthUserId)
		const packOwnerId = useAppSelector(getPackOwnerId)
		const packDeckCover = useAppSelector(state => state.cards.cardsState.packDeckCover)
		const {cardQuestion} = useAppSelector(getCardsSearchParams)
		const isOwner = authUserId === packOwnerId

		const [searchByQuestion, setSearchByQuestion] = useState<string>('')
		const debouncedValue = useDebounce<string>(searchByQuestion, 500)

		const handleChangeSearchByQuestion = (event: ChangeEvent<HTMLInputElement>) => {
				setSearchByQuestion(event.currentTarget.value)
		}

		useEffect(() => {
				return () => {
						dispatch(setCardsSearchParams({cardQuestion: ''}))
						switchIsSearching(false)
				}
		}, [])

		useEffect(() => {
				if (searchByQuestion !== cardQuestion) {
						switchIsSearching(true)
						dispatch(setCardsSearchParams({cardQuestion: searchByQuestion}))
				}
				if (debouncedValue === '') {
						switchIsSearching(false)
				}
		}, [debouncedValue])
		return (
				<>
						<div style={{display: 'flex', justifyContent: 'space-between', margin: '30px 0'}}>
								<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
										<h1>{packName}</h1>
										{isOwner && <PackOwnerMenu/>}
								</div>
								{isOwner
										? <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
												<Link to={PATH.learn + packId}>
														<Button color="success" variant="contained">
																Learn to pack
														</Button>
												</Link>
												<AddCardModal/>
										</div>
										: <Link to={PATH.learn + packId}><Button variant="contained">Learn to pack</Button></Link>
								}
						</div>
						{packDeckCover &&
								<img style={{width: '170px', height: '107px', margin: '30px 0'}} src={packDeckCover} alt="deck cover"/>
						}

						<TextField value={searchByQuestion}
						           onChange={handleChangeSearchByQuestion}
						           label="Search by question"
						           size="small" fullWidth/>
						<CardsTable/>
				</>
		);
};
