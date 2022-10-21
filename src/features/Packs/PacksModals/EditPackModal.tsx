import React, {useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, Checkbox, FormControlLabel, IconButton, TextField} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {editPack, fetchPacks} from 'features/Packs/packs-reducer';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface IProps {
		id: string
		disabled?: boolean
		packName: string
		isPrivatePack: boolean
		view: 'packOwnerMenu' | 'packs'
}

export const EditPackModal = ({id, disabled, isPrivatePack, packName, view}: IProps) => {
		const dispatch = useAppDispatch()
		const [name, setName] = useState(packName)
		const [checked, setChecked] = useState(isPrivatePack)
		const [open, setOpen] = useState(false)


		const handleSave = async () => {
				await dispatch(editPack({name, private: checked, _id: id}))
				if (view === 'packs') {
						await dispatch(fetchPacks())
				}
				setOpen(false)
		}

		return (
				<div>
						{view === 'packs' &&
								<IconButton onClick={() => setOpen(true)} disabled={disabled}>
										<EditIcon/>
								</IconButton>
						}
						{view === 'packOwnerMenu' &&
								<div onClick={() => setOpen(true)}
								     style={{display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}>
										<EditOutlinedIcon/>
										Edit
								</div>
						}
						<BasicModal open={open}
						            handleOpen={() => setOpen(true)}
						            handleClose={() => setOpen(false)}
						            title={'Add new pack'}
						>
								<div>
										<div style={{margin: '30px 0'}}>
												<TextField fullWidth
												           label="Name Pack"
												           variant="standard"
												           value={name}
												           onChange={(e) => setName(e.currentTarget.value)}
												           style={{marginBottom: '30px'}}
												/>
												<FormControlLabel control={<Checkbox checked={checked}
												                                     onChange={(e) => setChecked(e.currentTarget.checked)}/>}
												                  label="Private pack"/>
										</div>
										<div style={{display: 'flex', justifyContent: 'space-between'}}>
												<Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
												<Button variant="contained" onClick={handleSave}>Save</Button>
										</div>
								</div>
						</BasicModal>
				</div>
		);
};
