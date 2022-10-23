import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, Checkbox, FormControlLabel, IconButton, TextField} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {editPack, fetchPacks} from 'features/Packs/packs-reducer';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {convertFileToBase64} from "../../../utils/convertFileToBase64";

interface IProps {
    id: string
    disabled?: boolean
    packName: string
    isPrivatePack: boolean
    view: 'packOwnerMenu' | 'packs'
    deckCover: string
}

export const EditPackModal = ({id, disabled, isPrivatePack, packName, view, deckCover}: IProps) => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState(packName)
    const [isPrivate, setIsPrivate] = useState(isPrivatePack)
    const [open, setOpen] = useState(false)
    const [newDeckCover, setNewDeckCover] = useState(deckCover)


    const handleClose = () => {
        setOpen(false)
        setName(packName)
        setIsPrivate(isPrivatePack)
        setNewDeckCover(deckCover)
    }


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setNewDeckCover(file64)
                })
            } else {
                alert('Error: Файл слишком большого размера')
            }
        }
    }

    const handleSave = async () => {
        await dispatch(editPack({name, private: isPrivate, _id: id, deckCover: newDeckCover}))
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
                        handleClose={handleClose}
                        title={'Edit pack'}
            >
                <div>
                    {newDeckCover &&
                        <div style={{height: '300px', textAlign: 'center'}}>
                            <img style={{maxHeight: '100%', maxWidth: '100%'}}
                                 src={newDeckCover}
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
    )
}
