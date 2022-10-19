import React, {useEffect, useState} from 'react';
import {Slider} from '@mui/material';
import {useDebounce} from 'common/hooks/useDebounce';
import {useAppDispatch, useAppSelector} from 'app/store';
import {setPackSearchParams} from 'features/Packs/packs-reducer';

export const FiltrationPackRange = () => {
		const dispatch = useAppDispatch()
		const minCardsCountFromState = useAppSelector(state => state.packs.packsState.minCardsCount)
		const maxCardsCountFromState = useAppSelector(state => state.packs.packsState.maxCardsCount)
		const {min, max, user_id} = useAppSelector(state => state.packs.searchParams)
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
				if (min === 0 && max === maxCardsCountFromState) {
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
				<div>
						<h3>Number of cards</h3>
						<Slider value={value}
						        onChange={handleRangeChange}
						        valueLabelDisplay="auto"
						        min={minCardsCountFromState}
						        max={maxCardsCountFromState}
						        disableSwap
						/>
				</div>
		);
};
