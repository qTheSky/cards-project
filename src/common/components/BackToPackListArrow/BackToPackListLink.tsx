import React from 'react';
import {PATH} from 'app/RouteVariables';
import {Link} from 'react-router-dom';
import arrow from 'assets/arrow.svg'

export const BackToPackListLink = () => {
		return (
				<div style={{marginTop: '20px', display: 'inline-block'}}>
						<Link to={PATH.main} style={{display: 'flex', gap: '10px'}}>
								<img src={arrow} alt="arrow"/>
								<h3 style={{fontSize: '14px', fontWeight: '400'}}>Back to packs List</h3>
						</Link>
				</div>
		);
};
