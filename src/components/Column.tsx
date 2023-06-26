import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { sortOptionState, isAddModalOpenState } from "../utils/recoil";
import "../scss/Column.scss";
import { Ticket } from ".";
import { ITicketData } from "../utils/type";

const Column = (props: any) => {
  const [addModalOpen, setisAddModalOpenState] =
    useRecoilState(isAddModalOpenState);
  const sortBy = useRecoilValue(sortOptionState);
  const [statusColor, setStatusColor] = useState("");
  const [ticketsData, setTicketsData] = useState<ITicketData[]>([]);

  const changeDotColor = (stat: string) => {
    if (stat === "pending") {
      setStatusColor("status-color-yellow");
    }
    if (stat === "accepted") {
      setStatusColor("status-color-violet");
    }
    if (stat === "resolved") {
      setStatusColor("status-color-green");
    }
    if (stat === "rejected") {
      setStatusColor("status-color-red");
    }
  };

  const addClickHandle = () => {
    setisAddModalOpenState(true);
  };

  useEffect(() => {
    changeDotColor(props.status);
    let sortedTickets: ITicketData[];
    if (sortBy === "createDate") {
      //sort Ticket state by createDate
      sortedTickets = [...props.data].sort(
        (a: ITicketData, b: ITicketData) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "latestUpdate") {
      //sort Ticket state by lastestUpdate
      sortedTickets = [...props.data].sort(
        (a: ITicketData, b: ITicketData) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } else {
      sortedTickets = props.data; // If no sorting option is selected
    }
    setTicketsData(sortedTickets);
  }, [props, sortBy]);

  return (
    <div className='column-container'>
      <div className='column-header'>
        <div
          className={statusColor}
          style={{ marginRight: "5px", fontSize: "30px" }}>
          •
        </div>
        <div className='status'>
          {props.status} ({ticketsData.length})
        </div>
      </div>
      <div className='column-ticket-area'>
        {ticketsData.map((dat: ITicketData) => {
          const { id } = dat;
          return (
            <div key={id}>
              <Ticket ticketData={dat} status={props.status}></Ticket>
            </div>
          );
        })}
      </div>
      <button className='add-ticket-button' onClick={addClickHandle}>
        + Add Ticket
      </button>
    </div>
  );
};

export default Column;
