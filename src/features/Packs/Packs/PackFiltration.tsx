import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import clearFiltersImg from 'assets/clearPackFilters.svg'
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {clearPackSearchParams, setPackSearchParams} from "../packs-reducer";
import {useDebounce} from "../../../utils/useDebounce";

export const PackFiltration = () => {
    const dispatch = useAppDispatch()
    const authUserId = useAppSelector(state => state.profile.profile._id)
    const userIdFilter = useAppSelector(state => state.packs.searchParams.user_id)
    const packName = useAppSelector(state => state.packs.searchParams.packName)


    const [packNameSearch, setPackNameSearch] = useState<string>(packName)
    const debouncedValue = useDebounce<string>(packNameSearch, 750)

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPackNameSearch(event.target.value)
    }

    const onClearFiltersClick = () => {
        dispatch(clearPackSearchParams())
    }

    const onClickMyPacks = () => {
        dispatch(setPackSearchParams({user_id: authUserId, page: 1}))
    }

    const onClickAllPacks = () => {
        dispatch(setPackSearchParams({user_id: '', page: 1}))
    }

    useEffect(() => {
        if (packName === '') {
            setPackNameSearch('')
        }
    }, [packName])

    useEffect(() => {
        dispatch(setPackSearchParams({packName: debouncedValue}))
    }, [debouncedValue])

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
                <TextField value={packNameSearch} onChange={onInputChange} size='small' variant='outlined'
                           label='Pack name'/>
            </div>
            <div>
                <div>Show packs cards</div>
                <Button variant={authUserId === userIdFilter ? 'contained' : "outlined"}
                        onClick={onClickMyPacks}>My</Button>
                <Button variant={authUserId === userIdFilter ? 'outlined' : "contained"}
                        onClick={onClickAllPacks}>All</Button>
            </div>
            <div>
                <div>Number of cards</div>
                <div>(double range(todo))</div>
            </div>
            <Button onClick={onClearFiltersClick}
                    sx={{height: '40px', width: '40px', backgroundColor: 'white', border: '1.5px solid gray'}}>
                <img src={clearFiltersImg} alt="clear filters"/>
            </Button>
        </div>
    );
};