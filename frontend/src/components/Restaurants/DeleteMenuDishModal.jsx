import { deleteMenuDishThunk } from "../../redux/restaurants";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './DeleteMenuDishModal.css';

function DeleteMenuDishModal( {restaurantId, menudishId} ) {
  console.log('......menudishId inside deleteModal...',restaurantId, typeof restaurantId, menudishId, typeof menudishId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteMenuDishThunk(restaurantId, menudishId))
    // setUpdateMode(false),
    closeModal()
  }
 
  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Delete</h2>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to delete this dish? </p>
            {/* <button className='yes-button' onClick={() => dispatch(deleteReviewThunk(restaurantId, reviewId))
                    .then(() => closeModal())} >Yes (Delete Review)
            </button> */}
             <button className='yes-button' onClick={handleDelete} >Yes (Delete Dish)
                    
            </button>
            <button className='no-button' onClick={() => closeModal()}>No (Keep Dish)
            </button><br></br>           
        </div>   
  )
}

export default DeleteMenuDishModal;