// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
import express from 'express';
const app = express();
import { ApifyClient } from 'apify-client';
import cors from 'cors';
import bodyParser from 'body-parser';
import { scrapeComments } from './python server/index5.js';
// const puppeteer = require('puppeteer');
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
// const service = require('./services/service')
// import {commentAnalyzer} from './services/service.js'
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/route',async (req , res)=>{
      
//  const result=await commentAnalyzer()
//  console.log(result+"==")
// if(result){
//   res.status=200;
//   res.send(JSON.stringify(result))
// }else{
//   res.status=400;
// }
    
// })
app.get('/scp', async (req, res) => {
  const { url } = req.query;

  try {
    const comments = await scrapeComments(url);
    console.log(comments)
    res.send(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
});

// async function scrapeComments(url) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url);

//   const comments = await page.evaluate(() => {
//     const commentElements = document.querySelectorAll('.col._2wzgFH');
//     return Array.from(commentElements, el => el.innerText);
//   });

//   await browser.close();
  
// console.log(comments)
//   return comments;
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

