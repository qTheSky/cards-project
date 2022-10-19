import React, {useState} from 'react';
import {TableCell} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {useAppDispatch} from 'app/store';
import {setPackSearchParams} from 'features/Packs/packs-reducer';


interface IProps {
		name: string
		sortName: string
		width:string
}

export const TableHeaderItem = ({name, sortName,width}: IProps) => {
		const dispatch = useAppDispatch()
		const [isArrowDown, setIsArrowDown] = useState(true)

		const onClickHandler = () => {
				setIsArrowDown(!isArrowDown)
				dispatch(setPackSearchParams({sortPacks: isArrowDown ? `1${sortName}` : `0${sortName}`}))
		}

		return (
				<TableCell sx={{width}}>
						<div style={{display: 'flex', cursor: 'pointer'}} onClick={onClickHandler}>
								{name}
								{isArrowDown ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}</div>
				</TableCell>
		);
};
