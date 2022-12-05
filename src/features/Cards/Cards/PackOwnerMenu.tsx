import React, {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'app/store';
import {PATH} from 'app/RouteVariables';
import {SchoolOutlined} from '@mui/icons-material';
import {IconButton, Paper} from '@mui/material';
import {getCardsState} from 'features/Cards/selectors';
import KeyIcon from '@mui/icons-material/Key';
import CloseIcon from '@mui/icons-material/Close';
import {EditPackModalOwnerMenu} from 'features/Packs/PacksModals/EditPackModalOwnerMenu';
import {deletePack, editPack} from '../../Packs/packs-reducer'
import {DeletePackModalOwnerMenu} from '../../Packs/PacksModals/DeletePackModalOwnerMenu'


export const PackOwnerMenu = () => {
		const dispatch = useAppDispatch()
		const navigate = useNavigate()
		const {packId} = useParams() as { packId: string }

		const {packName, packPrivate, packDeckCover} = useAppSelector(getCardsState)
		const [isMenuOpen, setIsMenuOpen] = useState(false)
		const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
		const [isEditModalOpen, setIsEditModalOpen] = useState(false)


		const handleEditPack = async (deckCover: string, name: string, isPrivate: boolean) => {
				await dispatch(editPack({_id: packId, deckCover, name, private: isPrivate}))
				setIsEditModalOpen(false)
		}

		const handleDeletePack = async () => {
				await dispatch(deletePack(packId))
				navigate(PATH.main)
				setIsDeleteModalOpen(false)
		}

		return (
				<div style={{position: 'relative'}}>
						{isMenuOpen
								? <IconButton onClick={() => setIsMenuOpen(false)}><CloseIcon/></IconButton>
								: <IconButton onClick={() => setIsMenuOpen(true)}><KeyIcon/></IconButton>
						}

						{isMenuOpen &&
								<Paper style={{
										position: 'absolute',
										right: '0',
										zIndex: '5',
										backgroundColor: 'white',
										padding: '20px',
										display: 'flex',
										flexDirection: 'column',
										gap: '5px',
								}}
								>
										<EditPackModalOwnerMenu packId={packId}
										                        isModalOpen={isEditModalOpen}
										                        closeModal={() => setIsEditModalOpen(false)}
										                        openModal={() => setIsEditModalOpen(true)}
										                        handleEditPack={handleEditPack}
										                        deckCover={packDeckCover}
										                        packName={packName}
										                        isPrivatePack={packPrivate}/>
										<DeletePackModalOwnerMenu packName={packName}
										                          openModal={() => setIsDeleteModalOpen(true)}
										                          isModalOpen={isDeleteModalOpen}
										                          closeModal={() => setIsDeleteModalOpen(false)}
										                          handleDeletePack={handleDeletePack}
										/>
										<Link to={PATH.learn + packId}>
												<div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
														<SchoolOutlined/>
														Learn
												</div>
										</Link>
								</Paper>
						}
				</div>
		)
}
