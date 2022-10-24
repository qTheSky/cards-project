import React from 'react';
import {DeleteModal} from 'features/Modals/DeleteModal';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useModal} from 'common/hooks/useModals';
import {useAppDispatch} from 'app/store';
import {deletePack, fetchPacks} from 'features/Packs/packs-reducer';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useNavigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';


interface IProps {
		packId: string
		packName: string
		view: 'packs' | 'packOwnerMenu'
		disabled?: boolean
}

export const DeletePackModal = ({packName, packId, view, disabled}: IProps) => {
		const dispatch = useAppDispatch()
		const {isModalOpen, openModal, closeModal} = useModal()
		const navigate = useNavigate()

		const handleDelete = async () => {
				if (view === 'packs') {
						await dispatch(deletePack(packId))
						await dispatch(fetchPacks())
				}
				if (view === 'packOwnerMenu') {
						await dispatch(deletePack(packId))
						navigate(PATH.main)
				}
				closeModal()
		}
		return (
				<>
						{view === 'packs' &&
								<IconButton onClick={openModal} disabled={disabled}>
										<DeleteIcon/>
								</IconButton>
						}
						{view === 'packOwnerMenu' &&
								<div onClick={openModal}
								     style={{display: 'flex', gap: '5px', alignItems: 'center', cursor: 'pointer'}}>
										<DeleteOutlineOutlinedIcon/>
										Delete
								</div>
						}
						<DeleteModal handleDelete={handleDelete}
						             closeModal={closeModal}
						             open={isModalOpen}
						             title="Delete pack"
						             packName={packName}
						/>
				</>
		);
};
