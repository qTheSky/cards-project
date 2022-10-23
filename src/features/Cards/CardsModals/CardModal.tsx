import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {convertFileToBase64} from "../../../utils/convertFileToBase64";

interface IProps {
    title: string
    answer?: string
    question?: string
    questionImg?: string
    open: boolean
    closeModal: () => void
    openModal: () => void
    handleSave: (question: string, answer: string, questionImg: string) => void
}

export const CardModal = ({open, closeModal, openModal, title, ...props}: IProps) => {
    const [question, setQuestion] = useState(props.question || '')
    const [answer, setAnswer] = useState(props.answer || '')
    const [questionImg, setQuestionImg] = useState(props.questionImg || '')
    const [questionFormat, setQuestionFormat] = useState('')


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

    const handleSave = () => {
        if (questionFormat === 'Text') {
            props.handleSave(question, answer,'')
        }
        if (questionFormat === 'Image') {
            props.handleSave('no question', answer, questionImg)
        }
    }

    return (
        <BasicModal open={open}
                    handleOpen={openModal}
                    handleClose={closeModal}
                    title={title}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '40px'}}>
                <div>
                    <FormControl sx={{margin: '30px 0'}} fullWidth>
                        <InputLabel id="select-label">Choose a question format</InputLabel>
                        <Select
                            labelId="select-label"
                            id="demo-simple-select"
                            value={questionFormat}
                            size='small'
                            label="Choose a question format"
                            onChange={(e) => setQuestionFormat(e.target.value)}
                        >
                            <MenuItem value='Text'>Text</MenuItem>
                            <MenuItem value='Image'>Image</MenuItem>
                        </Select>
                    </FormControl>
                    {!!questionFormat &&
                        <>
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
                        </>
                    }
                </div>
                {!!questionFormat &&
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant="outlined" onClick={closeModal}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                    </div>
                }
            </div>
        </BasicModal>
    )
}