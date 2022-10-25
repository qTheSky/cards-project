import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {getIsAppAppMakingRequest} from 'app/selectors';
import {gradeCard} from 'features/Cards/cards-reducer';
import {getNextCardToLearn} from 'utils/getNextCardToLearn';
import {Button, FormControl, FormControlLabel, Paper, Radio, RadioGroup} from '@mui/material';
import {getCards} from 'features/Cards/selectors';
import {CardType} from 'api/cardsApi';

interface IProps {
		displayedCard: CardType
		setDisplayedCard: (cards: CardType) => void
}

export const LearnPaper = ({displayedCard, setDisplayedCard}: IProps) => {
		const dispatch = useAppDispatch()
		const isAppMakeRequest = useAppSelector(getIsAppAppMakingRequest)
		const [isAnswerShowed, setIsAnswerShowed] = useState(false)
		const [chosenGrade, setChosenGrade] = useState(0)
		const cards = useAppSelector(getCards)
		const grades = [1, 2, 3, 4, 5]


		const onClickNextQuestion = () => {
				dispatch(gradeCard({grade: chosenGrade, card_id: displayedCard._id}))
				setIsAnswerShowed(false)
				setDisplayedCard(getNextCardToLearn(cards))
		}

		const gradeChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
				setChosenGrade(+event.currentTarget.value)
		}


		return (
				<Paper sx={{margin: '0 auto', padding: '30px', maxWidth: '440px'}}>
						<div style={{marginBottom: '15px'}}>
								<b>Question: </b>{displayedCard.question !== 'no question' && displayedCard.question}
								{displayedCard.questionImg &&
										<img style={{width: '373px', height: '119px'}} src={displayedCard.questionImg}
										     alt="question image"/>}
						</div>
						<p style={{marginBottom: '35px', fontSize: '14px', opacity: '0.5'}}>Количество попыток ответов на
								вопрос: <b>{displayedCard.shots}</b></p>
						{isAnswerShowed
								? <div>
										<div style={{marginBottom: '25px'}}>
												<b>Answer: </b>{displayedCard.answer !== 'no answer' && displayedCard.answer}
												{displayedCard.answerImg &&
														<img style={{width: '373px', height: '119px'}} src={displayedCard.answerImg}
														     alt="answer image"/>}
										</div>
										<div>
												<FormControl>
														<div>Rate yourself</div>
														<RadioGroup onChange={gradeChangeHandle}>
																<FormControlLabel value={grades[0]}
																                  control={<Radio/>}
																                  label="Did not know"/>
																<FormControlLabel value={grades[1]}
																                  control={<Radio/>}
																                  label="Forgot"/>
																<FormControlLabel value={grades[2]}
																                  control={<Radio/>}
																                  label="A lot of thought"/>
																<FormControlLabel value={grades[3]}
																                  control={<Radio/>}
																                  label="Confused"/>
																<FormControlLabel value={grades[4]}
																                  control={<Radio/>}
																                  label="Knew the answer"/>
														</RadioGroup>
												</FormControl>
										</div>
										{chosenGrade !== 0 &&
												<Button variant="contained"
												        disabled={isAppMakeRequest}
												        onClick={onClickNextQuestion}
												        fullWidth>
														{isAppMakeRequest ? 'Wait a bit' : 'Next'}
												</Button>
										}
								</div>
								: <Button disabled={!displayedCard.question}
								          fullWidth variant="contained"
								          onClick={() => setIsAnswerShowed(true)}>
										Show answer
								</Button>
						}
				</Paper>
		)
}