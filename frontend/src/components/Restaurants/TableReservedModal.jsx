import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './DeleteReviewModal.css';

function TableReservedModal( name, bookingDate, startTime, duration, capacity ) {
  console.log('......inside Modal...',name, bookingDate, startTime, duration, capacity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteReviewThunk(restaurantId, reviewId))
    setUpdateMode(false),
    closeModal()
  }
 
  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Delete</h2>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to delete this review? </p>
                  
        </div>   
  )
}

export default TableReservedModal;