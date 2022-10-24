import React, {useState} from 'react';
import {Checkbox, TableCell} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {useAppDispatch, useAppSelector} from 'app/store';
import {setPackSearchParams} from 'features/Packs/packs-reducer';
import {getIsAppAppMakingRequest} from 'app/selectors';


interface IProps {
		name: string
		sortName: string
		width: string
}

export const TableHeaderItem = ({name, sortName, width}: IProps) => {
		const dispatch = useAppDispatch()
		const isAppMakeRequest = useAppSelector(getIsAppAppMakingRequest)
		const [isArrowDown, setIsArrowDown] = useState(true)

		const onChangeSortPacks = () => {
				setIsArrowDown(!isArrowDown)
				dispatch(setPackSearchParams({sortPacks: isArrowDown ? `1${sortName}` : `0${sortName}`}))
		}

		return (
				<TableCell sx={{width}}>
						{name}
						<Checkbox icon={<ArrowDropDownIcon/>}
						          color="default"
						          onChange={onChangeSortPacks}
						          disabled={isAppMakeRequest}
						          checkedIcon={<ArrowDropUpIcon/>}/>
				</TableCell>
		)
}