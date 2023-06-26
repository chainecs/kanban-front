import { useEffect, useState } from "react";
import { formatDate } from "../utils/utils";
import "../scss/Ticket.scss";
import { useRecoilState } from "recoil";
import {
  isViewModalOpenState,
  viewModalDataState,
  isEditModalOpenState,
  editModalDataState,
} from "../utils/recoil";

import pencil from "../assets/pencil-solid.svg";

const Ticket = (props: any) => {
  const [squareColor, setSquareColor] = useState("");
  const [ticketData] = useState<any>(props.ticketData);
  const [viewModalOpen, setisViewModalOpenState] =
    useRecoilState(isViewModalOpenState);
  const [viewData, setViewData] = useRecoilState(viewModalDataState);
  const [editModalOpen, setisEditModalOpenState] =
    useRecoilState(isEditModalOpenState);
  const [editData, setEditData] = useRecoilState(editModalDataState);

  const titleClickHandle = () => {
    setisViewModalOpenState(true);
    setViewData(ticketData);
  };

  const editClickHandle = () => {
    setisEditModalOpenState(true);
    setEditData(ticketData);
  };

  const changeColor = (stat: string) => {
    if (stat === "pending") {
      setSquareColor("square square-yellow");
    }
    if (stat === "accepted") {
      setSquareColor("square square-violet");
    }
    if (stat === "resolved") {
      setSquareColor("square square-green");
    }
    if (stat === "rejected") {
      setSquareColor("square square-red");
    }
  };
  useEffect(() => {
    changeColor(props.status);
  }, [props]);
  return (
    <div className='ticket-container'>
      <div className='ticket-top'>
        <div className='ticket-title' onClick={titleClickHandle}>
          {ticketData.title}
        </div>
        <div className={squareColor}></div>
      </div>
      <div className='ticket-bottom'>
        <div>Updated {formatDate(ticketData.updatedAt)}</div>
        <div className='edit-button' onClick={editClickHandle}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='10px'
            viewBox='0 0 512 512'>
            <path d='M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z' />
          </svg>
          <div> Edit</div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
