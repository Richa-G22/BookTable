import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button style={{backgroundColor: "rgb(141, 4, 4)", color: "white",
  boxShadow: "5px 5px 5px black", height: "3em", width: "8em",cursor: "pointer"}}onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
