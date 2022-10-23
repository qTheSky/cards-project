import {useState} from 'react';

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    return {isModalOpen, closeModal, openModal}
}