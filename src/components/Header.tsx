import { useRecoilState } from "recoil";
import { filterStatusState, sortOptionState } from "../utils/recoil"; //
import "../scss/Header.scss";

const Header = () => {
  const [selectedOption, setSelectedOption] = useRecoilState(sortOptionState);
  const [selectedStatuses, setSelectedStatuses] =
    useRecoilState(filterStatusState);

  //Select Filter
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  //Select Sorting
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [event.target.value]: event.target.checked,
    }));
  };

  return (
    <div className='header-container'>
      <h2>Kanban Board</h2>
      <div className='filter-container'>
        <div className='header-label'>Filter </div>
        <div className='filter-select'>
          <div>
            <input
              type='checkbox'
              value='pending'
              checked={selectedStatuses["pending"]}
              onChange={handleStatusChange}
            />
            <label> Pending</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='accepted'
              checked={selectedStatuses["accepted"]}
              onChange={handleStatusChange}
            />
            <label> Accepted</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='rejected'
              checked={selectedStatuses["rejected"]}
              onChange={handleStatusChange}
            />
            <label> Rejected</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='resolved'
              checked={selectedStatuses["resolved"]}
              onChange={handleStatusChange}
            />
            <label> Resolved</label>
          </div>
        </div>
      </div>
      <div className='sort-container'>
        <div className='header-label'>Sort</div>
        <div className='sort-select'>
          <div>
            <input
              type='radio'
              id='createDate'
              value='createDate'
              checked={selectedOption === "createDate"}
              onChange={handleOptionChange}
            />
            <label htmlFor='createDate'> by Lastest Created </label>
          </div>
          <div>
            <input
              type='radio'
              id='latestUpdate'
              value='latestUpdate'
              checked={selectedOption === "latestUpdate"}
              onChange={handleOptionChange}
            />
            <label htmlFor='latestUpdate'> by Latest Updated</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
