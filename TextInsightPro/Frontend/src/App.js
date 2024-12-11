import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Navbar from './Components/Navbar';
import TextBox from './Components/TextBox';
import FileUploader from './Components/FileUploader';
import YourComponent from './Components/YourComponent';
import Header from './Components/Header';
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Loder from './Components/Loder';
import LandingPage from './Components/LandingPage';
import FlipkartCommentScraper from './Components/FlipkartCommentScraper'
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showYourComponent, setShowYourComponent] = useState(false);
  const [showScrapComponent, setShowScrapComponent] = useState(false);
  const fileData = useSelector((state) => state.fileData.fileData);
  console.log(isLoading+"??")
  const  handelClick=()=>{
    setShowYourComponent(true)
    setIsLoading(true)
    const loaderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust the duration (in milliseconds) as needed

    return () => clearTimeout(loaderTimeout);
    
  }
  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000); 

    return () => clearTimeout(loaderTimeout);
  }, []);
  return (
    <>
  
      <Routes>
        <Route path="/" element={<LandingPage/> }/>
        <Route path="csv-analysis" element={!showYourComponent ? <><Header /><FileUploader handelClick={handelClick} /></> : isLoading ?( <Loder /> ):
        <><Header />
          <YourComponent /></>} />
          {/* <Route index element={<Home />} /> */}
          <Route path="flipkart-analysis" element={fileData==null?<><Header /><FlipkartCommentScraper/></>: isLoading ?( <Loder /> ):
        <><Header />
          <YourComponent /></>} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    

  {/* <Navbar/>
  <TextBox/> */}
      {/* {!showYourComponent ? <><Header /><FileUploader handelClick={handelClick} /></> : isLoading ?( <Loder /> ):
        <><Header />
          <YourComponent /></>} */}
  {/* <LandingPage/> */}
  {/* <FlipkartCommentScraper/> */}
  
  </>
  );
  
}

export default App;
