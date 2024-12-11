import React from "react";
import images from "../images/insight1.png";
import images2 from "../images/insight2.png";
import { useState } from "react";
import Sentiment from "sentiment";

export default function TextBox() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeSentiment = () => {
    const sentiment = new Sentiment();
    const analysis = sentiment.analyze(text);
    console.log(analysis);
    if (text.trim() !== "" && text.split(" ").length > 0) {
      
      setResult(analysis);
      
    } else {
      // Handle the case where the text is empty or contains only whitespace
      setResult(null);
    }
    
  };
  return (
    <div className="container">
      <section>
        <h2 style={{ textAlign: "center", color: "blue", marginTop: "50px" }}>
          Play around with our sentiment analyzer, below:
        </h2>
        <div
          className="textbox"
          style={{
            display: "flex",
            border: "1px solid black",
            marginTop: "50px",
            boxShadow: "10px 10px 	#c5c5c5",
            borderRadius: "4px",
          }}
        >
          <div
            className="container"
            style={{ height: "400px", width: "50%", marginLeft: "30px" }}
          >
            <h2 style={{ marginTop: "20px" }}>Test with your own text</h2>
            <textarea
              name="input"
              id=""
              cols="50"
              rows="8"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <br />
            <button
              type="button"
              class="btn btn-primary"
              onClick={analyzeSentiment}
            >
              Classify text
            </button>
            {/* {result && (
        // <div>
        //   <h2>Analysis Result</h2>
        //   <p>Positive: {result.positivePercentage.toFixed(2)}%</p>
        //   <p>Negative: {result.negativePercentage.toFixed(2)}%</p>
        // </div>
      )} */}
          </div>
          <div
            className="output"
            style={{
              borderLeft: "1px solid black",
              height: "400px",
              width: "50%",
              padding: "15px 15px 5px 15px",
            }}
          >
            <h2>Analysis Result</h2>
            
            
            <br />
            <div style={{ borderTop: "2px solid black" ,paddingTop:"10px"}}>
            {result && (
                <div>
                  
                  <p>
                    <b>Overall Sentiment:</b>{" "}
                   {result.score > 0
                      ? "Positive"
                      : result.score < 0
                      ? "Negative"
                      : "Neutral"}
                  </p>
                  <p>
                   <b> Positive:</b>{" "}
                    {((result.positive.length / result.tokens.length) * 100).toFixed(2)}%
                  </p>
                  <p>
                    <b>Negative:</b>{" "}
                    {((result.negative.length / result.tokens.length) * 100).toFixed(2)}%
                  </p>
                  <p><b>Comparative Score: </b>{result.comparative}</p>
                  {result.positive.length > 0 && (
                    <div>
                      <p><b>Positive Words:</b> {result.positive.join(", ")}</p>
                    </div>
                  )}
                  {result.negative.length > 0 && (
                    <div>
                      <p><b>Negative Words:</b> {result.negative.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>
      <section style={{ marginTop: "100px" }}>
        <h2
          style={{ marginBottom: "50px", textAlign: "center", color: "blue" }}
        >
          Get sentiment insights like these:
        </h2>
        <div
          className="container"
          style={{
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
          }}
        >
          <img
            src={images}
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              boxShadow: "10px 10px 	#c5c5c5",
            }}
          />
          <img
            src={images2}
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              boxShadow: "10px 10px 	#c5c5c5",
            }}
          />
        </div>
      </section>
      <section style={{ marginTop: "100px", marginBottom: "50px" }}>
        <h2
          style={{ textAlign: "center", color: "blue", marginBottom: "50px" }}
        >
          Sentiment analysis benefits:
        </h2>
        <div
          style={{
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
            boxShadow: "",
          }}
        >
          <div
            className="div1"
            style={{
              border: "1px solid black",
              borderRadius: "4px",
              height: "120px",
              width: "250px",
              boxShadow: "10px 10px 	#c5c5c5",
            }}
          >
            <p style={{ padding: "20px 10px 15px 10px" }}>
              {" "}
              👍
              <br />
              Quickly detect negative comments & respond instantly
            </p>
          </div>
          <div
            className="div2"
            style={{
              border: "1px solid black",
              borderRadius: "4px",
              height: "120px",
              width: "250px",
              boxShadow: "10px 10px 	#c5c5c5",
            }}
          >
            <p style={{ padding: "20px 10px 15px 10px" }}>
              👍
              <br />
              Improve response times to urgent queries by 65%
            </p>
          </div>
          <div
            className="div3"
            style={{
              border: "1px solid black",
              borderRadius: "4px",
              height: "120px",
              width: "250px",
              boxShadow: "10px 10px 	#c5c5c5",
            }}
          >
            <p style={{ padding: "20px 10px 15px 10px" }}>
              {" "}
              👍
              <br />
              Take on 20% higher data volume
            </p>
          </div>
          <div
            className="div4"
            style={{
              border: "1px solid black",
              borderRadius: "4px",
              height: "120px",
              width: "250px",
              boxShadow: "10px 10px 	#c5c5c5",
            }}
          >
            <p style={{ padding: "20px 10px 15px 10px" }}>
              {" "}
              👍
              <br />
              Monitor sentiment about your brand, product, or service in real
              time
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
