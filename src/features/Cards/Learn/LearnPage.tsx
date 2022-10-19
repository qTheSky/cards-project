import {Button, Container, FormControl, FormControlLabel, Paper, Radio, RadioGroup} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {BackToPackListLink} from 'common/components/BackToPackListArrow/BackToPackListLink';
import {useAppDispatch, useAppSelector} from 'app/store';
import {fetchCards, gradeCard, setCardsSearchParams} from 'features/Cards/cards-reducer';
import {Navigate, useParams} from 'react-router-dom';
import {CardType} from 'api/cardsApi';
import {PATH} from 'app/RouteVariables';


const getCard = (cards: CardType[]) => {
		const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
		const rand = Math.random() * sum
		const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
						const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
						return {sum: newSum, id: newSum < rand ? i : acc.id}
				}
				, {sum: 0, id: -1})
		return cards[res.id + 1]
}

export const LearnPage = () => {
		const dispatch = useAppDispatch()
		const {packId} = useParams() as { packId: string }
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
		const packName = useAppSelector(state => state.cards.cardsState.packName)
		const cards = useAppSelector(state => state.cards.cardsState.cards)
		const [isAnswerShowed, setIsAnswerShowed] = useState(false)
		const [first, setFirst] = useState(true)
		const [chosenGrade, setChosenGrade] = useState(0)
		const [card, setCard] = useState<any>({})
		const grades = [1, 2, 3, 4, 5]


		const onClickNextQuestion = () => {
				dispatch(gradeCard({grade: chosenGrade, card_id: card._id}))
				setIsAnswerShowed(false)
		}
		const gradeChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
				setChosenGrade(+event.currentTarget.value)
		}

		useEffect(() => {
				if (first) {
						dispatch(setCardsSearchParams({pageCount: 99999}))
						dispatch(fetchCards(packId))
						setFirst(false)
				}
				if (cards.length > 0) setCard(getCard(cards))
		}, [cards, first, packId])
		if (!isLoggedIn) return <Navigate to={PATH.login}/>
		return (
				<div>
						<Container>
								<BackToPackListLink/>
								<h1 style={{textAlign: 'center', marginBottom: '20px'}}>Learn ''{packName || 'loading...'}''</h1>
								<Paper sx={{margin: '0 auto', padding: '30px', maxWidth: '440px'}}>
										<div style={{marginBottom: '15px'}}><b>Question: </b>{card.question || 'loading...'}?</div>
										<p style={{marginBottom: '35px', fontSize: '14px', opacity: '0.5'}}>Количество попыток ответов на
												вопрос: <b>{card.shots}</b></p>
										{isAnswerShowed
												? <div>
														<div style={{marginBottom: '25px'}}><b>Answer: </b>{card.answer}</div>
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
																<Button variant="contained" onClick={onClickNextQuestion} fullWidth>Next</Button>}
												</div>
												: <Button disabled={!card.question}
												          fullWidth variant="contained"
												          onClick={() => setIsAnswerShowed(true)}>
														Show answer
												</Button>
										}
								</Paper>
						</Container>
				</div>
		)
}
