import {Skeleton, TableBody, TableCell, TableRow} from '@mui/material';
import React from 'react';

export const PacksTableSkeleton = () => {
		const tenElements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		return (
				<TableBody>
						{tenElements.map(el => <TableRow>
										<TableCell><Skeleton animation="wave"/></TableCell>
										<TableCell><Skeleton animation="wave"/></TableCell>
										<TableCell><Skeleton animation="wave"/></TableCell>
										<TableCell><Skeleton animation="wave"/></TableCell>
										<TableCell><Skeleton animation="wave"/></TableCell>
								</TableRow>
						)}
				</TableBody>
		);
};
