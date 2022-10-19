import React from 'react';
import {AddCardModal} from 'features/Cards/CardsModals/AddCardModal';
import {useAppSelector} from 'app/store';
import {useParams} from 'react-router-dom';

export const EmptyCards = () => {
		const {packId} = useParams() as { packId: string }
		const authUserId = useAppSelector(state => state.profile.profile._id)
		const packUserId = useAppSelector(state => state.cards.cardsState.packUserId)
		const packName = useAppSelector(state => state.cards.cardsState.packName)
		const isOwner = authUserId === packUserId
		return (
				<div>
						<h1 style={{margin: '30px 0'}}>{packName}</h1>
						<div style={{textAlign: 'center'}}>
								<h2 style={{margin: '30px 0', opacity: '0.5', fontWeight: '400'}}>This pack is
										empty.{isOwner && ' Click add new card to fill this pack'}</h2>
								{isOwner && <AddCardModal packId={packId}/>}
						</div>
				</div>
		);
};
