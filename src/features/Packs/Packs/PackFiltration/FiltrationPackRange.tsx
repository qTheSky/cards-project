import React, {useEffect} from 'react';
import {Slider} from '@mui/material';
import {useDebounce} from 'utils/useDebounce';
import {useAppDispatch, useAppSelector} from 'app/store';
import {setPackSearchParams} from 'features/Packs/packs-reducer';

export const FiltrationPackRange = () => {
		const dispatch = useAppDispatch()
		const minCardsCountFromState = useAppSelector(state => state.packs.packsState.minCardsCount)
		const maxCardsCountFromState = useAppSelector(state => state.packs.packsState.maxCardsCount)
		const minCardsCountFromSearchParams = useAppSelector(state => state.packs.searchParams.min)
		const maxCardsCountFromSearchParams = useAppSelector(state => state.packs.searchParams.max)
		const [value, setValue] = React.useState<number[]>([0, maxCardsCountFromState])
		const debouncedValue = useDebounce(value, 1000)


		const handleRangeChange = (event: Event, newValue: number | number[]) => {
				setValue(newValue as number[]);
		}
		useEffect(() => {
				if (minCardsCountFromSearchParams === minCardsCountFromState && maxCardsCountFromSearchParams === maxCardsCountFromState) {
						setValue([minCardsCountFromSearchParams, maxCardsCountFromSearchParams])
				}
		}, [minCardsCountFromSearchParams, maxCardsCountFromSearchParams])

		useEffect(() => {
				setValue([minCardsCountFromState, maxCardsCountFromState])
		}, [minCardsCountFromState, maxCardsCountFromState])

		useEffect(() => {
				if (!!debouncedValue[1]) {
						dispatch(setPackSearchParams({min: debouncedValue[0], max: debouncedValue[1]}))
				}
		}, [debouncedValue])

		return (
				<div>
						<div>Number of cards</div>
						<Slider
								getAriaLabel={() => 'Temperature range'}
								value={value}
								onChange={handleRangeChange}
								valueLabelDisplay="auto"
								min={minCardsCountFromState}
								max={maxCardsCountFromState}
								disableSwap
						/>
				</div>
		);
};
