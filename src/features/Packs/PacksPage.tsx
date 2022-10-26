import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {Container} from '@mui/material';
import {fetchPacks, setPackSearchParams} from 'features/Packs/packs-reducer';
import {PacksTable} from 'features/Packs/Packs/PacksTable';
import {PackFiltration} from 'features/Packs/Packs/PackFiltration/PackFiltration';
import {AddPackModal} from 'features/Packs/PacksModals/AddPackModal';
import {getPacksSearchParams} from 'features/Packs/selectors';
import {getIsLoggedIn} from 'features/Auth/selectors';
import {parseSearchParamsFromURL} from "../../utils/parseSearchParamsFromURL";

export const PacksPage = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const {page, packName, pageCount, sortPacks, max, min, user_id} = useAppSelector(getPacksSearchParams)
    const navigate = useNavigate()
    const [isFirstLoading, setIsFirstLoading] = useState(true)


    useEffect(() => {
        if (window.location.hash) {
            const params = parseSearchParamsFromURL(window.location.hash.substring(3))
            dispatch(setPackSearchParams(params))
            dispatch(fetchPacks())
            setIsFirstLoading(false)
        }
    }, [])

    useEffect(() => {
        const qs = `?page=${page}&packName=${packName}&user_id=${user_id}&pageCount=${pageCount}&sortPacks=${sortPacks}&min=${min}&max=${max}`
        navigate(qs)
        if (!isLoggedIn) {
            return
        }
        if (!isFirstLoading) {
            dispatch(fetchPacks())
        }
    }, [page, packName, pageCount, sortPacks, user_id, min, max])

    if (!isLoggedIn) return <Navigate to={PATH.login}/>
    return (
        <div>
            <Container>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '25px', marginBottom: '25px'}}>
                    <h1>Packs list</h1>
                    <AddPackModal/>
                </div>
                <PackFiltration/>
                <PacksTable/>
            </Container>
        </div>
    );
};
