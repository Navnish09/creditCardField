import React from 'react';
import classes from './InputBlock.module.scss';

export const InputBlock = ({ inputRef, hideText, ...props }) => {
	const type = hideText ? "password" : "text";

	
	return (
		<input type={type} className={classes.inputBlock} ref={inputRef} {...props} />
	);
}

export default InputBlock;