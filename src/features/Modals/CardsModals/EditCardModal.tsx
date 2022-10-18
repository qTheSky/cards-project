import React, {useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, IconButton, TextField} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {editCard, fetchCards} from 'features/Cards/cards-reducer';
import EditIcon from '@mui/icons-material/Edit';


interface IProps {
		cardId: string
		question: string
		answer: string
		packId: string
}

export const EditCardModal = ({cardId, packId, ...props}: IProps) => {
		const dispatch = useAppDispatch()
		const [open, setOpen] = useState(false)
		const [question, setQuestion] = useState(props.question)
		const [answer, setAnswer] = useState(props.answer)


		const handleSave = async () => {
				await dispatch(editCard({_id: cardId, answer, question}))
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
