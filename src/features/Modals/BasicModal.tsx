import * as React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type PropsType = {
		title: string
		children: ReactNode
		open: boolean,
		handleOpen: () => void
		handleClose: () => void
}

const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
		padding: 'none',
}

export const BasicModal = ({title, children, open, ...props}: PropsType) => {

		return (
				<div>
						<Modal open={open}
						       onClose={props.handleClose}>
								<Box sx={style}>
										<div style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												borderBottom: '1px solid #D9D9D9',
												padding: '20px'
										}}>
												<h2>
														{title}
												</h2>
												<IconButton onClick={props.handleClose} style={{padding: 'none'}}>
														<CloseIcon/>
												</IconButton>
										</div>
										<div style={{margin: '0 8px 38px 8px', padding: '6px'}}>
												{children}
										</div>
								</Box>
						</Modal>
				</div>
		)
}