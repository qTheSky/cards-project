import React, {useState} from 'react';
import s from 'common/components/EditableText/EditableText.module.scss'
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

		const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
				if (e.key === 'Enter') changeTextHandle()
		}

		return (
				<div>
						{edit
								? <TextField variant="standard"
								             onBlur={changeTextHandle}
								             onKeyDown={onEnterPress}
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
