import React, { useEffect, useState } from 'react';
import MyTable from '../table/MyTable';

const CalendarApp = ({ role, costPerHour}) => {
  const currentYear = new Date().getFullYear();
  const [sundayDates, setSundayDates] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [selectedDates, setSelectedDates] = useState([]);
  const [startWeek, setStartWeek] = useState('');
  const [endWeek, setEndWeek] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [table,setTable]=useState(false)
  const [totalWeeks, setTotalWeeks] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [weekRange,setWeekRange]=useState(false);

  useEffect(() => {
    calculateSundayDates();
  }, [year]);
  useEffect(()=>{
    setTotalCost(hoursPerWeek * totalWeeks * costPerHour)},[totalWeeks])

  useEffect(() => {
    console.log('totalWeeks:', totalWeeks);
    console.log('totalCost:', totalCost);
  }, [totalWeeks]);

  const calculateSundayDates = () => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() === 0) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setSundayDates(dates);
  };

  const handleDateClick = (date) => {
    const isSelected = selectedDates.includes(date);
    if (isSelected) {
      setSelectedDates(selectedDates.filter((selectedDate) => selectedDate !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handlePreviousYear = () => {
    setYear(year - 1);
  };

  const handleNextYear = () => {
    setYear(year + 1);
  };

  const handleRangeClick = () => {
    // Perform action with selected dates, start week, end week, and hours per week
    console.log('Start Week:', startWeek);
    console.log('End Week:', endWeek);
    console.log('Hours/Week:', hoursPerWeek);

    const startDateIndex = parseInt(startWeek) - 1; // Subtract 1 to convert to zero-based index
    const endDateIndex = parseInt(endWeek) - 1; // Subtract 1 to convert to zero-based index

    const selectedWeeks = sundayDates.slice(startDateIndex, endDateIndex + 1);

    setSelectedDates(selectedWeeks);

    setTotalWeeks(endWeek - startWeek + 1);
    console.log(hoursPerWeek * totalWeeks * costPerHour);
    setWeekRange(!weekRange)
  };

  const handleOkClick =()=>{
    setTable(true);
  }



  const handleCloseClick = () => {
   setTable(true)
  };

  return (
    <>
    {table !== true ?(
      <>
      
    <div style={{ display: 'grid', gridTemplateColumns: '75% 25%', gap: '20px',padding:"20px"}}>

      <div>
      <div style={{display:"flex",backgroundColor:'blue',color:'white',justifyContent:"space-around",borderRadius:"50px 10px"}}>
       <div >
        Role:  {role}
       </div>
       <div>
        Cost/hour:  ${costPerHour}
       </div>
       <div>
        View:  Weekly
       </div>

      </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', cursor: 'pointer',marginTop:"20px" }}>
          <div onClick={handlePreviousYear} style={{ fontSize: '20px', color: 'grey' }}>
            {year - 1}
          </div>
          <div style={{ fontSize: '30px', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>{year}</div>
          <div onClick={handleNextYear} style={{ fontSize: '20px', color: 'grey' }}>
            {year + 1}
          </div>
        </div>
        <div
          style={{
            boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)"
          }}
        >
          <div style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(9, 1fr)',
             gap: '10px',
             gridAutoRows: 'minmax(30px, auto)',
             marginTop:"5px",
             padding:'20px'
          }}>
          {sundayDates.map((date, index) => {
            const isSelected = selectedDates.includes(date);
            const dateStyle = {
              border: isSelected ? '3px solid lightblue' : '1px solid grey',
              padding: '13px',
              textAlign: 'center',
              margin: 'auto',
              width: '100%',
              height: 'fit-content',
              boxSizing: 'border-box',
              borderRadius: '10px',
              backgroundColor: 'transparent',
            };
            return (
              <div key={index} style={dateStyle} onClick={() => handleDateClick(date)}>
                <div>{date.getDate()}</div>
                <div style={{ fontSize: '10px' }}>{date.toLocaleString('default', { month: 'short' })}</div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
      <div>
       
          {weekRange !== true ?(
             <div
             style={{
               background: '#6FE09A',
               borderRadius: '10px',
               height: 'fit-content',
               width: 'fit-content',
               marginLeft: '10%',
               marginTop: '10%',
             }}
           >
          <div style={{ padding: '20px' }}>
            <div>
              <label htmlFor="startWeek" style={{ display: 'block' }}>
                Start Week
              </label>
              <input
                type="text"
                id="startWeek"
                value={startWeek}
                onChange={(e) => setStartWeek(e.target.value)}
                style={{
                  border: 'none',
                  borderBottom: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  padding: '5px',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div>
              <label htmlFor="endWeek" style={{ display: 'block', marginTop: '20%' }}>
                End Week
              </label>
              <input
                type="text"
                id="endWeek"
                value={endWeek}
                onChange={(e) => setEndWeek(e.target.value)}
                style={{
                  border: 'none',
                  borderBottom: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  padding: '5px',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div>
              <label htmlFor="hoursPerWeek" style={{ display: 'block', marginTop: '20%' }}>
                Hours/Week
              </label>
              <input
                type="text"
                id="hoursPerWeek"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                style={{
                  border: 'none',
                  borderBottom: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  padding: '5px',
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>
          </div>
          ):(<>
          <div
             style={{
               background: '#00bfff',
               borderRadius: '10px',
               height: 'fit-content',
               width: 'fit-content',
               marginLeft: '10%',
               marginTop: '10%',
               color:'white'
             }}
           >
            <div style={{display:"flex",padding:"20px",gap:"20px"}}>
              <div >
                <div>
                  <div>Hours/week</div>
                  <div style={{marginTop:"5px"}}>{hoursPerWeek!== "" ? hoursPerWeek :0 }</div>
                </div>
                <div style={{marginTop:"10px"}}>
                  <div>Total Weeks</div>
                  <div style={{marginTop:"5px"}}>{totalWeeks!==""?totalWeeks:0}</div>
                </div>
              </div>
              <div style={{backgroundColor:"white",color:"black",padding:"10px",display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"column",borderRadius:"10px"}}>
                <div>Total Cost</div>
                <div>${totalCost!==""?totalCost:0}</div>
              </div>
            </div>
            
            
            
           </div>
          </>)}
        
        <div style={{ marginTop: '10%' }}>
          <button
            style={{
              backgroundColor: '#6C009B',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              marginRight: '5%',
            }}
            onClick={handleRangeClick}
          >
            Create Range
          </button>
        </div>
        <div>
          <div style={{ marginTop: '30%', display: 'flex', justifyContent: 'space-around' }}>
            <button
              style={{
                backgroundColor: 'darkblue',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
              onClick={handleOkClick}
            >
              OK
            </button>
            <button
              style={{
                backgroundColor: 'darkblue',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
              onClick={handleCloseClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  ):(<>
  <MyTable weeks={totalWeeks} cost={totalCost} />
  </>)}
    </>
  );
};

export default CalendarApp;