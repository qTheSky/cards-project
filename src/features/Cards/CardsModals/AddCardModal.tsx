import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {createCard, fetchCards} from 'features/Cards/cards-reducer';
import {convertFileToBase64} from "../../../utils/convertFileToBase64";


interface IProps {
    packId: string
}

export const AddCardModal = ({packId}: IProps) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionFormat, setQuestionFormat] = useState('Text')
    const [questionImg, setQuestionImg] = useState('')


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setQuestionImg(file64)
                })
            } else {
                alert('Error: Файл слишком большого размера')
            }
        }
    }


    const handleSave = async () => {
        if (questionFormat === 'Text') {
            await dispatch(createCard({cardsPack_id: packId, question, answer}))
        }
        if (questionFormat === 'Image') {
            await dispatch(createCard({cardsPack_id: packId, questionImg, answer}))
        }
        await dispatch(fetchCards(packId))
        setOpen(false)
        setQuestion('')
        setAnswer('')
    }
    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Add new card
            </Button>
            <BasicModal open={open}
                        handleOpen={() => setOpen(true)}
                        handleClose={() => setOpen(false)}
                        title={'Add new card'}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '40px'}}>
                    <div>
                        <FormControl sx={{margin: '30px 0'}} fullWidth>
                            <InputLabel id="select-label">Choose a question format</InputLabel>
                            <Select
                                labelId="select-label"
                                id="demo-simple-select"
                                defaultValue={questionFormat}
                                value={questionFormat}
                                size='small'
                                label="Choose a question format"
                                onChange={(e) => setQuestionFormat(e.target.value)}
                            >
                                <MenuItem value='Text'>Text</MenuItem>
                                <MenuItem value='Image'>Image</MenuItem>
                            </Select>
                        </FormControl>
                        {questionFormat === 'Text' &&
                            <>
                                <TextField value={question}
                                           onChange={(e) => setQuestion(e.currentTarget.value)}
                                           variant="standard"
                                           label="Question"
                                           fullWidth
                                           style={{marginBottom: '15px'}}/>
                                <TextField value={answer}
                                           onChange={(e) => setAnswer(e.currentTarget.value)}
                                           variant="standard"
                                           label="Answer" fullWidth/>
                            </>
                        }
                        {questionFormat === 'Image' &&
                            <>
                                {questionImg &&
                                    <div style={{height: '300px', textAlign: 'center'}}>
                                        <img style={{maxHeight: '100%', maxWidth: '100%'}}
                                             src={questionImg}
                                             alt="question image"/>
                                    </div>
                                }
                                <Button sx={{margin: '20px 0'}} fullWidth variant="contained" component="label">
                                    Upload question image
                                    <input onChange={uploadHandler} hidden accept="image/*" multiple type="file"/>
                                </Button>
                                <TextField value={answer}
                                           onChange={(e) => setAnswer(e.currentTarget.value)}
                                           variant="standard"
                                           label="Answer" fullWidth/>
                            </>
                        }
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                    </div>
                </div>
            </BasicModal>
        </div>
    )
}