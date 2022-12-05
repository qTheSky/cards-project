import React from 'react';
import {PackModal} from 'features/Packs/PacksModals/PackModal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface IProps {
		packName: string
		deckCover: string
		isPrivatePack: boolean
		packId: string
		handleEditPack: (deckCover: string, name: string, isPrivate: boolean) => void
		isModalOpen: boolean
		openModal: () => void
		closeModal: () => void
}

export const EditPackModalOwnerMenu = ({
		                                       isPrivatePack,
		                                       packName,
		                                       deckCover,
		                                       isModalOpen,
		                                       openModal,
		                                       closeModal,
		                                       ...props
                                       }: IProps) => {

		const handleSave = async (name: string, isPrivate: boolean, deckCover: string,) => {
				props.handleEditPack(deckCover, name, isPrivate)
		}
		return (
				<>
						<div onClick={openModal}
						     style={{display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}>
								<EditOutlinedIcon/>
								Edit
						</div>
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
