import React, {useEffect, useState} from 'react';
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
import {TableHeaderItem} from 'features/Packs/Packs/TableHeaderItem';
import {EditPackModal} from 'features/Packs/PacksModals/EditPackModal';
import {getMaxCardsCountFromState, getPacks, getPacksSearchParams, getPackTotalCount} from 'features/Packs/selectors';
import {isAppAppMakingRequest} from 'app/selectors';
import {getAuthUserId} from 'features/Profile/selectors';
import {PacksTableSkeleton} from 'features/Packs/Packs/PacksTableSkeleton/PacksTableSkeleton';

export const PacksTable = () => {
		const dispatch = useAppDispatch()
		const isAppMakingRequest = useAppSelector(isAppAppMakingRequest)
		const packs = useAppSelector(getPacks)
		const packTotalCount = useAppSelector(getPackTotalCount)
		const authUserId = useAppSelector(getAuthUserId)
		const {pageCount, page} = useAppSelector(getPacksSearchParams)
		const maxCardsCount = useAppSelector(getMaxCardsCountFromState)
		const [first, setFirst] = useState(true)


		const onPageChange = (event: unknown, newPage: number) => {
				dispatch(setPackSearchParams({page: newPage + 1}))
		}

		const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
				dispatch(setPackSearchParams({pageCount: +event.target.value, page: 1}))
		}

		useEffect(() => {
				if (first && maxCardsCount) {
						setFirst(false)
				}
		}, [maxCardsCount])
		return (
				<TableContainer component={Paper} sx={{margin: '25px 0'}}>
						<Table sx={{minWidth: 650}} aria-label="simple table">

								<TableHead sx={{backgroundColor: '#EFEFEF'}}>
										<TableRow>
												<TableHeaderItem width="45%" name="Name" sortName="name"/>
												<TableHeaderItem width="10%" name="Cards" sortName="cardsCount"/>
												<TableHeaderItem width="15%" name="Last updated" sortName="updated"/>
												<TableHeaderItem width="15%" name="Created by" sortName="created"/>
												<TableCell align="center" sx={{width: '15%'}}>Actions</TableCell>
										</TableRow>
								</TableHead>

								{first
										? <PacksTableSkeleton/>
										: <TableBody>
												{packs.map(pack => (
														<TableRow key={pack._id}>
																<TableCell>
																		<Link style={{
																				display: 'flex',
																				alignItems: 'center',
																				gap: '15px',
																				width: 'max-content',
																				cursor: 'pointer',
																		}} to={PATH.pack + pack._id}>
																				{pack.deckCover &&
																						<img style={{width: '60px', height: '40px', borderRadius: '4px'}}
																						     src={pack.deckCover} alt="deckCover"/>
																				}
																				<span>{pack.name}</span>
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
																		               deckCover={pack.deckCover}
																		               isPrivatePack={pack.private}
																		               view="packs"
																		               packId={pack._id}
																		               disabled={pack.user_id !== authUserId}/>
																		<DeletePackModal packId={pack._id}
																		                 packName={pack.name}
																		                 view="packs"
																		                 disabled={pack.user_id !== authUserId}
																		/>
																</TableCell>
														</TableRow>
												))}
												{packTotalCount > 0 &&
														<TableRow>
																<TablePagination rowsPerPageOptions={[5, 10, 25, 50, 100]}
																                 count={packTotalCount}
																                 rowsPerPage={pageCount}
																                 page={page - 1}
																                 onPageChange={onPageChange}
																                 onRowsPerPageChange={onRowsPerPageChange}
																                 labelRowsPerPage="Packs per page"
																/>
														</TableRow>
												}
										</TableBody>
								}
						</Table>
						{packTotalCount === 0 && !isAppMakingRequest &&
								<div style={{textAlign: 'center', color: 'gray', fontSize: '30px'}}>No results, try to use other
										params</div>}
				</TableContainer>
		);
};
