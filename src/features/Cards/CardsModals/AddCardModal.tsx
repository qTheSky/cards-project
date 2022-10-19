import React, {useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, TextField} from '@mui/material';
import {useAppDispatch} from 'app/store';
import {createCard, fetchCards} from 'features/Cards/cards-reducer';


interface IProps {
		packId: string
}

export const AddCardModal = ({packId}: IProps) => {
		const dispatch = useAppDispatch()
		const [open, setOpen] = useState(false)
		const [question, setQuestion] = useState('')
		const [answer, setAnswer] = useState('')


		const handleSave = async () => {
				await dispatch(createCard({cardsPack_id: packId, answer, question}))
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
