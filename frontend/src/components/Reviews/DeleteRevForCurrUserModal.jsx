import { deleteReviewByIdThunk } from "../../redux/reviews";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './DeleteRevForCurrUserModal.css';

function DeleteRevForCurrUserModal( { reviewId, setUpdateMode} ) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteReviewByIdThunk(reviewId))
    setUpdateMode(false),
    closeModal()
  }
 
  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Delete</h2>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to delete this review? </p>
            {/* <button className='yes-button' onClick={() => dispatch(deleteReviewThunk(restaurantId, reviewId))
                    .then(() => closeModal())} >Yes (Delete Review)
            </button> */}
             <button className='yes-button' onClick={handleDelete} >Yes (Delete Review)
                    
            </button>
            <button className='no-button' onClick={() => closeModal()}>No (Keep Review)
            </button><br></br>           
        </div>   
  )
}

export default DeleteRevForCurrUserModal;