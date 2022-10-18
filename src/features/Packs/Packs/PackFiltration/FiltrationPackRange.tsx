import React, {useEffect} from 'react';
import {Slider} from '@mui/material';
import {useDebounce} from 'common/hooks/useDebounce';
import {useAppDispatch, useAppSelector} from 'app/store';
import {setPackSearchParams} from 'features/Packs/packs-reducer';

export const FiltrationPackRange = () => {
		const dispatch = useAppDispatch()
		const minCardsCountFromState = useAppSelector(state => state.packs.packsState.minCardsCount)
		const maxCardsCountFromState = useAppSelector(state => state.packs.packsState.maxCardsCount)
		const [value, setValue] = React.useState<number[]>([minCardsCountFromState || 0, maxCardsCountFromState || 0])
		const debouncedValue = useDebounce(value, 1000)

		const handleRangeChange = (event: Event, newValue: number | number[]) => {
				setValue(newValue as number[])
		}

		useEffect(() => {
				//when max value from server got set to range
				setValue([0, maxCardsCountFromState])
		}, [maxCardsCountFromState])

		useEffect(() => {
				dispatch(setPackSearchParams({min: value[0], max: value[1]}))
		}, [debouncedValue])


		return (
				<div>
						<h3>Number of cards</h3>
						<Slider
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
