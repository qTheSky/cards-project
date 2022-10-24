import React from 'react';
import {CardModal} from './CardModal';
import {useModal} from 'common/hooks/useModals';
import {IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useParams} from 'react-router-dom';
import {editCard, fetchCards} from '../cards-reducer';
import {useAppDispatch} from 'app/store';


interface IProps {
		cardId: string
		questionImg: string
		answer: string
		question: string
}

export const EditCardModal = ({cardId, ...props}: IProps) => {
		const dispatch = useAppDispatch()
		const {isModalOpen, openModal, closeModal} = useModal()
		const {packId} = useParams() as { packId: string }

		const handleSave = async (question: string, answer: string, questionImg: string) => {
				await dispatch(editCard({_id: cardId, answer, question, questionImg}))
				await dispatch(fetchCards(packId))
				closeModal()
		}

		return (
				<>
						<IconButton onClick={openModal}>
								<EditIcon/>
						</IconButton>
						<CardModal title="Edit card"
						           answer={props.answer}
						           question={props.question}
						           questionImg={props.questionImg}
						           handleSave={handleSave}
						           closeModal={closeModal}
						           open={isModalOpen}/>
				</>
		)
}