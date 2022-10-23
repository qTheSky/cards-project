import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {createPack, fetchPacks} from 'features/Packs/packs-reducer';
import {convertFileToBase64} from "../../../utils/convertFileToBase64";

export const AddPackModal = () => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [open, setOpen] = useState(false)
    const [deckCover, setDeckCover] = useState('')

    const handleClose = () => {
        setOpen(false)
        setName('')
        setIsPrivate(false)
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setDeckCover(file64)
                })
            } else {
                alert('Error: Файл слишком большого размера')
            }
        }
    }

    const handleSave = async () => {
        await dispatch(createPack({name, private: isPrivate, deckCover}))
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
                    {deckCover &&
                        <div style={{height: '300px', textAlign: 'center'}}>
                            <img style={{maxHeight: '100%', maxWidth: '100%'}}
                                 src={deckCover}
                                 alt="deck cover"/>
                        </div>
                    }
                    <Button sx={{margin: '20px 0'}} variant="contained" component="label" fullWidth>
                        Upload deck cover
                        <input onChange={uploadHandler} hidden accept="image/*" multiple type="file"/>
                    </Button>
                    <TextField fullWidth
                               label="Name Pack"
                               variant="standard"
                               value={name}
                               onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <FormControlLabel control={<Checkbox checked={isPrivate}
                                                         onChange={(e) => setIsPrivate(e.currentTarget.checked)}/>}
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
