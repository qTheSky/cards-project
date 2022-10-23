import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {createPack, fetchPacks} from 'features/Packs/packs-reducer';

export const AddPackModal = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    const [checked, setChecked] = useState(false)
    const [open, setOpen] = useState(false)
    const [deckCover, setDeckCover] = useState('')

    const handleClose = () => {
        setOpen(false)
        setValue('')
        setChecked(false)
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 4000000) {
                // https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
                const reader = new FileReader();

                reader.onloadend = () => {
                    const file64 = reader.result as string
                    setDeckCover(file64)
                }
                // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
                reader.readAsDataURL(file)
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const handleSave = async () => {
        await dispatch(createPack({name: value, private: checked, deckCover}))
        await dispatch(fetchPacks())
        handleClose()
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)} variant="contained">Add New Pack</Button>
            <BasicModal open={open}
                        handleOpen={() => setOpen(true)}
                        handleClose={handleClose}
                        title={'Add new pack'}
            >
                <div>
                    {deckCover && <img style={{maxWidth: '100%'}} src={deckCover} alt="deck cover"/>}
                    <Button sx={{margin: '20px 0'}} variant="contained" component="label" fullWidth>
                        Upload deck cover
                        <input onChange={uploadHandler} hidden accept="image/*" multiple type="file"/>
                    </Button>
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
