import DeleteIcon from '../DeleteIcon/DeleteIcon';

import classes from './List.module.scss';

export const List = ({ items, onItemDelete }) => (
	<ul className={classes.list} >
		{
			items.map((item, index) => (
				<li key={`${item}-${index}`} className={classes.listItem}>
					<div>{item}</div>
					<DeleteIcon onClick={() => onItemDelete(item)} />
				</li>
			))
		}
	</ul>
);

export default List;