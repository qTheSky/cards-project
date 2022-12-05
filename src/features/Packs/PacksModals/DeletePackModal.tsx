import React from 'react';
import {DeleteModal} from 'features/Modals/DeleteModal';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useModal} from 'common/hooks/useModals';
import {useAppDispatch} from 'app/store';
import {deletePack, fetchPacks} from 'features/Packs/packs-reducer';


interface IProps {
		packId: string
		packName: string
		disabled: boolean
}

export const DeletePackModal = ({packName, packId, disabled}: IProps) => {
		const dispatch = useAppDispatch()
		const {isModalOpen, openModal, closeModal} = useModal()

		const handleDelete = async () => {
				await dispatch(deletePack(packId))
				await dispatch(fetchPacks())
				closeModal()
		}
		return (
				<>
						<IconButton onClick={openModal} disabled={disabled}>
								<DeleteIcon/>
						</IconButton>
						<DeleteModal handleDelete={handleDelete}
						             closeModal={closeModal}
						             open={isModalOpen}
						             title="Delete pack"
						             packName={packName}
						/>
				</>
		);
};
