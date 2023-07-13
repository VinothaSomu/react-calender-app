import React, { useEffect, useState } from 'react';
import CalendarApp from '../sataivaCalenderApp/Calender';

const initialData = [
  { role: '', region: '', costPerHour: '', weeks: '', cost: '', checked: false }
];

const MyTable = ({ weeks, cost }) => {
  const [weeklyCalendar, setWeeklyCalendar] = useState(false);
  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...data];
    newData[index][name] = value;
    setData(newData);
  };

  useEffect(() => { console.log("weeks,cost", weeks, " , ", cost) }, [weeks, cost])

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index].checked = !newData[index].checked;
    setData(newData);
  };

  const handleSave = () => {
    const selectedRows = data.filter((row) => row.checked);
    // Do something with the selected rows
    console.log(selectedRows);
  };

  const handleDelete = () => {
    const newData = data.filter((row) => !row.checked);
    setData(newData);
  };

  const handleAddRow = () => {
    const newRow = { role: '', region: '', costPerHour: '', weeks: '', cost: '', checked: false };
    setData([...data, newRow]);
  };

  const handleOpenCalendar = (index) => {
    const { role, costPerHour } = data[index];
    setSelectedRow({ role, costPerHour });
    setWeeklyCalendar(true);
  };

  return (
    <div>
      {!weeklyCalendar ? (
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
          <table style={{ borderCollapse: "collapse"}}>
            <thead style={{
              backgroundColor: "#8A2BE2",
              color: "white"
            }}>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}></th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Role</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Region</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Cost/hr</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Weeks</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} style={{ border: "1px solid #ddd" }}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <input
                      type="checkbox"
                      checked={row.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <select
                      name="role"
                      value={row.role}
                      onChange={(event) => handleInputChange(index, event)}
                    >
                      <option value="">Select Role</option>
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                      <option value="Option 3">Option 3</option>
                      <option value="Option 4">Option 4</option>
                    </select>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <select
                      name="region"
                      value={row.region}
                      onChange={(event) => handleInputChange(index, event)}
                    >
                      <option value="">Select Region</option>
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                      <option value="Option 3">Option 3</option>
                      <option value="Option 4">Option 4</option>
                    </select>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <input
                      style={{ border: "none" }}
                      type="text"
                      name="costPerHour"
                      value={row.costPerHour}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <input
                      style={{ border: "none" }}
                      type="text"
                      name="weeks"
                      value={row.weeks}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    <button onClick={() => handleOpenCalendar(index)}>
                      <span role="img" aria-label="calendar">
                        📅
                      </span>
                    </button>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <input
                      style={{ border: "none" }}
                      type="text"
                      name="cost"
                      value={row.cost}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddRow}>Add Row</button>
        </div>
      ) : (
        <CalendarApp
          role={selectedRow.role}
          costPerHour={selectedRow.costPerHour}
        />
      )}
    </div>
  );
};

export default MyTable;