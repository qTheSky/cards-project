import React from 'react';
import {IconButton, TableCell, TableRow} from '@mui/material';
import {Link} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import dayjs from 'dayjs';
import SchoolIcon from '@mui/icons-material/School';
import {EditPackModal} from 'features/Packs/PacksModals/EditPackModal';
import {DeletePackModal} from 'features/Packs/PacksModals/DeletePackModal';
import {PackType} from 'api/packsApi';
import {useAppSelector} from 'app/store';
import {getAuthUserId} from 'features/Profile/selectors';


interface IProps {
		pack: PackType
}

export const MappedPack = ({pack}: IProps) => {
		const authUserId = useAppSelector(getAuthUserId)
		return (
				<TableRow key={pack._id}>

						<TableCell>
								<Link style={{
										display: 'flex',
										alignItems: 'center',
										gap: '15px',
										width: 'max-content',
										cursor: 'pointer',
								}} to={PATH.pack + pack._id}>
										{pack.deckCover &&
												<img style={{width: '60px', height: '40px', borderRadius: '4px'}}
												     src={pack.deckCover} alt="deckCover"/>
										}
										<span>{pack.name}</span>
								</Link>
						</TableCell>

						<TableCell>{pack.cardsCount}</TableCell>

						<TableCell>{dayjs(pack.updated).format('DD.MM.YYYY HH:mm')}</TableCell>

						<TableCell>{pack.user_name}</TableCell>

						<TableCell sx={{display: 'flex'}}>
								<Link to={PATH.learn + pack._id}>
										<IconButton disabled={pack.cardsCount === 0}>
												<SchoolIcon/>
										</IconButton>
								</Link>
								<EditPackModal packName={pack.name}
								               deckCover={pack.deckCover}
								               isPrivatePack={pack.private}
								               packId={pack._id}
								               disabled={pack.user_id !== authUserId}/>
								<DeletePackModal packId={pack._id}
								                 packName={pack.name}
								                 disabled={pack.user_id !== authUserId}/>
						</TableCell>

				</TableRow>
		)
}
