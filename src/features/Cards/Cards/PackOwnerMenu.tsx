import React, {useState} from 'react';
import packOwnerMenu from 'assets/packOwnerMenu.svg'
import {EditPackModal} from 'features/Packs/PacksModals/EditPackModal';
import {Link, Navigate, useParams} from 'react-router-dom';
import {useAppSelector} from 'app/store';
import {DeletePackModal} from 'features/Packs/PacksModals/DeletePackModal';
import {PATH} from 'app/RouteVariables';
import {SchoolOutlined} from '@mui/icons-material';
import {Paper} from '@mui/material';

export const PackOwnerMenu = () => {
    const {packId} = useParams() as { packId: string }

    const {packName, packPrivate, packDeckCover} = useAppSelector(state => state.cards.cardsState)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isPackDeleted, setIsPackDeleted] = useState(false)

    if (isPackDeleted) return <Navigate to={PATH.main}/>
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
                    <EditPackModal view="packOwnerMenu" id={packId} deckCover={packDeckCover} packName={packName}
                                   isPrivatePack={packPrivate}/>
                    <DeletePackModal setIsPackDeleted={() => setIsPackDeleted(true)} view="packOwnerMenu"
                                     packName={packName} packId={packId}/>
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
