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
import {PackType} from 'api/packsApi';
import SchoolIcon from '@mui/icons-material/School';
import {Link} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {DeletePackModal} from 'features/Modals/DeletePackModal';
import {EditPackModal} from 'features/Modals/EditPackModal';

interface IProps {
		packs: PackType[]
		packTotalCount: number
		rowsPerPage: number
		currentPage: number
}

export const PacksTable = ({packs, packTotalCount, rowsPerPage, currentPage}: IProps) => {
		const dispatch = useAppDispatch()
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
														<TableCell>
                                <span style={{display: 'flex', gap: '0px', justifyContent: 'flex-start'}}>
		                                <IconButton disabled={pack.cardsCount === 0}>
				                                <SchoolIcon/>
																		</IconButton>
		                                <EditPackModal packName={pack.name} isPrivatePack={pack.private} id={pack._id}
		                                               disabled={pack.user_id !== authUserId}/>
		                               <DeletePackModal packId={pack._id} packName={pack.name}
		                                                disabled={pack.user_id !== authUserId}/>
                                </span>
														</TableCell>
												</TableRow>
										))}
										{packs.length > 0 &&
												<TableRow>
														<TablePagination
																rowsPerPageOptions={[5, 10, 25, 50, 100]}
																count={packTotalCount}
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
