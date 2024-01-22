import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Log from '../../log';


// function LogCard({ log }) {
//     return (
//       <div className="card border border-gray-200 rounded shadow p-4 mb-4">
//         <p className="font-bold">Timestamp: <span className="font-normal">{log.timestamp}</span></p>
//         <p className="font-bold">Level: <span className="font-normal">{log.level}</span></p>
//         <p className="font-bold">Message: <span className="font-normal">{log.message}</span></p>
//         <p className="font-bold">Service: <span className="font-normal">{log.service}</span></p>
//         <p className="font-bold">Host: <span className="spans font-normal">{log.host}</span></p>
//         <p className="font-bold">Status Code: <span className="spans font-normal">{log.statusCode}</span></p>
//         <p className="font-bold">Status Code: <span className="spans font-normal">{log.statusCode}</span></p>
//       </div>
//     );
//   }
  
  // function LogsGroup({ title, logs }) {
  //   return (
  //     <div>
  //       <h2 className="cards text-lg font-bold mb-3">{title}</h2>
  //       {logs.map((log, index) => (
  //         <LogCard key={index} log={log} />
  //       ))}
  //     </div>
  //   );
  // }


function LogsComponent() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(15); // You can adjust the number of logs per page
  const [levelFilter, setLevelFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');
  // const [dateFilter, setDateFilter] = useState('');
  const token = localStorage.getItem('token'); // Obținem token-ul JWT

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://192.168.56.13:5000/logs', {
          method: 'GET',  
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            localStorage.removeItem('token'); // Eliminăm token-ul expirat/invalid
            navigate('/login'); // Redirecționăm către pagina de login
          }
          throw new Error('Failed to fetch logs');
        }

        const logsData = await response.json();
        setLogs(logsData); // Actualizăm starea cu datele primite
      } catch (error) {
        console.error('Error fetching logs:', error);
        // Gestionăm alte erori aici
      }
    };

    fetchLogs();
  }, [navigate, token]);



  // const databaseLogs = currentLogs.filter(log => log.service === "database");
  // const monitoringLogs = currentLogs.filter(log => log.service === "monitoring");
  // const authLogs = currentLogs.filter(log => log.service === "authentication");

  const getLevelClass = (level) => {
    switch(level) {
      case  'info':
        return 'level-info';
      case 'warn':
        return 'level-warn';
      case 'error':
        return 'level-error';
      default:
        return '';
    }
  }



  const handleLevelChange = (e) => {
    setLevelFilter(e.target.value);
  };

  const handleServiceChange = (e) => {
    setServiceFilter(e.target.value);
  };

  const handleSourceCode = (e) => {
    setCodeFilter(e.target.value);
  };


  // const handleDateChange = (e) => {
  //   setDateFilter(e.target.value);
  // };

  // Filter logs based on the current filters
  const filteredLogs = logs
    .filter(log => (levelFilter ? log.level === levelFilter : true))
    .filter(log => (serviceFilter ? log.service === serviceFilter : true))
    .filter(log => (codeFilter ? log.statusCode === Number(codeFilter) : true))
    // .filter(log => (dateFilter ? new Date(log.timestamp).toDateString() === new Date(dateFilter).toDateString() : true));

      // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  //const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog); // Ensure this is defined before using it
    // Apply pagination to filtered logs
    const currentLogs = filteredLogs
    .slice(indexOfFirstLog, indexOfLastLog);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Create page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(logs.length / logsPerPage); i++) {
    pageNumbers.push(i);
  }




  return (

    <div className="logs h-screen p-4">
    <h1 className="title font-bold text-center mb-6 ">Logs Dashboard</h1>
    
        {/* Filters */}
        <div className="filters flex  mb-4">
        <select className="level_section" value={levelFilter} onChange={handleLevelChange}>
          <option value="">All Levels</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>

        <select className='service_level' value={serviceFilter} onChange={handleServiceChange}>
          <option value="">All Services</option>
          <option value="database">Database</option>
          <option value="monitoring">Monitoring</option>
          <option value="authentication">Authentication</option>
        </select>

        
        <select className='sourceCode' value={codeFilter} onChange={handleSourceCode}>
  <option value="">All Codes</option>
  <option value="200">200</option>
  <option value="401">401</option>
  <option value="503">503</option>
</select>

        {/* <input type="date" value={dateFilter} onChange={handleDateChange} /> */}
      </div>


    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">Timestamp</th>
          <th className="px-4 py-2">Level</th>
          <th className="px-4 py-2">Message</th>
          <th className="px-4 py-2">Service</th>
          <th className="px-4 py-2">Host</th>
          <th className="px-4 py-2">Service Code</th>
          <th className="px-4 py-2">Users</th>
          <th className="px-4 py-2">Method</th>
        </tr>
      </thead>
      <tbody>
        {currentLogs.map((log, index) => (
          <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <td className="border px-4 py-2">{log.timestamp}</td>
            <td className={`border px-4 py-2 ${getLevelClass(log.level)}`}>{log.level}</td> 
            <td className="border px-4 py-2">{log.message}</td>
            <td className="border px-4 py-2">{log.service}</td>
            <td className="border px-4 py-2 font-bold">{log.host}</td>
            <td className="border px-4 py-2 font-bold">{log.statusCode}</td>
            <td className="border px-4 py-2 ">{log.user}</td>
            <td className="border px-4 py-2 ">{log.method}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="pagination-container flex justify-center mt-4">
        <nav className='pages'>
          <ul className='pagination'>
            {pageNumbers.map(number => (
              <li key={number} className='page-item'>
                <a onClick={(e) => {
                    e.preventDefault();
                    paginate(number);
                  }} 
                  href="#" 
                  className={`page-link ${currentPage === number ? 'page-link-active' : ''}`}>
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
  </div>




  );
}

export default LogsComponent;



// Strucutra de inceput

//     <div className='logs h-screen'>
//       <h1>Logs</h1>
//       {/* Render your logs here */}
//       {logs.map((log, index) => (
//   <div key={index}>
//     <p>Time: {log.timestamp}</p>
//     <p>Message: {log.message}</p>
//   </div>
// ))}
//     </div>