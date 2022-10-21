import React from 'react';
import {
		Paper,
		Rating,
		Table,
		TableBody,
		TableCell,
		TableContainer,
		TableHead,
		TablePagination,
		TableRow
} from '@mui/material';
import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector} from 'app/store';
import {DeleteCardModal} from 'features/Cards/CardsModals/DeleteCardModal';
import {EditCardModal} from 'features/Cards/CardsModals/EditCardModal';
import {useParams} from 'react-router-dom';
import {setCardsSearchParams} from 'features/Cards/cards-reducer';

export const CardsTable = () => {
		const {packId} = useParams() as { packId: string }
		const dispatch = useAppDispatch()
		const cardsTotalCount = useAppSelector(state => state.cards.cardsState.cardsTotalCount)
		const rowsPerPage = useAppSelector(state => state.cards.searchParams.pageCount)
		const currentPage = useAppSelector(state => state.cards.searchParams.page)
		const authUserId = useAppSelector(state => state.profile.profile._id)
		const cards = useAppSelector(state => state.cards.cardsState.cards)
		const packOwnerId = useAppSelector(state => state.cards.cardsState.packUserId)
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
										{cards.map(card => (
												<TableRow key={card._id} sx={{verticalAlign: 'top'}}>
														<TableCell>
																<div>
																		{card.question !== 'no question' && <span>{card.question}</span>}
																		{card.questionImg &&
																				<img style={{width: '150px', height: '36px'}}
																				     src={card.questionImg}
																				     alt="questionImg"/>}
																</div>
														</TableCell>
														<TableCell>
																<div>
																		{card.answer !== 'no answer' && <span>{card.answer}</span>}
																		{card.answerImg &&
																				<img style={{width: '150px', height: '36px'}}
																				     src={card.answerImg}
																				     alt="answerImg"/>}
																</div>
														</TableCell>
														<TableCell>{dayjs(card.updated).format('DD.MM.YYYY')}</TableCell>
														<TableCell><Rating value={card.grade} readOnly/></TableCell>
														{isOwner &&
																<TableCell sx={{display: 'flex'}}>
																		<EditCardModal cardId={card._id}
																		               answer={card.answer}
																		               question={card.question}
																		               packId={card.cardsPack_id}
																		/>
																		<DeleteCardModal packId={packId} cardId={card._id}
																		                 cardName={card.answer}/>
																</TableCell>
														}
												</TableRow>
										))}
										{cards.length > 0 &&
												<TableRow>
														<TablePagination labelRowsPerPage="Cards per page"
														                 rowsPerPageOptions={[5, 10, 25, 50, 100]}
														                 count={cardsTotalCount}
														                 rowsPerPage={rowsPerPage}
														                 page={currentPage - 1}
														                 onPageChange={onPageChange}
														                 onRowsPerPageChange={onRowsPerPageChange}
														/>
												</TableRow>
										}
								</TableBody>
						</Table>
				</TableContainer>
		);
};
