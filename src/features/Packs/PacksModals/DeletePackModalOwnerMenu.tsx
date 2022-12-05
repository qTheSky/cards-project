import React from 'react';
import {DeleteModal} from 'features/Modals/DeleteModal';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


interface IProps {
		packName: string
		handleDeletePack: Function
		isModalOpen: boolean
		openModal: () => void
		closeModal: () => void
}

export const DeletePackModalOwnerMenu = ({packName, isModalOpen, openModal, closeModal, ...props}: IProps) => {

		const handleDelete = () => {
				props.handleDeletePack()
		}

		return (
				<>
						<div onClick={openModal}
						     style={{display: 'flex', gap: '5px', alignItems: 'center', cursor: 'pointer'}}>
								<DeleteOutlineOutlinedIcon/>
								Delete
						</div>
						<DeleteModal handleDelete={handleDelete}
						             closeModal={closeModal}
						             open={isModalOpen}
						             title="Delete pack"
						             packName={packName}
						/>
				</>
		);
};
