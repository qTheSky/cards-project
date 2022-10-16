import React from 'react';
import {
		Paper, Rating,
		Table,
		TableBody,
		TableCell,
		TableContainer,
		TableHead,
		TablePagination,
		TableRow, TextField
} from '@mui/material';
import dayjs from 'dayjs';
import {CardType} from 'api/cardsApi';
import {useAppSelector} from 'app/store';

interface IProps {
		cards: CardType[]
}

export const CardsTable = ({cards}: IProps) => {
		const cardsTotalCount = useAppSelector(state => state.cards.cardsState.cardsTotalCount)
		const rowsPerPage = useAppSelector(state => state.cards.searchParams.pageCount)
		const currentPage = useAppSelector(state => state.cards.searchParams.page)
		return (
				<>
						<TextField fullWidth size="small" label="Search by question"/>
						<TableContainer component={Paper} sx={{margin: '25px 0'}}>
								<Table sx={{minWidth: 650}} aria-label="simple table">

										<TableHead sx={{backgroundColor: '#EFEFEF'}}>
												<TableRow>
														<TableCell sx={{width: '30%'}}>Question</TableCell>
														<TableCell sx={{width: '30%'}}>Answer</TableCell>
														<TableCell sx={{width: '20%'}}>Last updated</TableCell>
														<TableCell sx={{width: '20%'}}>Grade</TableCell>
												</TableRow>
										</TableHead>

										<TableBody>
												{cards.map(card => (
														<TableRow key={card._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
																<TableCell>{card.question}</TableCell>
																<TableCell>{card.answer}</TableCell>
																<TableCell>{dayjs(card.updated).format('DD.MM.YYYY')}</TableCell>
																<TableCell><Rating value={card.grade} readOnly/></TableCell>
														</TableRow>
												))}
												{cards.length > 0 &&
														<TableRow>
																<TablePagination
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
				</>
		);
};