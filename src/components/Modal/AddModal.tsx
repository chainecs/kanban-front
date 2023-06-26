import { useState } from "react";
import { useRecoilState } from "recoil";
import { isAddModalOpenState } from "../../utils/recoil";
import axios from "axios";
import "../../scss/AddModal.scss";
import { validateForm } from "../../utils/utils";

const AddModal = () => {
  const [modalOpen, setModalOpen] = useRecoilState(isAddModalOpenState);
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");
  const [status, setStatus] = useState("pending");

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setEmail("");
    setPhone("");
    setLineId("");
    setStatus("pending");
    setModalOpen(false);
  };

  const handleAdd = async () => {
    try {
      if (!validateForm(title, description, email, phone)) {
        return;
      }

      const newTicket = {
        title,
        description,
        email,
        phone,
        lineId,
        status,
      };
      await axios.post(`${API_URL}/ticket/create`, newTicket);
      alert("Ticket added successfully");
      handleClose();
      window.location.reload();
    } catch (error: unknown) {
      console.error(error);
      alert("An error occurred while adding the ticket");
    }
  };

  if (!modalOpen) {
    return null;
  }

  return (
    <div className='modal-container fade-in'>
      <div className='edit-modal'>
        <div className='modal-header'>Add</div>
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
          maxLength={20}
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
          <button className='confirm-button' onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
