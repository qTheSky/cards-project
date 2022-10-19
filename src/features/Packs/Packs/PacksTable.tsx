import React from 'react';
import {
		IconButton,
		Paper,
		Table,
		TableBody,
		TableCell,
		TableContainer,
		TableHead,
		TablePagination,
		TableRow
} from '@mui/material';
import dayjs from 'dayjs';
import {setPackSearchParams} from '../packs-reducer';
import {useAppDispatch, useAppSelector} from 'app/store';
import SchoolIcon from '@mui/icons-material/School';
import {Link} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {DeletePackModal} from 'features/Packs/PacksModals/DeletePackModal';
import {EditPackModal} from 'features/Packs/PacksModals/EditPackModal';


export const PacksTable = () => {
		const dispatch = useAppDispatch()
		const packs = useAppSelector(state => state.packs.packsState.cardPacks)
		const packTotalCount = useAppSelector(state => state.packs.packsState.cardPacksTotalCount)
		const currentPage = useAppSelector(state => state.packs.searchParams.page)
		const rowsPerPage = useAppSelector(state => state.packs.searchParams.pageCount)
		const authUserId = useAppSelector(state => state.profile.profile._id)

		const onPageChange = (event: unknown, newPage: number) => {
				dispatch(setPackSearchParams({page: newPage + 1}))
		}

		const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
				dispatch(setPackSearchParams({pageCount: +event.target.value}))
		}

		return (
				<TableContainer component={Paper} sx={{margin: '25px 0'}}>
						<Table sx={{minWidth: 650}} aria-label="simple table">

								<TableHead sx={{backgroundColor: '#EFEFEF'}}>
										<TableRow>
												<TableCell sx={{width: '45%'}}>Name</TableCell>
												<TableCell sx={{width: '10%'}}>Cards</TableCell>
												<TableCell sx={{width: '10%'}}>Last updated</TableCell>
												<TableCell sx={{width: '20%'}}>Created by</TableCell>
												<TableCell align="center" sx={{width: '15%'}}>Actions</TableCell>
										</TableRow>
								</TableHead>

								<TableBody>
										{packs.map(pack => (
												<TableRow key={pack._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
														<TableCell>
																<Link style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}
																      to={PATH.pack + pack._id}>
																		{pack.name}
																</Link>
														</TableCell>
														<TableCell>{pack.cardsCount}</TableCell>
														<TableCell>{dayjs(pack.updated).format('DD.MM.YYYY')}</TableCell>
														<TableCell>{pack.user_name}</TableCell>
														<TableCell sx={{display: 'flex'}}>
																<Link to={PATH.learn + pack._id}>
																		<IconButton disabled={pack.cardsCount === 0}>
																				<SchoolIcon/>
																		</IconButton>
																</Link>
																<EditPackModal packName={pack.name}
																               isPrivatePack={pack.private}
																               id={pack._id}
																               disabled={pack.user_id !== authUserId}/>
																<DeletePackModal packId={pack._id}
																                 packName={pack.name}
																                 disabled={pack.user_id !== authUserId}/>
														</TableCell>
												</TableRow>
										))}
										{packTotalCount > 0 &&
												<TableRow>
														<TablePagination rowsPerPageOptions={[5, 10, 25, 50, 100]}
														                 count={packTotalCount}
														                 rowsPerPage={rowsPerPage}
														                 page={currentPage - 1}
														                 onPageChange={onPageChange}
														                 onRowsPerPageChange={onRowsPerPageChange}
														                 labelRowsPerPage="Packs per page"
														/>
												</TableRow>
										}
								</TableBody>
						</Table>
				</TableContainer>
		);
};
