import React, {useEffect, useState} from 'react';
import {TableCell, TableSortLabel} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/store';
import {setPackSearchParams} from 'features/Packs/packs-reducer';
import {getPacksSearchParams} from 'features/Packs/selectors';

interface IProps {
		name: string
		sortName: string
		width: string
}

export const TableHeaderItem = ({name, sortName, width}: IProps) => {
		const dispatch = useAppDispatch()
		const [isArrowDown, setIsArrowDown] = useState(false)
		const {sortPacks} = useAppSelector(getPacksSearchParams)
		const [isActive, setIsActive] = useState(sortPacks.substring(1) === sortName)

		const onClickSortPacks = () => {
				setIsActive(true)
				if (!isActive) {
						dispatch(setPackSearchParams({sortPacks: isArrowDown ? `1${sortName}` : `0${sortName}`}))
						return
				}
				setIsArrowDown(!isArrowDown)
				dispatch(setPackSearchParams({sortPacks: isArrowDown ? `0${sortName}` : `1${sortName}`}))
		}

		useEffect(() => {
				if (sortPacks.substring(1) === sortName) {
						setIsActive(true)
				} else {
						setIsActive(false)
				}
		}, [sortPacks])

		return (
				<TableCell sx={{width}}>
						<TableSortLabel onClick={onClickSortPacks}
						                active={isActive}
						                direction={isArrowDown ? 'desc' : 'asc'}>
								{name}
						</TableSortLabel>
				</TableCell>
		)
}