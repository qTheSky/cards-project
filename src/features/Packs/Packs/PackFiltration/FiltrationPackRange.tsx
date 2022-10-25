import React, {useEffect, useState} from 'react';
import {Paper, Slider} from '@mui/material';
import {useDebounce} from 'common/hooks/useDebounce';
import {useAppDispatch, useAppSelector} from 'app/store';
import {setPackSearchParams} from 'features/Packs/packs-reducer';
import {getMaxCardsCountFromState, getMinCardsCountFromState, getPacksSearchParams} from 'features/Packs/selectors';

export const FiltrationPackRange = () => {
		const dispatch = useAppDispatch()
		const minCardsCountFromState = useAppSelector(getMinCardsCountFromState)
		const maxCardsCountFromState = useAppSelector(getMaxCardsCountFromState)
		const {min, max, user_id} = useAppSelector(getPacksSearchParams)
		const [value, setValue] = React.useState<number[]>([0, 0])
		const debouncedValue = useDebounce(value, 1000)
		const [isRangeTouched, setIsRangeTouched] = useState(false)

		const handleRangeChange = (event: Event, newValue: number | number[], activeThumb: number) => {
				if (activeThumb >= 0) {
						setIsRangeTouched(true)
				}
				setValue(newValue as number[])
		}


		useEffect(() => {
				//when click clear filters reset range
				if (min === minCardsCountFromState && max === maxCardsCountFromState) {
						setValue([min, max])
				}
		}, [min, max])

		useEffect(() => {
				//when max value from server got set to range
				setValue([minCardsCountFromState, maxCardsCountFromState])
		}, [maxCardsCountFromState])

		useEffect(() => {
				if (user_id) {
						setIsRangeTouched(false)
				}
				if (isRangeTouched) {
						dispatch(setPackSearchParams({min: value[0], max: value[1]}))
				}
		}, [debouncedValue, user_id])


		return (
				<div style={{width: '220px'}}>
						<h3 style={{fontWeight: '500', fontSize: '14px'}}>Number of cards</h3>
						<div style={{display: 'flex', justifyContent: 'space-between', gap: '15px'}}>
								<Paper style={{minWidth: '36px', height: '36px', textAlign: 'center', lineHeight: '36px'}}>
										{minCardsCountFromState}
								</Paper>
								<Slider value={value}
								        onChange={handleRangeChange}
								        valueLabelDisplay="auto"
								        min={minCardsCountFromState}
								        max={maxCardsCountFromState}
								        disableSwap
								        disabled={maxCardsCountFromState === 0 || minCardsCountFromState === maxCardsCountFromState}
								/>
								<Paper style={{minWidth: '36px', height: '36px', textAlign: 'center', lineHeight: '36px'}}>
										{maxCardsCountFromState}
								</Paper>
						</div>
				</div>
		);
};
