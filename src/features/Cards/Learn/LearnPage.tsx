import {CircularProgress, Container} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {BackToPackListLink} from 'common/components/BackToPackListArrow/BackToPackListLink';
import {useAppDispatch, useAppSelector} from 'app/store';
import {fetchCards, resetCardsState, setCardsSearchParams} from 'features/Cards/cards-reducer';
import {Navigate, useParams} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {getIsLoggedIn} from 'features/Auth/selectors';
import {getCards, getPackName} from 'features/Cards/selectors';
import {getNextCardToLearn} from 'utils/getNextCardToLearn';
import {LearnPaper} from 'features/Cards/Learn/LearnPaper';


export const LearnPage = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const packName = useAppSelector(getPackName)
    const cards = useAppSelector(getCards)
    const [displayedCard, setDisplayedCard] = useState<any>({})


    useEffect(() => {
        return () => {
            dispatch(setCardsSearchParams({pageCount: 10}))
            dispatch(resetCardsState())
            setDisplayedCard({})
        }
    }, [])

    useEffect(() => {
        dispatch(setCardsSearchParams({pageCount: 99999}))
        dispatch(fetchCards(packId))
    }, [])


    useEffect(() => {
        if (!!packName && !displayedCard._id) {
            setDisplayedCard(getNextCardToLearn(cards))
        }
        //when card.shots changed set it to state it needs when user click next question shots count increments at once
        const card = cards.find(card => card._id === displayedCard._id)
        if (card) {
            setDisplayedCard(card)
        }
    }, [cards])

    if (!isLoggedIn) return <Navigate to={PATH.login}/>
    return (
        <div>
            <Container>
                <BackToPackListLink/>
                <h1 style={{textAlign: 'center', marginBottom: '20px'}}>{packName ? packName : 'loading...'}</h1>
                {packName
                    ? <LearnPaper displayedCard={displayedCard} setDisplayedCard={setDisplayedCard}/>
                    : <div style={{marginTop: '60px', textAlign: 'center', width: '100%'}}>
                        <CircularProgress/>
                    </div>
                }
            </Container>
        </div>
    )
}