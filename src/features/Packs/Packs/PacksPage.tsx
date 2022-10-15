import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow
} from '@mui/material';
import {fetchPacks, setPackSearchParams} from 'features/Packs/packs-reducer';
import dayjs from "dayjs";
import {PacksTable} from "./PacksTable";
import {PackFiltration} from "./PackFiltration";

export const PacksPage = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const packs = useAppSelector(state => state.packs.packsState.cardPacks)
    const packTotalCount = useAppSelector(state => state.packs.packsState.cardPacksTotalCount)
    const currentPage = useAppSelector(state => state.packs.searchParams.page)
    const rowsPerPage = useAppSelector(state => state.packs.searchParams.pageCount)
    const userIdFilter = useAppSelector(state => state.packs.searchParams.user_id)
    const packName = useAppSelector(state => state.packs.searchParams.packName)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchPacks())
    }, [currentPage, rowsPerPage, userIdFilter, packName])


    if (!isLoggedIn) return <Navigate to={PATH.login}/>
    return (
        <div>
            <Container>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1>Packs list</h1>
                    <Button variant="contained">Add new pack</Button>
                </div>
                <PackFiltration/>
                <PacksTable packs={packs}
                            currentPage={currentPage}
                            packTotalCount={packTotalCount}
                            rowsPerPage={rowsPerPage}/>
            </Container>
        </div>
    );
};
