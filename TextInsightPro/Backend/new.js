// import { Pipeline } from "@xenova/transformers";
// const pipe =await Pipeline('sentiment-analysis;')
// console.log(await pipe('i love javascript'));

// import { pipeline } from '@xenova/transformers';

// // Allocate a pipeline for sentiment-analysis
// let pipe = await pipeline('token-classification','Xenova/bert-base-multilingual-cased-ner-hrl');

// let out = await pipe('I love transformers! and javascript');
// // [{'label': 'POS;ITIVE', 'score': 0.999817686}]
// console.log(out)
// const tm = require('tm');
import natural from 'natural';

const comments = [
  "I really enjoyed the latest movie, the plot was amazing!",
  "The weather today is terrible, it's raining cats and dogs.",
  "I can't believe how fast the internet is in my new apartment!",
];

// Tokenize and preprocess the comments
const tokenizer = new natural.WordTokenizer();
const documents = comments.map(comment => tokenizer.tokenize(comment.toLowerCase()));

// Create a Term Frequency-Inverse Document Frequency (TF-IDF) matrix
const corpus = new natural.Corpus(documents);
const tfidf = new natural.TfIdf();

documents.forEach((doc, index) => {
  tfidf.addDocument(doc);
});

// Get the top keywords as topics
const numberOfTopics = 3; // Adjust based on your requirements
const topics = tfidf.listTerms(0 /* document index */).slice(0, numberOfTopics).map(term => term.term);

console.log(`Comments: ${comments.join('\n')}`);
console.log(`Extracted topics: ${topics.join(', ')}`);
