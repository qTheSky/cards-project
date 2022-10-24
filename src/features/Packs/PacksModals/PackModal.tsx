import React, {ChangeEvent, useEffect, useState} from 'react';
import {BasicModal} from 'features/Modals/BasicModal';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {convertFileToBase64} from 'utils/convertFileToBase64';


interface IProps {
		isModalOpen: boolean
		closeModal: () => void
		title: string
		handleSave: (packName: string, isPrivate: boolean, deckCover: string) => void
		packName?: string
		isPrivate?: boolean
		deckCover?: string
}

export const PackModal = ({isModalOpen, closeModal, title, ...props}: IProps) => {
		const [deckCover, setDeckCover] = useState(props.deckCover || '')
		const [packName, setPackName] = useState(props.packName || '')
		const [isPrivate, setIsPrivate] = useState(props.isPrivate || false)

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
		const handleSave = () => {
				props.handleSave(packName, isPrivate, deckCover)
		}

		useEffect(() => {
				//when modal is closing clear it's state
				if (!isModalOpen) {
						setPackName(props.packName || '')
						setIsPrivate(props.isPrivate || false)
						setDeckCover(props.deckCover || '')
				}
		}, [isModalOpen])

		return (
				<BasicModal open={isModalOpen}
				            handleClose={closeModal}
				            title={title}
				>
						<div>
								{deckCover &&
										<div style={{maxHeight: '300px', textAlign: 'center'}}>
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
								           value={packName}
								           onChange={(e) => setPackName(e.currentTarget.value)}
								/>
								<FormControlLabel control={<Checkbox checked={isPrivate}
								                                     onChange={(e) => setIsPrivate(e.currentTarget.checked)}/>}
								                  label="Private pack"
								                  style={{margin: '30px 0'}}
								/>
								<div style={{display: 'flex', justifyContent: 'space-between'}}>
										<Button variant="outlined" onClick={closeModal}>Cancel</Button>
										<Button variant="contained" onClick={handleSave}>Save</Button>
								</div>
						</div>
				</BasicModal>
		);
};
