import React, { useEffect, useState, useRef } from "react";
import { query } from '../Api';
import { useSelector } from 'react-redux';
import smile from '../images/smiley-icon.png';
import sad from '../images/neutral-face-emoji-icon.png'
import WordCloud from 'wordcloud';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Label
} from "recharts";
const RADIAN = Math.PI / 180;
const YourComponent = () => {
  // Sample data for comments and sentiment analysis
  const [sentimentData,setSentimentData] = useState([])
  const [sentimentResult,setSentimentresult]= useState([])
  const [positiveCount,setPositiveCount]= useState()
  const [negativeCount,setNegativeCount]= useState()
  const [neutralCount,setNeutralCount]= useState()
  const [summaryData,setSummaryData]= useState()
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); 
  const wordCloudRef = useRef(null);
  const commentsData = [
    { comment: "This is a positive comment.", sentiment: "Positive" },
    { comment: "This is a neutral comment.", sentiment: "Positive" },
    { comment: "This is a negative comment.", sentiment: "Negative" },
    // Add more comments as needed
  ];
  const fileData = useSelector((state) => state.fileData.fileData);
  // console.log(JSON.stringify(fileData.data, null, 2) + "121212")
  const data = [
    { name: "Positive", value: positiveCount, color: "#00ff00", emoji: '😊' },
    { name: "Negative", value: negativeCount, color: "#ff0000", emoji: '😐' },
    { name: "Neutral", value: neutralCount, color: "#0000ff", emoji: '😞' },
  ];
  const CustomLabel = ({ viewBox, value, x, y }) => (
    <text x={x + viewBox.width / 2} y={y + viewBox.height / 2} fill="#fff" textAnchor="middle" dominantBaseline="middle">
      {value}
    </text>
  );
  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;
  const value = 50;
  const needle = (value, data, cx, cy, iR, oR, color) => {
      let total = 0;
      data.forEach((v) => {
        total += v.value;
      });
      const ang = 180.0 * (1 - value / total);
      const length = (iR + 2 * oR) / 3;
      const sin = Math.sin(-RADIAN * ang);
      const cos = Math.cos(-RADIAN * ang);
      const r = 5;
      const x0 = cx + 5;
      const y0 = cy + 5;
      const xba = x0 + r * sin;
      const yba = y0 - r * cos;
      const xbb = x0 - r * sin;
      const ybb = y0 + r * cos;
      const xp = x0 + length * cos;
      const yp = y0 + length * sin;

      return [
        <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
      ];
    };

  const data01 = [
    { name: "Positive", value: positiveCount },
    { name: "Negative", value: negativeCount },
    { name: "Neutrial", value: neutralCount },
    // { name: 'Group D', value: 200 },
    // { name: 'Group E', value: 278 },
    // { name: 'Group F', value: 189 },
  ];
  const Linedata = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const demoUrl = "https://codesandbox.io/s/two-simple-pie-chart-otx9h";
  const LinedemoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

  const [summary, setSummary] = useState("Your ans will be generated soon!")

  const comments = { "inputs": "Really this product is very niceREAD MOREFar better than my expectationsFabric quality is just awesomeTrust me ....If you are looking for a pure cotton bedsheet then its for you.....But design is yours choice main is fabric quality...And who were saying that fabric is not pure cotton...Shame on you guys 🤣🤣🤣🤣You don't know what is cotton or what!!READ MOREI just did first time wash and spread on the bed. It's design is awesome. Fabric quality is nice. Colors are as shown in product pic. Size is just appropriate, 10 cm more in length would make it perfect. Value for money...READ MOREThe bedsheet was made of total cotton.After washing the colour does not get out from the bedsheet.Very good bedsheet in low priceThe delivery man was also very good.Thanks Flipkart.😍😍READ MOREThis is very nice and high quality product in this price rangeRecommended do buy this product NowREAD MOREProduct is very goodREAD MOREBest qualityREAD MOREGood quality pure cotton pure cotton please buy this item wow wow wowREAD MOREGood material,Money worthREAD MOREJust awesome 🤩READ MOREQuality is good , material is off cotton.READ MOREvalue of money. Good product I'm very happy thanks for flipkart.READ MOREpure cotton .size is ok ..but color is lite blue nt dark.. nice product according to money... i am Fully satisfied because this is pure cotton.. i giving review before wash...thanksREAD MOREVery good product after washing I will rewriteREAD MOREVery nice bedsheetREAD MOREPoor quality with ink marks at numerous places.READ MOREVery beautiful product.. I love it so much. Love u Flipkart.. Thank you so much ❤️READ MOREPoor quality colors fade out in one wash.... So dissapoint with this product 😞READ MOREGood qualityREAD MOREBeautiful bedsheetREAD MOREWrost of moneyREAD MOREGoodREAD MOREBedsheet blue colour spred.READ MOREVery good badsheet I like it. Nice design and colour.READ MOREAmazing ,pure cotton metirialREAD MORENice product,no color fading.Value for money.I recommend to all,who are looking for bedsheet,for size,u have to see while selecting the product.This review is after 1 months of use.READ MOREVery badREAD MOREColor is so darkREAD MORENice productREAD MOREDefective piece sentREAD MOREGood productREAD MOREMatrial is very bad qualityREAD MOREBad qualityREAD MOREBad productREAD MOREWastage of moneyREAD MOREVery bad quality in colour and febricsREAD MOREI like the bedsheet very much but the pillow cover r very bad quality and also the color got faded when i opened the pillow cover the color was faded... so i suggest you to go for some different  product in the same price...READ MOREWaste of money 👎READ MOREIt's a average productREAD MOREColour faded  very fast.READ MOREGoodREAD MORELow quality productREAD MOREVery big pure cotton bedsheet with pleasing yellow colour n simple blue  floral design. Just go for it. Price is also within reach.LOVE IT, Thank u Seller, Flipkart.READ MORENiceREAD MORENice productREAD MOREGoodREAD MOREWorth buyingREAD MORENice productREAD MOREOsam productREAD MOREWorst productREAD MOREGoodREAD MOREVery bad quality in ColorREAD MORENice productREAD MOREOk niceREAD MOREVery niceREAD MOREWaste of moneyREAD MOREVery bad quality not happy with flipkart . one wash colour went off .READ MOREGood product  We can buy itREAD MOREColor fedREAD MOREOkREAD MOREVery niceREAD MOREVery very worst product the cloth is very worst plz don't buy itREAD MOREVery Good ProductREAD MORENever buy this product. Very low qualityREAD MOREThis product good  but middle very big hol and Flipkart product is not good not value for money 👎READ MOREUnder cost with pure cottonREAD MOREVery happy😊READ MORESuperREAD MORESize n fabric excellentREAD MOREI like this product.worth for money.Good looking for my bedroomREAD MORESuperREAD MOREWorth for money....READ MOREBed sheet is good but colour faded in first washREAD MOREGoodREAD MOREWaste of money.READ MOREColor shades by 2wash onlyREAD MOREBest coREAD MOREBestREAD MORENiceREAD MORESize problemREAD MOREProduct is good but small in size for a normal double bedREAD MORENice clothesREAD MORENot king size pillow cover is smallREAD MORELow quality. No shiningREAD MOREAccording to price ok productREAD MORENot than expectedREAD MORENice go for itREAD MORENice productREAD MOREPrint is misprintREAD MORENot badREAD MORESo beautiful just looking like a wowREAD MOREBad, quality don't buyREAD MOREProduct is also good but colour is too light.READ MORELove itREAD MORENot much colourREAD MOREWaste of money color lessREAD MOREItem okREAD MOREVery niceREAD MORESuper qualityTq FlipkartREAD MOREBad qualityREAD MORE " }


  // useEffect(()=>{
  // query({"inputs": "Really this product is very niceREAD MOREFar better than my expectationsFabric quality is just awesomeTrust me ....If you are looking for a pure cotton bedsheet then its for you.....But design is yours choice main is fabric quality...And who were saying that fabric is not pure cotton...Shame on you guys 🤣🤣🤣🤣You don't know what is cotton or what!!READ MOREI just did first time wash and spread on the bed. It's design is awesome. Fabric quality is nice. Colors are as shown in product pic. Size is just appropriate, 10 cm more in length would make it perfect. Value for money...READ MOREThe bedsheet was made of total cotton.After washing the colour does not get out from the bedsheet.Very good bedsheet in low priceThe delivery man was also very good.Thanks Flipkart.😍😍READ MOREThis is very nice and high quality product in this price rangeRecommended do buy this product NowREAD MOREProduct is very goodREAD MOREBest qualityREAD MOREGood quality pure cotton pure cotton please buy this item wow wow wowREAD MOREGood material,Money worthREAD MOREJust awesome 🤩READ MOREQuality is good , material is off cotton.READ MOREvalue of money. Good product I'm very happy thanks for flipkart.READ MOREpure cotton .size is ok ..but color is lite blue nt dark.. nice product according to money... i am Fully satisfied because this is pure cotton.. i giving review before wash...thanksREAD MOREVery good product after washing I will rewriteREAD MOREVery nice bedsheetREAD MOREPoor quality with ink marks at numerous places.READ MOREVery beautiful product.. I love it so much. Love u Flipkart.. Thank you so much ❤️READ MOREPoor quality colors fade out in one wash.... So dissapoint with this product 😞READ MOREGood qualityREAD MOREBeautiful bedsheetREAD MOREWrost of moneyREAD MOREGoodREAD MOREBedsheet blue colour spred.READ MOREVery good badsheet I like it. Nice design and colour.READ MOREAmazing ,pure cotton metirialREAD MORENice product,no color fading.Value for money.I recommend to all,who are looking for bedsheet,for size,u have to see while selecting the product.This review is after 1 months of use.READ MOREVery badREAD MOREColor is so darkREAD MORENice productREAD MOREDefective piece sentREAD MOREGood productREAD MOREMatrial is very bad qualityREAD MOREBad qualityREAD MOREBad productREAD MOREWastage of moneyREAD MOREVery bad quality in colour and febricsREAD MOREI like the bedsheet very much but the pillow cover r very bad quality and also the color got faded when i opened the pillow cover the color was faded... so i suggest you to go for some different  product in the same price...READ MOREWaste of money 👎READ MOREIt's a average productREAD MOREColour faded  very fast.READ MOREGoodREAD MORELow quality productREAD MOREVery big pure cotton bedsheet with pleasing yellow colour n simple blue  floral design. Just go for it. Price is also within reach.LOVE IT, Thank u Seller, Flipkart.READ MORENiceREAD MORENice productREAD MOREGoodREAD MOREWorth buyingREAD MORENice productREAD MOREOsam productREAD MOREWorst productREAD MOREGoodREAD MOREVery bad quality in ColorREAD MORENice productREAD MOREOk niceREAD MOREVery niceREAD MOREWaste of moneyREAD MOREVery bad quality not happy with flipkart . one wash colour went off .READ MOREGood product  We can buy itREAD MOREColor fedREAD MOREOkREAD MOREVery niceREAD MOREVery very worst product the cloth is very worst plz don't buy itREAD MOREVery Good ProductREAD MORENever buy this product. Very low qualityREAD MOREThis product good  but middle very big hol and Flipkart product is not good not value for money 👎READ MOREUnder cost with pure cottonREAD MOREVery happy😊READ MORESuperREAD MORESize n fabric excellentREAD MOREI like this product.worth for money.Good looking for my bedroomREAD MORESuperREAD MOREWorth for money....READ MOREBed sheet is good but colour faded in first washREAD MOREGoodREAD MOREWaste of money.READ MOREColor shades by 2wash onlyREAD MOREBest coREAD MOREBestREAD MORENiceREAD MORESize problemREAD MOREProduct is good but small in size for a normal double bedREAD MORENice clothesREAD MORENot king size pillow cover is smallREAD MORELow quality. No shiningREAD MOREAccording to price ok productREAD MORENot than expectedREAD MORENice go for itREAD MORENice productREAD MOREPrint is misprintREAD MORENot badREAD MORESo beautiful just looking like a wowREAD MOREBad, quality don't buyREAD MOREProduct is also good but colour is too light.READ MORELove itREAD MORENot much colourREAD MOREWaste of money color lessREAD MOREItem okREAD MOREVery niceREAD MORESuper qualityTq FlipkartREAD MOREBad qualityREAD MORE "}).then((response) => {
  // 	setSummary(response[0].summary_text)
  // });

  // },[])
 

  useEffect(()=>{
    const fetchData = async () => {
      await Sentiment();
      await Summary();
      await wordCloud();
    };
    fetchData()
    
  },[])
  console.log(JSON.stringify(sentimentData,null,2)+"147147")
