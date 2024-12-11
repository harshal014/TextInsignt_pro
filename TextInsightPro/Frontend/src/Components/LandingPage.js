import React, { useEffect ,useState} from 'react'
import Navbar from './Navbar'
import Slideshow from './Slideshow';
import images1 from '../images/pro_screen.png'
import images2 from '../images/pro_screen1.png'
import img3 from '../images/pro_screen3.png'
import llmImage from './image.png'
import analysisImage from './visualize.jpeg'
export default function LandingPage() {
 
    const [text, setText] = useState('');
    const [imageIndex, setImageIndex] = useState(0);
    const message = 'Comprehensive Automated Text Analysis Platform';
    const speed = 100; // Adjust the speed as needed
  
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
    const images =[images1,images2,img3]

    useEffect(() => {
      const interval = setInterval(() => {
        setImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 3 seconds
  
      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [images.length]);
  return (
    <>
    <div>
    <Navbar/>
    <div style={{textAlign:"center",marginTop:"50px",height:"50px"}}>
    <h1 style={{fontFamily:"DM Serif Display,serif",fontStyle:"italic",fontWeight:"800"}}>TextInsight Pro</h1>
    <h3 style={{fontFamily:"Roboto,sans-serif",fontWeight:"300"}}>{text}</h3>
    {/* <Slideshow images={[images1,images2]}/> */}
    </div>
    <div  style={{marginTop:"100px"}}>
    <img src={images[imageIndex]} alt={`Image ${imageIndex + 1}`} style={{height:"70%",width:"80%",marginLeft:"10%",borderRadius:"20px",border:"1px solid grey",boxShadow:"0 4px 6px rgba(0, 0, 0, 1)"}}/>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"100px",paddingLeft:"50px",paddingRight:"50px"}}>
        <div className="left"><img src={analysisImage} style={{width:"500px",height:"250px",borderRadius:'20px'}}></img></div>
        <div className="right" style={{padding:"50px 0 0 20px",fontFamily:"DM Serif Display,serif"}}>
            <h2>Instant Data Visualizations & Detailed Insights</h2>
            <p>All-in-one text analysis and data visualization studio. Gain instant insights when you run an analysis on your data</p>
        <ul>
            <li>Dig deeper into your data with greater granularity.</li>
            <li>Create custom charts and visualizations in a blazing fast experience.</li>
            <li>Combine and filter by multiple data inputs, including dates and custom fields.</li>
        </ul>
        </div>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"100px",paddingLeft:"50px",paddingRight:"50px"}}>
       
        <div className="right" style={{padding:"50px 0 0 20px",fontFamily:"DM Serif Display,serif"}}>
            <h2>Pre-built & LLM Models</h2>
            <p>Use ready-made LLM models</p>
        <ul>
            <li>Choose from a range of pre-trained classifiers and extractors for a quick start.</li>
            <li>Easily build topic classifiers, sentiment analysis, entity extractors, and more.</li>
            <li>Import your dataset, define custom tags, and train your models in a simple UI.</li>
        </ul>
        </div>
        <div className="left"><img src={llmImage} style={{width:"500px",height:"250px",borderRadius:'20px'}}></img></div>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"100px",paddingLeft:"100px",paddingRight:"100px"}}>
        <div style={{width:"300px",borderRadius:"8px",boxShadow:"0 4px 6px rgba(0, 0, 0, 1)",padding: "20px",fontFamily:"DM Serif Display,serif" }}>
            <h2>Analysis through CSV</h2>
            <p>Upload an proper csv file to analysis your feedback/comment data</p>
            <a href="/csv-analysis">Learn More →</a> 
        </div>
        <div style={{width:"300px",borderRadius:"8px",boxShadow:"0 4px 6px rgba(0, 0, 0, 1)",padding: "20px",fontFamily:"DM Serif Display,serif"}}>
            <h2>Automated E-Commerce comment analysis</h2>
            <p>Put URL of the product for analysis of the flipkart product</p>
            <a href="/flipkart-analysis">Learn More →</a> 
        </div>
        <div style={{width:"300px",borderRadius:"8px",boxShadow:"0 4px 6px rgba(0, 0, 0, 1)",padding: "20px",fontFamily:"DM Serif Display,serif"}}>
            <h2>Integrate your platform to realtime analysis</h2>
            <p>Comming SOON</p>
            <a href="#">Learn More →</a> 
        </div>
        
    </div>
    <div style={{ backgroundColor: 'white', padding: '10px 0', textAlign: 'center',border:"1px solid black",marginTop:"50px" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBhCnnbdkWxxNKwbc2jyP3cXtf7AYbqMPnMA&usqp=CAU"} alt="Logo" style={{ maxWidth: '80px' }} />
          <h3 style={{marginLeft:"110px"}}>TextInsight Pro</h3>
          <div className="nav-links">
            <a href="#" style={{ marginRight: '20px', color: '#333', textDecoration: 'none', fontSize: '14px' }}>Home</a>
            <a href="#" style={{ marginRight: '20px', color: '#333', textDecoration: 'none', fontSize: '14px' }}>About</a>
            <a href="#" style={{ marginRight: '20px', color: '#333', textDecoration: 'none', fontSize: '14px' }}>Services</a>
            <a href="#" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }}>Contact</a>
          </div>
        </div>
        <div className="social-icons">
          <a href="#"><img src="/facebook-icon.png" alt="Facebook" style={{ marginRight: '15px' }} /></a>
          <a href="#"><img src="/twitter-icon.png" alt="Twitter" style={{ marginRight: '15px' }} /></a>
          <a href="#"><img src="/linkedin-icon.png" alt="LinkedIn" style={{ marginRight: '15px' }} /></a>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>© 2024 TextInsight Pro. All rights reserved.</p>
      </div>
    </div>

    </div>

    </>
  )
}
