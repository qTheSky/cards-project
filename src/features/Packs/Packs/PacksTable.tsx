import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';
import {setPackSearchParams} from '../packs-reducer';
import {useAppDispatch, useAppSelector} from 'app/store';
import {TableHeaderItem} from 'features/Packs/Packs/TableHeaderItem';
import {getMaxCardsCountFromState, getPacks, getPacksSearchParams, getPackTotalCount} from 'features/Packs/selectors';
import {getIsAppAppMakingRequest} from 'app/selectors';
import {PacksTableSkeleton} from 'features/Packs/Packs/PacksTableSkeleton/PacksTableSkeleton';
import {MappedPack} from 'features/Packs/Packs/MappedPack';

export const PacksTable = () => {
		const dispatch = useAppDispatch()
		const isAppMakingRequest = useAppSelector(getIsAppAppMakingRequest)
		const packs = useAppSelector(getPacks)
		const packTotalCount = useAppSelector(getPackTotalCount)
		const {pageCount, page} = useAppSelector(getPacksSearchParams)
		const maxCardsCount = useAppSelector(getMaxCardsCountFromState)
		const [firstLoading, setFirstLoading] = useState(true)


		const onPageChange = (event: unknown, newPage: number) => {
				dispatch(setPackSearchParams({page: newPage + 1}))
		}

		const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
				dispatch(setPackSearchParams({pageCount: +event.target.value, page: 1}))
		}

		useEffect(() => {
				if (firstLoading && maxCardsCount) {
						setFirstLoading(false)
				}
		}, [maxCardsCount])
		return (
				<TableContainer component={Paper} sx={{margin: '25px 0'}}>
						<Table sx={{minWidth: 650}} aria-label="simple table">

								<TableHead sx={{backgroundColor: '#EFEFEF'}}>
										<TableRow>
												<TableHeaderItem width="40%" name="Name" sortName="name"/>
												<TableHeaderItem width="10%" name="Cards" sortName="cardsCount"/>
												<TableHeaderItem width="20%" name="Last updated" sortName="updated"/>
												<TableHeaderItem width="15%" name="Created by" sortName="created"/>
												<TableCell sx={{width: '15%'}}>Actions</TableCell>
										</TableRow>
								</TableHead>

								{firstLoading
										? <PacksTableSkeleton/>
										: <TableBody>

												{packs.map(pack => <MappedPack pack={pack}/>)}

												{!!packTotalCount &&
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
		)
}
