
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addToMyList } from '../Actions/accountActions';

const AddToListButton = ({ productId, userId }) => {
let dispatch = useDispatch()

    const addToMyList1 = () => {
        dispatch(addToMyList(userId, productId));
      };

    return (
        <Button onClick={addToMyList1}>Add to My List</Button>
    );
};

export default AddToListButton;