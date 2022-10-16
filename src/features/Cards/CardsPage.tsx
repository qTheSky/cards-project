import React from 'react';
import {useParams} from 'react-router-dom';

export const CardsPage = () => {
		const {id}: any = useParams()
		console.log(id)
		return (
				<div>
						CardsPage
				</div>
		);
};
