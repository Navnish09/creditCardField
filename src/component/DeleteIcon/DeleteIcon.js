import classes from './DeleteIcon.module.scss';

export const DeleteIcon = ({ onClick }) => (
    <span onClick={onClick} className={classes.iconWrapper}>
        <strong>x</strong>
    </span>
);

export default DeleteIcon;