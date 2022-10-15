import React, {useState} from 'react';
import s from './EditableText.module.scss'
import editableText from 'assets/editableName.svg';
import {TextField} from '@mui/material';

type EditableTextPropsType = {
		value: string
		callBack: (newText: string) => void
}

export const EditableText = (props: EditableTextPropsType) => {
		const [edit, setEdit] = useState(false)
		const [newText, setNewText] = useState(props.value)


		const changeTextHandle = () => {
				props.callBack(newText)
				setEdit(false)
		}

		return (
				<div>
						{edit
								? <TextField variant="standard"
								             onBlur={changeTextHandle}
								             value={newText}
								             autoFocus
								             onChange={(e) => setNewText(e.currentTarget.value)}/>
								: <span onDoubleClick={() => setEdit(true)} className={s.profileName}>
								{props.value}
										<img src={editableText} alt="edit"/>
						</span>}
				</div>
		);
};
