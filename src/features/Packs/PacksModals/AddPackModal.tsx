import React from 'react';
import {Button} from '@mui/material';
import {PackModal} from 'features/Packs/PacksModals/PackModal';
import {useModal} from 'common/hooks/useModals';
import {createPack, fetchPacks} from 'features/Packs/packs-reducer';
import {useAppDispatch, useAppSelector} from 'app/store';
import {getIsAppAppMakingRequest} from 'app/selectors';

export const AddPackModal = () => {
		const dispatch = useAppDispatch()
		const {isModalOpen, openModal, closeModal} = useModal()
		const isAppMakeRequest = useAppSelector(getIsAppAppMakingRequest)

		const handleSave = async (name: string, isPrivate: boolean, deckCover: string) => {
				await dispatch(createPack({name, private: isPrivate, deckCover}))
				await dispatch(fetchPacks())
				closeModal()
		}
		return (
				<>
						<Button onClick={openModal} variant="contained" disabled={isAppMakeRequest}>Add New Pack</Button>
						<PackModal closeModal={closeModal}
						           handleSave={handleSave}
						           title="Add new pack"
						           isModalOpen={isModalOpen}/>
				</>
		);
}
