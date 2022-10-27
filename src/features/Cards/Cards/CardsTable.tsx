import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/store';
import {setCardsSearchParams} from 'features/Cards/cards-reducer';
import {getCards, getCardsSearchParams, getCardsTotalCount, getPackOwnerId} from 'features/Cards/selectors';
import {getAuthUserId} from 'features/Profile/selectors';
import {MappedCard} from 'features/Cards/Cards/MappedCard';

export const CardsTable = () => {
		const dispatch = useAppDispatch()
		const cardsTotalCount = useAppSelector(getCardsTotalCount)
		const {pageCount, page} = useAppSelector(getCardsSearchParams)
		const authUserId = useAppSelector(getAuthUserId)
		const cards = useAppSelector(getCards)
		const packOwnerId = useAppSelector(getPackOwnerId)
		const isOwner = authUserId === packOwnerId

		const onPageChange = (event: unknown, newPage: number) => {
				dispatch(setCardsSearchParams({page: newPage + 1}))
		}
		const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
				dispatch(setCardsSearchParams({pageCount: +event.target.value, page: 1}))
		}
		return (
				<TableContainer component={Paper} sx={{margin: '25px 0'}}>
						<Table sx={{minWidth: 650}}>
								<TableHead sx={{backgroundColor: '#EFEFEF'}}>
										<TableRow>
												<TableCell sx={{width: '33%'}}>Question</TableCell>
												<TableCell sx={{width: '33%'}}>Answer</TableCell>
												<TableCell>Last updated</TableCell>
												<TableCell>Grade</TableCell>
												{isOwner && <TableCell>Actions</TableCell>}
										</TableRow>
								</TableHead>

								<TableBody>

										{cards.map(card => <MappedCard isOwner={isOwner} card={card}/>)}

										{!!cardsTotalCount && <TableRow>
												<TablePagination labelRowsPerPage="Cards per page"
												                 rowsPerPageOptions={[5, 10, 25, 50, 100]}
												                 count={cardsTotalCount}
												                 rowsPerPage={pageCount}
												                 page={page - 1}
												                 onPageChange={onPageChange}
												                 onRowsPerPageChange={onRowsPerPageChange}
												/>
										</TableRow>
										}
								</TableBody>
						</Table>
						{cardsTotalCount === 0 &&
								<div style={{textAlign: 'center', color: 'gray', fontSize: '30px'}}>
										No results, try to use other
										params</div>
						}
				</TableContainer>
		)
}
