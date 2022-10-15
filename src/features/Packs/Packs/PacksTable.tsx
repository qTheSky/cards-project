import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import dayjs from "dayjs";
import {setPackSearchParams} from "../packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {PackType} from "../../../api/packsApi";
import studyImg from 'assets/studyAction.svg'
import deleteImg from 'assets/deleteAction.svg'
import editImg from 'assets/editAction.svg'

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
        dispatch(setPackSearchParams({pageCount: event.target.value}))
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">

                <TableHead sx={{backgroundColor: '#EFEFEF'}}>
                    <TableRow>
                        <TableCell sx={{width: '45%'}}>Name</TableCell>
                        <TableCell sx={{width: '10%'}}>Cards</TableCell>
                        <TableCell sx={{width: '10%'}}>Last updated</TableCell>
                        <TableCell sx={{width: '25%'}}>Created by</TableCell>
                        <TableCell sx={{width: '10%'}}>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {packs.map(pack => (
                        <TableRow key={pack._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell>{pack.name}</TableCell>
                            <TableCell>{pack.cardsCount}</TableCell>
                            <TableCell>{dayjs(pack.updated).format('DD.MM.YYYY')}</TableCell>
                            <TableCell>{pack.user_name}</TableCell>
                            <TableCell>
                                <span style={{display: 'flex', gap: '5px', justifyContent: 'start'}}>
                                    <img src={studyImg} alt="study"/>
                                    {pack.user_id === authUserId &&
                                        <>
                                            <img src={editImg} alt="edit"/>
                                            <img src={deleteImg} alt="delete"/>
                                        </>
                                    }
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
