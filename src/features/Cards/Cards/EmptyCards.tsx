import React from 'react';
import {useAppSelector} from 'app/store';
import {AddCardModal} from '../CardsModals/AddCardModal';
import {getAuthUserId} from 'features/Profile/selectors';
import {getPackName, getPackOwnerId} from 'features/Cards/selectors';

export const EmptyCards = () => {
		const authUserId = useAppSelector(getAuthUserId)
		const packUserId = useAppSelector(getPackOwnerId)
		const packName = useAppSelector(getPackName)
		const isOwner = authUserId === packUserId
		return (
				<div>
						<h1 style={{margin: '30px 0'}}>{packName}</h1>
						<div style={{textAlign: 'center'}}>
								<h2 style={{margin: '30px 0', opacity: '0.5', fontWeight: '400'}}>This pack is
										empty.{isOwner && ' Click add new card to fill this pack'}</h2>
								{isOwner && <AddCardModal/>}
						</div>
				</div>
		);
};
