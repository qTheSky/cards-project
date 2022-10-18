import React, {useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, IconButton} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {deletePack, fetchPacks} from 'features/Packs/packs-reducer';
import DeleteIcon from '@mui/icons-material/Delete';


interface IProps {
		disabled: boolean
		packName: string
		packId: string
}

export const DeletePackModal = ({disabled, packName, packId}: IProps) => {
		const dispatch = useAppDispatch()
		const [open, setOpen] = useState(false)


		const handleDelete = async () => {
				await dispatch(deletePack(packId))
				await dispatch(fetchPacks())
				setOpen(false)
		}

		return (
				<div>
						<IconButton onClick={() => setOpen(true)} disabled={disabled}>
								<DeleteIcon/>
						</IconButton>
						<BasicModal open={open}
						            handleOpen={() => setOpen(true)}
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
