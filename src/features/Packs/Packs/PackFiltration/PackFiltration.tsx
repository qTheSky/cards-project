import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/store';
import {clearPackSearchParams, setPackSearchParams} from 'features/Packs/packs-reducer';
import {useDebounce} from 'common/hooks/useDebounce';
import {FiltrationPackRange} from 'features/Packs/Packs/PackFiltration/FiltrationPackRange';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {getAuthUserId} from 'features/Profile/selectors';
import {getPacksSearchParams} from 'features/Packs/selectors';
import {getIsAppAppMakingRequest} from 'app/selectors';

export const PackFiltration = () => {
		const dispatch = useAppDispatch()
		const authUserId = useAppSelector(getAuthUserId)
		const {user_id, packName} = useAppSelector(getPacksSearchParams)
		const isAppMakeRequest = useAppSelector(getIsAppAppMakingRequest)
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
				//when click clear filters clear packName input
				if (packName === '') {
						setPackNameSearch('')
				}
		}, [packName])

		useEffect(() => {
				dispatch(setPackSearchParams({packName: debouncedValue}))
		}, [debouncedValue])

		return (
				<div style={{display: 'flex', gap: '5px', justifyContent: 'space-between', alignItems: 'center'}}>
						<TextField value={packNameSearch}
						           onChange={onInputChange}
						           disabled={isAppMakeRequest}
						           size="small"
						           label="Pack name"
						/>
						<div>
								<div style={{fontSize: '14px', fontWeight: '500'}}>Show packs cards</div>
								<Button variant={authUserId === user_id ? 'contained' : 'outlined'}
								        disabled={isAppMakeRequest}
								        onClick={onClickMyPacks}>My</Button>
								<Button variant={authUserId === user_id ? 'outlined' : 'contained'}
								        disabled={isAppMakeRequest}
								        onClick={onClickAllPacks}>All</Button>
						</div>
						<FiltrationPackRange/>
						<IconButton sx={{backgroundColor: 'white', border: '2px solid gray'}}
						            disabled={isAppMakeRequest}
						            onClick={onClearFiltersClick}>
								<FilterAltOffIcon/>
						</IconButton>
				</div>
		);
};