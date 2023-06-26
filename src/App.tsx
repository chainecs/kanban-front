import { useEffect } from "react";
import "./App.css";
import { useRecoilState } from "recoil";
import {
  //ticketsState,
  catTicketsState,
} from "./utils/recoil";
import { Kanban, Header, ViewModal, EditModal, AddModal } from "./components";

import axios from "axios";

function App() {
  //const [tickets, setTickets] = useRecoilState(ticketsState);
  const [catTickets, setCatTickets] = useRecoilState(catTicketsState);

  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${API_URL}/ticket`)
        .then((res) => {
          const data = res.data;
          // setTickets(data); //set all ticket (not categorized) to tickets state
          const categorizedTickets: any = {
            pending: [],
            accepted: [],
            rejected: [],
            resolved: [],
          };
          //categorize ticket by status
          data.forEach((dat: any) => {
            categorizedTickets[dat.status].push(dat);
          });
          setCatTickets(categorizedTickets);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <div className='App'>
      <>
        <Header />
        <Kanban />
        <AddModal />
      </>
      <ViewModal />
      <EditModal />
    </div>
  );
}

export default App;
