import { useRecoilValue } from "recoil";
import { filterStatusState, catTicketsState } from "../utils/recoil";
import "../scss/Kanban.scss";
import { Column } from ".";

const Kanban = () => {
  const filter = useRecoilValue(filterStatusState);
  const catTickets = useRecoilValue(catTicketsState);

  return (
    <div className='kanban-container'>
      {filter.pending == true ? (
        <Column data={catTickets.pending} status='pending'></Column>
      ) : (
        ""
      )}
      {filter.accepted == true ? (
        <Column data={catTickets.accepted} status='accepted'></Column>
      ) : (
        ""
      )}
      {filter.rejected == true ? (
        <Column data={catTickets.rejected} status='rejected'></Column>
      ) : (
        ""
      )}
      {filter.resolved == true ? (
        <Column data={catTickets.resolved} status='resolved'></Column>
      ) : (
        ""
      )}
    </div>
  );
};

export default Kanban;
