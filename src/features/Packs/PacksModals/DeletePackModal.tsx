import React, {useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, IconButton} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {deletePack, fetchPacks} from 'features/Packs/packs-reducer';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface IProps {
		disabled?: boolean
		packName: string
		packId: string
		view: 'packOwnerMenu' | 'packs'
		setIsPackDeleted?: () => void
}

export const DeletePackModal = ({disabled, packName, packId, view, setIsPackDeleted}: IProps) => {
		const dispatch = useAppDispatch()
		const [open, setOpen] = useState(false)


		const handleDelete = async () => {
				await dispatch(deletePack(packId))
				if (view === 'packs') {
						await dispatch(fetchPacks())
				}
				if (setIsPackDeleted) {
						setIsPackDeleted()
				}
				setOpen(false)
		}

		return (
				<div>
						{view === 'packs' &&
								<IconButton onClick={() => setOpen(true)} disabled={disabled}>
										<DeleteIcon/>
								</IconButton>
						}
						{view === 'packOwnerMenu' &&
								<div onClick={() => setOpen(true)}
								     style={{display: 'flex', gap: '5px', alignItems: 'center', cursor: 'pointer'}}>
										<DeleteOutlineOutlinedIcon/>
										Delete
								</div>
						}
						<BasicModal open={open}
						            handleClose={() => setOpen(false)}
						            title={'Delete Pack'}
						>
								<div>
										<div style={{margin: '30px 0'}}>
												<p>Do you really want to remove <b>{packName}</b>?</p>
												<p>All cards will be deleted.</p>
										</div>
										<div style={{display: 'flex', justifyContent: 'space-between'}}>
												<Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
												<Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
										</div>
								</div>
						</BasicModal>
				</div>
		);
};
