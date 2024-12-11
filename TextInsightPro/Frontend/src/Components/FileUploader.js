import React, { useState } from 'react';
// import './App.css';
import YourComponent from './YourComponent';
import { useDispatch } from 'react-redux';
import { setFileData1 } from '../state/fileDataSlice';
import upload from '../images/upload.png'
const FileUploader = (props) => {
  const [fileData, setFileData] = useState(null);
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      setFileData(parseCSV(content));
    };

    reader.readAsText(file);
  };

  const parseCSV = (content) => {
    const rows = content.split('\n');
    const headers = rows[0].split(',');

    const data = [];
    for (let i = 1; i <= 50 && i < rows.length; i++) {
      const rowData = rows[i].split(',');
      const rowObject = {};
      headers.forEach((header, index) => {
        rowObject[header] = rowData[index];
      });
      data.push(rowObject);
    }

    return { headers, data };
  };

  dispatch(setFileData1(fileData));
console.log(JSON.stringify(fileData,null,2)+"8888")

  return (
    <>
    <div className="container">
      <div className="header">
        <h1>Upload CSV</h1>
      </div>
      <div className="file-input">
        <img src={upload}/>
        <input type="file" accept=".csv, .xlsx" style={{textAlign:"center"}}  onChange={handleFileChange} />
      </div>
      <div className="file-preview" style={{ height:fileData===null ?"":"100vh",overflow:"auto"}}>
        {fileData && (
          <div>
            <h2>Preview</h2>
            <table >
              <thead >
                <tr >
                  {fileData.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead >
              <tbody >
                {fileData.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {fileData.headers.map((header, index) => (
                      <td key={index}>{row[header]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
      <button className="btn-primary" disabled={fileData==null?true:false} onClick={props.handelClick} style={{backgroundColor:"skyblue",padding:"5px 5px 5px 5px", borderRadius:"5px", marginTop:"20px",marginBottom:"20px"}}>Get Analysis Report</button>
      </div>
    {/* {showYourComponent && <YourComponent fileData={fileData} />} */}
    </div>
    
    </>
  );
};

export default FileUploader;
