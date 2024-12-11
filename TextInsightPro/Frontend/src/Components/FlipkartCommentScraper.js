import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setFileData1 } from '../state/fileDataSlice';
import processing from '../images/processing.gif'

function FlipkartCommentScraper() {
  const [productUrl, setProductUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const message = 'provide a product URL to get the automated comprensive analysis';
  const speed = 100; 
  useEffect(() => {
    let timer = setTimeout(() => {
      if (text.length < message.length) {
        setText(message.substring(0, text.length + 1));
      } else {
        // After typing the whole message, clear the text after a delay
        setTimeout(() => setText(''), 2000); // Delay for 2 seconds before clearing
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, message]);
  const fetchComments = async () => {
    
    setLoading(true);
    try {
      let comment=[]
      const response = await axios.get('http://127.0.0.1:5000/scp', { params: { url: productUrl } });
      // setComments(response.data);
      console.log(JSON.stringify(response,null,2)+"010101")
      response.data.forEach(item=>{
        const data= {
          "Name":item.author ,
          "Ratings":item.rating ,
          "Comments\r":item.text
        }
        comment.push(data)
      })
     console.log(JSON.stringify(comment,null,2)+"4444")
     dispatch(setFileData1({data:comment}));
     setComments(comment)
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{width:"100%", textAlign:"center",height:"100px"}}>
        <h1 style={{fontFamily:"DM Serif Display,serif",fontStyle:"italic",fontWeight:"800"}}>Upload URL here</h1>
        <span style={{fontFamily:"Roboto,sans-serif",fontWeight:"300",fontSize:"17px"}}>{text}</span>
      </div>
      <div style={{display:"flex",justifyContent:"center",marginTop:"50px"}}>
      <input
        type="text"
        value={productUrl}
        onChange={e => setProductUrl(e.target.value)}
        placeholder="Enter Flipkart product URL"
        style={{borderRadius:"10px",height:"40px",width:"500px"}}
      />
      <button onClick={fetchComments} disabled={!productUrl || loading} style={{marginLeft:"30px",borderRadius:"10px",backgroundColor:"skyblue",color:"black"}}>
        {loading ? 'Fetching Comments...' : 'Fetch Comments'}
      </button>
      </div>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"100px"}}>
      {loading?<img src={processing} alt="Please wait..." />:""}
      </div>
      {/* {comments.length > 0 && (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default FlipkartCommentScraper;
