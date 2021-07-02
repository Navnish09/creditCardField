import './DeleteIcon.css';

const DeleteIcon = ({item, deleteItem}) => {
    const handleClick = () => {
        deleteItem(item);
    }

    return ( 
        <>
        <span onClick={handleClick}>
            <strong>x</strong>
        </span>
        </>
     );
}
 
export default DeleteIcon;