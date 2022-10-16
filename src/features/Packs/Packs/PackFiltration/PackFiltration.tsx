import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/store';
import {clearPackSearchParams, setPackSearchParams} from 'features/Packs/packs-reducer';
import {useDebounce} from 'utils/useDebounce';
import {FiltrationPackRange} from 'features/Packs/Packs/PackFiltration/FiltrationPackRange';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

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
				<div style={{display: 'flex', gap: '5px', justifyContent: 'space-between', alignItems: 'center'}}>
						<div>
								<TextField value={packNameSearch} onChange={onInputChange} size="small"
								           label="Pack name"/>
						</div>
						<div>
								<div>Show packs cards</div>
								<Button variant={authUserId === userIdFilter ? 'contained' : 'outlined'}
								        onClick={onClickMyPacks}>My</Button>
								<Button variant={authUserId === userIdFilter ? 'outlined' : 'contained'}
								        onClick={onClickAllPacks}>All</Button>
						</div>
						<FiltrationPackRange/>
						<IconButton sx={{backgroundColor: 'white', border: '2px solid gray'}} onClick={onClearFiltersClick}>
								<FilterAltOffIcon/>
						</IconButton>
				</div>
		);
};