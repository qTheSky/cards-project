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
import {useAppSelector} from 'app/store';
import {DeleteCardModal} from 'features/Cards/CardsModals/DeleteCardModal';
import {EditCardModal} from 'features/Cards/CardsModals/EditCardModal';
import {useParams} from 'react-router-dom';

interface IProps {
}

export const CardsTable = ({}: IProps) => {
		const {packId} = useParams() as {packId:string}
		const cardsTotalCount = useAppSelector(state => state.cards.cardsState.cardsTotalCount)
		const rowsPerPage = useAppSelector(state => state.cards.searchParams.pageCount)
		const currentPage = useAppSelector(state => state.cards.searchParams.page)
		const authUserId = useAppSelector(state=>state.profile.profile._id)
		const cards = useAppSelector(state=>state.cards.cardsState.cards)
		const packOwnerId = useAppSelector(state=>state.cards.cardsState.packUserId)
		const isOwner = authUserId === packOwnerId



		return (
						<TableContainer component={Paper} sx={{margin: '25px 0'}}>
								<Table sx={{minWidth: 650}} aria-label="simple table">
										<TableHead sx={{backgroundColor: '#EFEFEF'}}>
												<TableRow>
														<TableCell sx={{width: '30%'}}>Question</TableCell>
														<TableCell sx={{width: '30%'}}>Answer</TableCell>
														<TableCell>Last updated</TableCell>
														<TableCell>Grade</TableCell>
														{isOwner && <TableCell>Actions</TableCell>}
												</TableRow>
										</TableHead>

										<TableBody>
												{cards.map(card => (
														<TableRow key={card._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
																<TableCell>{card.question}</TableCell>
																<TableCell>{card.answer}</TableCell>
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
																		</TableCell>}

														</TableRow>
												))}
												{cards.length > 0 &&
														<TableRow>
																<TablePagination labelRowsPerPage="Cards per page"
																                 rowsPerPageOptions={[5, 10, 25, 50, 100]}
																                 count={cardsTotalCount}
																                 rowsPerPage={rowsPerPage}
																                 page={currentPage - 1}
																                 onPageChange={() => {
																                 }}
																                 onRowsPerPageChange={() => {
																                 }}
																/>
														</TableRow>
												}
										</TableBody>
								</Table>
						</TableContainer>
		);
};
