import { useEffect, useState } from 'react';
import './App.css'
function Hangman(props){
const [wrongGuess,setWrongGuess]=useState(0);

useEffect(()=>{
    const newWrongNum=Number(props.wrongGuessNum)
    setWrongGuess(newWrongNum);
},[props.wrongGuessNum])

const parts=["0","/","|","\\","/","\\"];

    return(
        <>
        <div className="wholeHangmanContainer">
                <div className="hangmancontainer">
                    <p></p>
                    <p style={{color:wrongGuess>0? "hsla(27, 74%, 11%, 1.00)":"lightgrey"}}>{parts[0]}</p>
                    <p></p>
                    <p style={{color:wrongGuess>1? "hsla(27, 74%, 11%, 1.00)":"lightgrey"}}>{parts[1]}</p>
                    <p style={{color:wrongGuess>2? "hsla(27, 74%, 11%, 1.00)":"lightgrey"}}>{parts[2]}</p>
                    <p style={{color:wrongGuess>3? "hsla(27, 74%, 11%, 1.00)":"lightgrey"}}>{parts[3]}</p>
                    <p style={{color:wrongGuess>4? "hsla(27, 74%, 11%, 1.00)":"lightgrey"}}>{parts[4]}</p>
                    <p></p>
                    <p style={{color:wrongGuess>5 ? "hsla(27, 74%, 11%, 1.00)":"lightgrey"}}>{parts[5]}</p>
                </div>
        </div>

        </>
    )
}
export default Hangman