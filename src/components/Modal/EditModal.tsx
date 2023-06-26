import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isEditModalOpenState, editModalDataState } from "../../utils/recoil";
import axios from "axios";
import "../../scss/EditModal.scss";
import { validateForm } from "../../utils/utils";

interface ITicketData {
  id: number;
  title: string;
  description: string;
  email: string;
  phone: string;
  lineId: string;
  status: string;
}

const EditModal = () => {
  const [modalOpen, setModalOpen] = useRecoilState(isEditModalOpenState);
  const ticketData = useRecoilValue(editModalDataState) as ITicketData;
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const [title, setTitle] = useState(ticketData?.title || "");
  const [description, setDescription] = useState(ticketData?.description || "");
  const [email, setEmail] = useState(ticketData?.email || "");
  const [phone, setPhone] = useState(ticketData?.phone || "");
  const [lineId, setLineId] = useState(ticketData?.lineId || "");
  const [status, setStatus] = useState(ticketData?.status || "");

  useEffect(() => {
    if (ticketData) {
      setTitle(ticketData.title || "");
      setDescription(ticketData.description || "");
      setEmail(ticketData.email || "");
      setPhone(ticketData.phone || "");
      setLineId(ticketData.lineId || "");
      setStatus(ticketData.status || "");
    }
  }, [ticketData]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleEdit = async () => {
    try {
      if (!validateForm(title, description, email, phone)) {
        return;
      }
      const updatedTicket = {
        title,
        description,
        email,
        phone,
        lineId,
        status,
      };
      await axios.put(`${API_URL}/ticket/${ticketData.id}`, updatedTicket);
      alert("Ticket updated successfully");

      handleClose();
      window.location.reload();
    } catch (error: unknown) {
      console.error(error);
      alert("An error occurred while updating the ticket");
    }
  };

  if (!modalOpen || !ticketData) {
    return null;
  }

  return (
    <div className='modal-container fade-in'>
      <div className='edit-modal'>
        <div className='modal-header'>Edit</div>
        <div className='label'>Title</div>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={128}
          placeholder='Title or article of a ticket'
        />
        <div className='label'>Description</div>
        <textarea
          className='edit-description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={2048}
          placeholder='Decription or details of a ticket'
        />
        <div className='label'>Email</div>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={128}
          placeholder='example@pramool.com'
        />
        <div className='label'>Phone</div>
        <input
          type='string'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          maxLength={10}
          placeholder='0987648392'
        />
        <div className='label'>Line ID</div>
        <input
          type='text'
          value={lineId}
          onChange={(e) => setLineId(e.target.value)}
          required
          maxLength={18}
          placeholder='linemyline'
        />
        <div className='label'>Status</div>
        <div>
          <select
            className='dropdown-minimal'
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value='pending'>Pending</option>
            <option value='accepted'>Accepted</option>
            <option value='resolved'>Resolved</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>
        <div className='button-area'>
          <button className='close-button' onClick={handleClose}>
            Close
          </button>
          <button className='confirm-button' onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
