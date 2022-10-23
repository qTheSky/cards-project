import React from 'react'
import {Button} from "@mui/material";
import {CardModal} from "./CardModal";
import {useModal} from "../../../common/hooks/useModals";
import {createCard, fetchCards} from "../cards-reducer";
import {useAppDispatch} from "../../../app/store";
import {useParams} from "react-router-dom";

export const AddCardModal = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }
    const {isModalOpen, openModal, closeModal} = useModal()

    const handleSave = async (question: string, answer: string, questionImg: string) => {
        await dispatch(createCard({cardsPack_id: packId, question, answer, questionImg}))
        await dispatch(fetchCards(packId))
        closeModal()
    }
    return (
        <>
            <Button variant="contained"
                    onClick={openModal}>
                Add new card
            </Button>
            <CardModal openModal={openModal}
                       title='Add new card'
                       handleSave={handleSave}
                       closeModal={closeModal}
                       open={isModalOpen}/>
        </>
    )
}