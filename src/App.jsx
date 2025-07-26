import { useEffect, useState,useRef } from 'react'
import './App.css'
import Hangman from './Hangma.jsx'
import data from './data.json'
import Footer from './Footer.jsx'
function App() {
const [words,setWords]=useState([]);
const [word,setWord]=useState([]);
const [inputLetter,setInputLetter]=useState("");
const [allGuessedletter,setallGuessedletter]=useState([]);
const [wrongGuesses,setWrongGuesses]=useState(0);
const [displayGuesedWordResult,setdisplayGuesedWordResult]=useState("");
const [isStarted,setIsStarted]=useState(false);
const [isWon,setIsWon]=useState(false);
const [isLost,setIsLost]=useState(false);
const [ShowinputOption,setShowinputOption]=useState(true);
const inputRef=useRef(null);

useEffect(()=>{
  const newWords=data.words;
  setWords(newWords)
},[])
useEffect(()=>{
  if(isStarted){
    const randomIndex=Math.floor(Math.random()*words.length);
    const randomWord=words[randomIndex];
    setWord([...randomWord]) 
  }
},[isStarted])

useEffect(()=>{
  if(wrongGuesses==6){
    setShowinputOption(false);
    setIsLost(true);
  }
  else if(allGuessedletter.length>0 && word.every(letter=>allGuessedletter.includes(letter)) ){
    setIsWon(true);
    setShowinputOption(false);
  }
},[allGuessedletter])


function handleWordChange(){
  inputRef.current.focus();

  if(words){
    const randomIndex=Math.floor(Math.random()*words.length);
    const randomWord=words[randomIndex];
    setWord([...randomWord])
  }
  setWrongGuesses(0);
  setallGuessedletter([]);
  setdisplayGuesedWordResult("");
  setShowinputOption(true);
  setIsWon(false);
  setIsLost(false);
}

function hangleInputLetterChange(e){
  setInputLetter(e.target.value);

}

function findLetter(e){
e.preventDefault();
  if(word.includes(inputLetter)){
    if(allGuessedletter.includes(inputLetter)){
    setdisplayGuesedWordResult(" Already guessed !!!")
    setInputLetter("");
    }
    else{
    setdisplayGuesedWordResult("Correct 🎉")
    setInputLetter("");
    }

  }
  else if(inputLetter!==""){
    if(allGuessedletter.includes(inputLetter)){
    setdisplayGuesedWordResult(" Already guessed !!!")
    setInputLetter("");
    }
    else{
    setWrongGuesses(w=>w+1);
    setdisplayGuesedWordResult("Wrong !!")
    setInputLetter("");
    }
  }
  const newguess=inputLetter;
  setallGuessedletter([...new Set([...allGuessedletter, newguess])]);
}

function handleStartClick(){
  setIsStarted(true);
  setInterval(() => {
  inputRef.current.focus();
  }, 1);
}
  return (
    <>
    <h1 style={{textAlign:"center"}}>Hangman Game</h1>
      <Hangman wrongGuessNum={wrongGuesses}/>
      <button onClick={handleStartClick} style={{display: !isStarted? "block":"none"}}>Start</button>
      <div className="all" style={{display: ShowinputOption?"block" : "none"}}>
        <div className="gameAfterStart" style={{display: isStarted? "block" : "none"}}>
          <div className="dispalyWord">
            <label>Your Word:
            {
              
              word.map((element,index)=>{
                return(
                  <li key={index} >{allGuessedletter.includes(element)? element:"_"}</li>
                )
              })
            }
            </label>
          </div>

        <form >
          <input ref={inputRef} type='text' placeholder='Guess one letter' maxLength="1" onChange={hangleInputLetterChange} value={inputLetter}/>
          <input type="submit" onClick={findLetter} className='submitBtn' />
        </form>
        <h3>{displayGuesedWordResult}</h3>
        </div>
      </div>
        <button onClick={handleWordChange} style={{display: isStarted?"block":"none"}}>New Game</button>
      <h3>{isLost ?`You Lost 😥 The Word was ${word.join("")}`:``}</h3>
      <h3>{isWon ? "Congrats You Won 🎉🎊":""}</h3>
      <Footer/>
    </>
  )
}
export default App

