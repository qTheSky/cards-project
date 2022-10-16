import React, {useEffect} from 'react';
import {Slider, TextField} from '@mui/material';
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


		const onFirstInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setValue([+e.currentTarget.value, value[1]])
		}
		const onSecondInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setValue([value[0], +e.currentTarget.value])
		}

		useEffect(() => {
				//when clear filters reset range
				if (minCardsCountFromSearchParams === minCardsCountFromState && maxCardsCountFromSearchParams === maxCardsCountFromState) {
						setValue([minCardsCountFromSearchParams, maxCardsCountFromSearchParams])
				}
		}, [minCardsCountFromSearchParams, maxCardsCountFromSearchParams])
		useEffect(() => {
				setValue([minCardsCountFromState, maxCardsCountFromState])
		}, [minCardsCountFromState, maxCardsCountFromState])
		useEffect(() => {
				if (!!maxCardsCountFromState) {
						dispatch(setPackSearchParams({min: debouncedValue[0], max: debouncedValue[1]}))
				}
		}, [debouncedValue])

		return (
				<div>
						<h3>Number of cards</h3>
						<div style={{display: 'flex', gap: '30px'}}>
								<TextField onChange={onFirstInputChange} value={value[0] || 0} size="small" sx={{width: '120px'}}
								           inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}/>
								<Slider
										getAriaLabel={() => 'Temperature range'}
										value={value}
										onChange={handleRangeChange}
										valueLabelDisplay="auto"
										min={minCardsCountFromState}
										max={maxCardsCountFromState}
										disableSwap
								/>
								<TextField onChange={onSecondInputChange}
								           value={value[1] || 0}
								           size="small" sx={{width: '120px'}}
								           inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}/>
						</div>
				</div>
		);
};