const Sentiment = async()=> {
    let comments=[];
    fileData.data.forEach(item => {
      console.log(item["Comments\r"].trim())
      const comment = item["Comments\r"].trim(); // Remove leading/trailing whitespace
      if (comment !== "") {
        
        comments.push(comment);
        console.log(comments)
        setSentimentData(comments)
      }
     
    });
    console.log(data+"155")
    const response = await fetch(
      "https://api-inference.huggingface.co/models/lxyuan/distilbert-base-multilingual-cased-sentiments-student",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(comments),
      }
    );
    const result = await response.json();
    // console.log(JSON.stringify(result[0][0].label,null,2)+"456654")
    if(result){
    let resultData=[];
    result.map((data)=>{
      resultData.push(data[0].label)
      
    })
  
    console.log(resultData+"result")
    setSentimentresult(resultData)
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;
    
    // Iterate through the comments array
    resultData.forEach(comment => {
      // Increment the corresponding counter based on the sentiment label
      switch (comment) {
        case "positive":
          positiveCount++;
          break;
        case "negative":
          negativeCount++;
          break;
        case "neutral":
          neutralCount++;
          break;
        default:
          // Handle any other cases if needed
          break;
      }
    });
    console.log(positiveCount,negativeCount,neutralCount+"2002")
    setPositiveCount(positiveCount)
    setNegativeCount(negativeCount)
    setNeutralCount(neutralCount)
    console.log(resultData+"5555")
  }
    return result;
  
  }

  

  async function Summary() {
    let comments=[];
    fileData.data.forEach(item => {
      console.log(item["Comments\r"].trim())
      const comment = item["Comments\r"].trim(); // Remove leading/trailing whitespace
      if (comment !== "") {
        
        comments.push(comment);
        console.log(comments)
        // setSentimentData(comments)
      }
     
    });
    const paragraph = comments.join(' ');
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Falconsai/text_summarization",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(paragraph),
      }
    );
    const result = await response.json();
    console.log(JSON.stringify(result,null,2)+"5454")
    setSummaryData(result[0].summary_text)
    return result;
  }

  async function qandanswer(question) {
    let comments = [];
    fileData.data.forEach(item => {
      console.log(item["Comments\r"].trim())
      const comment = item["Comments\r"].trim(); // Remove leading/trailing whitespace
      if (comment !== "") {

        comments.push(comment);
        console.log(comments)
        // setSentimentData(comments)
      }

    });
    const paragraph = comments.join(' ');
    const data = {
      "inputs": {
        "question": question,
        "context": paragraph
      }
    }
    const response = await fetch(
      "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    console.log(JSON.stringify(result,null,2)+"7777")
    setAnswer(result.answer)
    return result;
  }
  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };
  const handleCompute = () => {
    // Call your function with the question data
    console.log(question+"qwww")
    qandanswer(question);
  };

  async function wordCloud(){
    let comments = [];
    fileData.data.forEach(item => {
      console.log(item["Comments\r"].trim())
      const comment = item["Comments\r"].trim(); // Remove leading/trailing whitespace
      if (comment !== "") {

        comments.push(comment);
        console.log(comments)
        // setSentimentData(comments)
      }

    });
    const data = comments;
    if (data.length > 0) {
      const options = {
        list: data.map(word => [word, Math.random() * 100]), // Format data for word cloud
        gridSize: Math.round(16 * document.getElementById('wordcloud').offsetWidth / 1024),
        weightFactor: function (size) {
          return size * document.getElementById('wordcloud').offsetWidth / 1024;
        },
        fontFamily: 'Roboto, sans-serif',
        color: 'random-light',
        rotateRatio: 0.5,
        shape: 'square',
        shuffle: true,
        backgroundColor: 'transparent'
      };
      console.log(JSON.stringify(options,null,2)+"qwe")

      WordCloud(wordCloudRef.current, options);
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Left side div for comments with sentiment analysis */}
      <div style={{ width: "48%",height:"100vh",overflow: 'auto' }}>
        <table style={{ border: "1px solid #ddd" }}>
          <tr>
            <th>Comments</th>
            <th>Sentiment</th>
          </tr>
          {sentimentData.map((data, index) => (
            <tr>
              <td>{data}</td>
              <td>
                <span
                   style={{
                    backgroundColor: sentimentResult[index] === 'positive' ? "#e6ffe6" : sentimentResult[index] === 'negative' ? "#ffd6cc" : "white",
                    border: sentimentResult[index] === 'positive' ? "1px solid #00ff00" : sentimentResult[index] === 'negative' ? "1px solid #ff471a" : "none",
                    borderRadius: "7px",
                    padding: "3px",
                    color: sentimentResult[index] === 'positive' ? "#00ff00" : sentimentResult[index] === 'negative' ? "red" : "black",
                    fontWeight: 600
                  }}
                >
                  {sentimentResult[index]}
                </span>
              </td>
            </tr>
          ))}
        </table>
      </div>

      {/* Right side div for boxes with shadows */}

      <div style={{ width: "50%" }}>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Sentiment Analysis
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Q & A
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Summarize
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-word-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-word"
              type="button"
              role="tab"
              aria-controls="pills-word"
              aria-selected="false"
            >
              Word Cloud
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div
                className="outputBox"
                style={{
                  width: "300px",
                  height: "300px",
                  boxShadow: "2px 2px 5px #888888",
                  borderRadius: "8px",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <span>Overall Sentiment</span>
                <PieChart width={270} height={230}>
                  <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label content={<CustomLabel />} />
                  </Pie>
                  {needle(value, data, cx, cy, iR, oR, '#d0d000')}
                </PieChart>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}><div style={{backgroundColor:"green",height:"10px",width:"15px",marginTop:"5px",marginRight:"5px"}}></div><span>Positive</span></div>
                
                <div style={{display:"flex",justifyContent:"space-between"}} ><div style={{backgroundColor:"red",height:"10px",width:"15px",marginTop:"5px",marginRight:"5px"}}></div><span>Negative</span></div>
                </div>
              </div>
              <div
                className="outputBox"
                style={{
                  width: "300px",
                  height: "300px",
                  boxShadow: "2px 2px 5px #888888",
                  borderRadius: "8px",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={data01}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  boxShadow: "2px 2px 5px #888888",
                  borderRadius: "8px",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <img src={positiveCount>negativeCount?smile:sad} style={{height:"100%"}}></img>
              </div>
              {/* <div
                className="outputBox"
                style={{
                  width: "300px",
                  height: "300px",
                  boxShadow: "2px 2px 5px #888888",
                  borderRadius: "8px",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={Linedata}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div> */}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">Question</label>
              <input type="text" id="disabledTextInput" class="form-control" placeholder="Enter Your Question" value={question} onChange={handleInputChange}/>
            </div>
            <button type="button" class="btn btn-outline-secondary" onClick={handleCompute}>Compute</button>
            <div>
              <textarea
                rows="10"
                cols="50"
                // placeholder="Your ans will be generated soon!"
                disabled // Setting the disabled attribute
                style={{ borderRadius: "5px", marginTop: "20px" }}
                value={answer}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >

            {/* <button type="button" class="btn btn-outline-secondary" >Get Summary</button> */}
            <textarea
              rows="10"
              cols="50"
              placeholder="Your Summary will be generated soon!"
              disabled // Setting the disabled attribute
              value={JSON.stringify(summaryData)}
              style={{ borderRadius: "5px", marginTop: "100px", position: "absolute" }}
            />

          </div>
          <div
            className="tab-pane fade"
            id="pills-word"
            role="tabpanel"
            aria-labelledby="pills-word-tab"
            style={{display:'flex',justifyContent:"center",alignItems:"center",paddingTop:"100px"}}
          >
         <div id="wordcloud" style={{ width: '800px', height: '500px',border:"1px solid black",borderRadius:"10px" }} ref={wordCloudRef}></div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
