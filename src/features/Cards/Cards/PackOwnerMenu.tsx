import React, {useState} from 'react';
import packOwnerMenu from 'assets/packOwnerMenu.svg'
import {Link, useParams} from 'react-router-dom';
import {useAppSelector} from 'app/store';
import {PATH} from 'app/RouteVariables';
import {SchoolOutlined} from '@mui/icons-material';
import {Paper} from '@mui/material';
import {EditPackModal} from 'features/Packs/PacksModals/EditPackModal';
import {getCardsState} from 'features/Cards/selectors';
import {DeletePackModal} from 'features/Packs/PacksModals/DeletePackModal';

export const PackOwnerMenu = () => {
		const {packId} = useParams() as { packId: string }

		const {packName, packPrivate, packDeckCover} = useAppSelector(getCardsState)
		const [isMenuOpen, setIsMenuOpen] = useState(false)

		return (
				<div style={{position: 'relative'}}>
						<img onClick={() => setIsMenuOpen(!isMenuOpen)} style={{cursor: 'pointer'}} src={packOwnerMenu}
						     alt="packOwnerMenu"/>
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
								}}>
										<EditPackModal view="packOwnerMenu"
										               packId={packId}
										               deckCover={packDeckCover}
										               packName={packName}
										               isPrivatePack={packPrivate}/>
										<DeletePackModal packId={packId}
										                 packName={packName}
										                 view="packOwnerMenu"/>
										<Link to={PATH.learn + packId}>
												<div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
														<SchoolOutlined/>
														Learn
												</div>
										</Link>
								</Paper>
						}
				</div>
		);
};
