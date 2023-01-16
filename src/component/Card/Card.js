import { useEffect, useRef, useState } from "react";
import { KEY_NAMES } from "../../helpers/constants";
import {
	focusNextElement,
	focusPreviousElement,
	limitInputTextLength,
	getEmptyArray,
	splitText,
	focusElement,
} from "../../helpers/helper";
import InputBlock from "../SmallInput/SmallInput";
import Button from "../SubmitButton/SubmitButton";

import classes from "./Card.module.scss";

export const Card = ({ onSubmit, valueLength, blockCount, requiredLength }) => {
	const EMPTY_INPUT_BLOCKS = getEmptyArray(blockCount);

	const [cardNum, setCardNum] = useState(EMPTY_INPUT_BLOCKS);
	const [validValue, setValidValue] = useState(false);
	const inputsRef = useRef({});

	const getRefElem = (index) => inputsRef.current[index];

	// Submit the value 
	const submitValue = () => {
		onSubmit(cardNum.join("-"));
		
		// Reset input blocks
		setCardNum(EMPTY_INPUT_BLOCKS);  
		
		// Set focus on the first element. 
		focusElement(getRefElem(0));
	}


	const handleChange = (event, index) => {
		const inputElem = event.target;
		const value = inputElem.value.trim();
		/**
		 * Return if the value is not a number.
		 *  */
		if (isNaN(value)) return;

		// Limit value length to VALUE_LIMIT
		limitInputTextLength(inputElem, valueLength);

		// Focus on next element if the length of the value has reached the valueLimit    
		(value.length >= valueLength) && focusNextElement(getRefElem([index + 1]));

		// Focus on previous element if value is empty    
		(!value.length) && focusPreviousElement(getRefElem([index - 1]), inputElem);

		/**
		 * Set cardnum only if input has reached to valueLimit
		 */
		(value.length <= valueLength) &&
			setCardNum(prev => prev.map((num, i) => (i === index) ? value : num))
	}


	const handleKeyDown = (e, index) => {
		let inputElem = e.target;

		/**
		 * Detect Backspace button and set focus to previous input if current is empty 
		 * (Only usefull if we decide to keep the inputs enabled)
		 */
		if (!inputElem.value && e.key === KEY_NAMES.Backspace) {
			focusPreviousElement(getRefElem([index - 1]), inputElem);
		}

		// Submit value on Enter key press
		if (index === blockCount - 1) {
			if (e.key === KEY_NAMES.Enter && validValue) {
				submitValue();
			}
		}
	}

	const handleFocus = (e, index) => {
		const prevElem = getRefElem([index - 1]);
		/**
		 * Prevent user from focusing on the next element before filling the current one
		 * (Only usefull if we decide to keep the inputs enabled)
		 * */
		if (prevElem && !prevElem.value) return;
	}


	const handlePaste = (e, index) => {
		e.preventDefault();
		// Allow paste on first field only
		if (index !== 0) return;

		/**
		 * Get copied text from clipboard. 
		 * (Permission is not required, As clipboard is called inside paste event)
		 * */
		const value = (e.clipboardData || window.clipboardData).getData('Text');

		// Return if the value is not a number.
		if (isNaN(value)) return;

		// Get text splitted with each chunck having value length as valueLimit
		const chunkedValues = splitText(value, valueLength);         

		/**
		 * Using this as loop limit will help us in deciding the input focus
		 * For E.g. If paste a value having 8 numbers, The focus will be on 3rd input not
		 * on the last one 
		 *  */
		const inputReach = (chunkedValues.filter((value) => value)).length;
		focusElement(inputsRef.current[inputReach-1]);


		Object.keys(inputsRef.current).forEach((input, inpIndex) => {
			if (inpIndex < inputReach - 1){
				focusNextElement(inputsRef.current[inpIndex + 1]);
			}
		});

		/**
		 * Setting values in Cardnum also to keep it in sync with inputs
		 */
		setCardNum(chunkedValues);
	}

	useEffect(() => {
		setValidValue((cardNum.join("").length === requiredLength));
	}, [cardNum, requiredLength])


	return (
		<div className={classes.cardContainer}>
			<div className={classes.fieldContainer}>
				<div className={classes.fields}>

					{
						cardNum.map((data, index) => (
							<InputBlock
								key={index}
								value={data}
								inputRef={(element) => inputsRef.current[index] = element}
								disabled={(index !== 0) && !data}
								
								onFocus={(e) => handleFocus(e, index)}
								onChange={(e) => handleChange(e, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
								onPaste={(e) => handlePaste(e, index)}
							/>

						))
					}
					<p className={classes.note}>*Only numbers are allowed</p>

				</div>

				<div className={classes.button}>
					<Button text="Submit" onClick={submitValue} disabled={!validValue && true} />
				</div>

			</div>
		</div>
	)
}

export default Card;