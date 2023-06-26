import { useRecoilState, useRecoilValue } from "recoil";
import { isViewModalOpenState, viewModalDataState } from "../../utils/recoil";
import "../../scss/ViewModal.scss";

interface ITicketData {
  id: number;
  title: string;
  description: string;
  email: string;
  phone: string;
  lineId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ViewModal = () => {
  const [modalOpen, setModalOpen] = useRecoilState(isViewModalOpenState);
  const ticketData = useRecoilValue(viewModalDataState) as ITicketData;

  const handleClose = () => {
    setModalOpen(false);
  };

  if (!modalOpen) {
    return null;
  }

  return (
    <div className='modal-container fade-in'>
      <div className='view-modal'>
        <div className='label'>Ticket ID</div>
        <div className='content'>{ticketData.id}</div>
        <div className='label'>Title</div>
        <div className='content-title'>{ticketData.title}</div>
        <div className='label'>Description</div>
        <div className='content'>{ticketData.description}</div>
        <div className='label'>Email</div>
        <div className='content'>{ticketData.email}</div>
        <div className='label'>Phone</div>
        <div className='content'>{ticketData.phone}</div>
        <div className='label'>Line ID</div>
        <div className='content'>
          {ticketData.lineId ? ticketData.lineId : "-"}
        </div>
        <button className='close-button' onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewModal;
