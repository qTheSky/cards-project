import React from 'react';
import {DeleteModal} from 'features/Modals/DeleteModal';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useModal} from 'common/hooks/useModals';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'app/store';
import {deleteCard, fetchCards} from 'features/Cards/cards-reducer';


interface IProps {
		cardId: string
		cardName: string
}

export const DeleteCardModal = ({cardId, cardName}: IProps) => {
		const dispatch = useAppDispatch()
		const {isModalOpen, openModal, closeModal} = useModal()
		const {packId} = useParams() as { packId: string }

		const handleDelete = async () => {
				await dispatch(deleteCard(cardId))
				await dispatch(fetchCards(packId))
				closeModal()
		}
		return (
				<>
						<IconButton onClick={openModal}>
								<DeleteIcon/>
						</IconButton>
						<DeleteModal handleDelete={handleDelete}
						             closeModal={closeModal}
						             open={isModalOpen}
						             title="Delete card"
						             cardName={cardName}/>
				</>
		);
};
