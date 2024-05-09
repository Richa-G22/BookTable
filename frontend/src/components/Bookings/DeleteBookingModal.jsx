import { deleteBookingThunk } from "../../redux/bookings";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './DeleteBookingModal.css';

function DeleteBookingModal( {id} ) {
  console.log('......bookingId inside deleteModal...',id, typeof(id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
 
  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Cancellation</h2>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to cancel this booking? </p>
            <button className='yes-button' onClick={() => dispatch(deleteBookingThunk(id))
                    .then(() => closeModal())} >Yes (Cancel Booking)
            </button>
            <button className='no-button' onClick={() => closeModal()}>No (Keep Booking)
            </button><br></br>           
        </div>   
  )
}

export default DeleteBookingModal;