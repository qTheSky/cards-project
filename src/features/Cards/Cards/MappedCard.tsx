import React from 'react';
import {Rating, TableCell, TableRow} from '@mui/material';
import dayjs from 'dayjs';
import {EditCardModal} from 'features/Cards/CardsModals/EditCardModal';
import {DeleteCardModal} from 'features/Cards/CardsModals/DeleteCardModal';
import {CardType} from 'api/cardsApi';

interface IProps {
		card: CardType
		isOwner: boolean
}

export const MappedCard = ({card, isOwner}: IProps) => {
		return (
				<TableRow key={card._id} sx={{verticalAlign: 'top'}}>
						<TableCell>
								<div style={{display: 'flex', alignItems: 'start'}}>
										{card.questionImg &&
												<img style={{width: '150px', height: '36px'}}
												     src={card.questionImg}
												     alt="questionImg"/>
										}
										{card.question !== 'no question' && <span>{card.question}</span>}
								</div>

						</TableCell>
						<TableCell>
								{card.answerImg &&
										<img style={{width: '150px', height: '36px'}}
										     src={card.answerImg}
										     alt="answerImg"/>
								}
								{card.answer !== 'no answer' && <span>{card.answer}</span>}
						</TableCell>
						<TableCell>{dayjs(card.updated).format('DD.MM.YYYY')}</TableCell>
						<TableCell><Rating value={card.grade} readOnly/></TableCell>
						{isOwner &&
								<TableCell>
										<div style={{display: 'flex'}}>
												<EditCardModal cardId={card._id}
												               questionImg={card.questionImg}
												               answer={card.answer}
												               question={card.question}/>
												<DeleteCardModal cardId={card._id}
												                 cardName={card.answer}/>
										</div>
								</TableCell>
						}
				</TableRow>
		);
};
