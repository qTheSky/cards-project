import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {editCard, fetchCards} from 'features/Cards/cards-reducer';
import EditIcon from '@mui/icons-material/Edit';
import {convertFileToBase64} from "../../../utils/convertFileToBase64";


interface IProps {
    cardId: string
    question: string
    answer: string
    packId: string
    questionImg: string
}

export const EditCardModal = ({cardId, packId, ...props}: IProps) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState(props.question)
    const [answer, setAnswer] = useState(props.answer)
    const [questionFormat, setQuestionFormat] = useState('Text')
    const [questionImg, setQuestionImg] = useState(props.questionImg)


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
        await dispatch(editCard({_id: cardId, answer, question, questionImg}))
        await dispatch(fetchCards(packId))
        setOpen(false)
    }

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <EditIcon/>
            </IconButton>
            <BasicModal open={open}
                        handleOpen={() => setOpen(true)}
                        handleClose={() => setOpen(false)}
                        title={'Edit card'}>
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
