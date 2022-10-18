import React, {useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {createPack, fetchPacks} from 'features/Packs/packs-reducer';

export const AddPackModal = () => {
		const dispatch = useAppDispatch()
		const [value, setValue] = useState('')
		const [checked, setChecked] = useState(false)
		const [open, setOpen] = useState(false)

		const handleClose = () => {
				setOpen(false)
				setValue('')
				setChecked(false)
		}

		const handleSave = async () => {
				await dispatch(createPack({name: value, private: checked, deckCover: ''}))
				await dispatch(fetchPacks())
				handleClose()
		}

		return (
				<div>
						<Button onClick={()=>setOpen(true)} variant="contained">Add New Pack</Button>
						<BasicModal open={open}
						            handleOpen={()=>setOpen(true)}
						            handleClose={handleClose}
						            title={'Add new pack'}
						>
								<div>
										<TextField fullWidth
										           label="Name Pack"
										           variant="standard"
										           value={value}
										           onChange={(e) => setValue(e.currentTarget.value)}
										/>
										<FormControlLabel control={<Checkbox checked={checked}
										                                     onChange={(e) => setChecked(e.currentTarget.checked)}/>}
										                  label="Private pack"
										                  style={{margin: '30px 0'}}
										/>
										<div style={{display: 'flex', justifyContent: 'space-between'}}>
												<Button variant="outlined" onClick={handleClose}>Cancel</Button>
												<Button variant="contained" onClick={handleSave}>Save</Button>
										</div>
								</div>
						</BasicModal>
				</div>
		);
};
