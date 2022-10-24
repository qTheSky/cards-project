import React, {useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, IconButton} from '@mui/material';
import {useAppDispatch} from 'app/store';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteCard, fetchCards} from 'features/Cards/cards-reducer';


interface IProps {
		cardName: string
		cardId: string
		packId:string
}

export const DeleteCardModal = ({cardName, cardId,packId}: IProps) => {
		const dispatch = useAppDispatch()
		const [open, setOpen] = useState(false)


		const handleDelete = async () => {
				await dispatch(deleteCard(cardId))
				await dispatch(fetchCards(packId))
				setOpen(false)
		}

		return (
				<div>
						<IconButton onClick={() => setOpen(true)}>
								<DeleteIcon/>
						</IconButton>
						<BasicModal open={open}
						            handleClose={() => setOpen(false)}
						            title={'Delete Card'}>
								<div>
										<div style={{margin: '30px 0'}}>
												<p>Do you really want to remove <b>{cardName}</b>?</p>
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
