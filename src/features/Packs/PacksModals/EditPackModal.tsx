import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
import {useModal} from 'common/hooks/useModals';
import {PackModal} from 'features/Packs/PacksModals/PackModal';
import {useAppDispatch} from 'app/store';
import {editPack, fetchPacks} from 'features/Packs/packs-reducer';

interface IProps {
		packName: string
		deckCover: string
		isPrivatePack: boolean
		packId: string
		disabled?: boolean
}

export const EditPackModal = ({disabled, isPrivatePack, packName, deckCover, ...props}: IProps) => {
		const dispatch = useAppDispatch()
		const {isModalOpen, openModal, closeModal} = useModal()


		const handleSave = async (name: string, isPrivate: boolean, deckCover: string,) => {
				await dispatch(editPack({_id: props.packId, deckCover, name, private: isPrivate}))
				await dispatch(fetchPacks())
				closeModal()
		}
		return (
				<>
						<IconButton onClick={openModal} disabled={disabled}>
								<EditIcon/>
						</IconButton>
						<PackModal isModalOpen={isModalOpen}
						           closeModal={closeModal}
						           title="Edit pack"
						           handleSave={handleSave}
						           isPrivate={isPrivatePack}
						           packName={packName}
						           deckCover={deckCover}
						/>
				</>
		);
};
