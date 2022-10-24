import React from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button} from '@mui/material';


interface IProps {
		open: boolean
		closeModal: () => void
		title: string
		handleDelete: Function
		cardName?: string
		packName?: string
}

export const DeleteModal = ({open, closeModal, title, cardName, packName, ...props}: IProps) => {

		const handleDelete = () => {
				props.handleDelete()
		}

		return (
				<BasicModal open={open}
				            handleClose={closeModal}
				            title={title}>
						<div>
								<div style={{margin: '30px 0'}}>
										{title === 'Delete card' && <p>Do you really want to remove <b>{cardName}</b>?</p>
										}
										{title === 'Delete pack' &&
												<p>Do you really want to remove <b>{packName}</b>? <br/>
														All cards will be deleted.</p>
										}
								</div>
								<div style={{display: 'flex', justifyContent: 'space-between'}}>
										<Button variant="outlined" onClick={closeModal}>Cancel</Button>
										<Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
								</div>
						</div>
				</BasicModal>
		);
};
