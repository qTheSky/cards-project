import React from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

export const BackDrop = ({open}: { open: boolean }) => {
		return (
				<Backdrop sx={{color: '#fff',  zIndex: 10 }}
				          open={open}>
						<CircularProgress color="inherit"/>
				</Backdrop>
		);
};
