import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addToMyList, removeToMyList } from '../Actions/accountActions';

const RemoveToListButton = ({ productId, userId }) => {
let dispatch = useDispatch()

    const RemoveToMyList1 = () => {
        dispatch(removeToMyList(userId, productId));
      };

    return (
        <div style={{width:"10rem"}}>
        <Button onClick={RemoveToMyList1}>Remove to My List</Button>
        </div>
    );
};

export default RemoveToListButton;