//start time: 9:30 AM CET
//end time: 1:02 PM CET
import * as React from 'react';

export default function Game(){
    //constants
    const NUMBER_OF_COLUMNS = 6;
    const NUMBER_OF_ROWS = 7;

    const [currentBoardLayout, setCurrentBoardLayout] = React.useState<string[]>(Array(NUMBER_OF_COLUMNS).fill('')); 
    const [isRedTurn, setIsRedTurn] = React.useState<boolean>(true);
    const [isGameFinished, setIsGameFinished] = React.useState<boolean>(false);
    const [winnerColor, setWinnerColor] = React.useState<string>('');
    const [isBoardFull, setIsBoardFull] = React.useState<boolean>(false)

    function clickedColumn(id:number){
        //check if column is full
        if (currentBoardLayout[id].length == NUMBER_OF_ROWS) {
            return;
        }
        if (isGameFinished) 
            return;
        const color = isRedTurn ? 'r' : 'y';
        const newBoardLayout = [...currentBoardLayout];
        newBoardLayout[id] = currentBoardLayout[id] + color;
        setCurrentBoardLayout(newBoardLayout);
        setIsRedTurn(!isRedTurn);
        checkIsGameFinished(newBoardLayout) 
    }

    function checkIsGameFinished(boardLayout:string[]){

        //check if board is full and there is no winner:
        let numberColumnsFilled:number = 0;
        boardLayout.forEach((column:string) => {
            if (column.length==NUMBER_OF_ROWS) numberColumnsFilled++;
        });
        if (numberColumnsFilled == NUMBER_OF_COLUMNS) {
            setIsBoardFull(true);
            return
        }

        //does input string win
        function checkStringWins(str:string){
            if (str.includes('rrrr')) {
                setWinnerColor('Red');
                setIsGameFinished(true);
                return true;
            }
            if (str.includes('yyyy')) {
                setWinnerColor('Yellow');
                setIsGameFinished(true);
                return true;
            }
            return false;
        }

        //check if columns has a winner:
        boardLayout.forEach(column=>{
            checkStringWins(column);
        });

        //check if rows has a winner
        for (let y:number = 0; y<NUMBER_OF_ROWS; y++) {
            let rowStr = '';
            for (let x:number = 0; x<NUMBER_OF_COLUMNS; x++) {
                rowStr += boardLayout[x][y];
            }
            checkStringWins(rowStr);
        } 

        //check if there is a bottom left to top right diagonal winner
        for (let j:number = -4; j<4; j++) {
            let diagStr='';
            for (let i:number = 0; i<NUMBER_OF_ROWS; i++) {
                if (boardLayout[i] && boardLayout[i][i+j]){
                    diagStr += boardLayout[i][i+j];
                } else 
                    diagStr += ' ';      
            }
            checkStringWins(diagStr);
            
        }

        //check if there is a top left to bottom right diagonal winner
        for (let j:number = -4; j<4; j++) {
            let diagStr='';
            for (let i:number = 0; i<=NUMBER_OF_ROWS; i++) {
                if (boardLayout[7-i] && boardLayout[7-i][i+j]) {
                    diagStr += boardLayout[7-i][i+j];
                } else 
                    diagStr += ' ';      
            }
            checkStringWins(diagStr);
        }
        return false; //Game is not over
        
    }

    //reset Board if user wants to play again
    function resetBoard(){
        setCurrentBoardLayout(Array(NUMBER_OF_COLUMNS).fill(''));
        setIsGameFinished(false);
        setIsRedTurn(true);
        setIsBoardFull(false);
        setWinnerColor('')
    }

    //show message on the Boards State
    let message:string = '';
    let askToPlayAgain:boolean = false;
    if (isGameFinished) {
        message= `Game Over, ${winnerColor} wins`;
        askToPlayAgain = true;
    } else if (isBoardFull) {
        message = 'Game Over, Tie Game';
        askToPlayAgain = true;
    } else if (isRedTurn)
        message = 'Red Turn to play';
    else if (!isRedTurn) 
        message = 'Yellow turn to play'

    return (<>
            
            { message && <h3>{message}</h3> } 
            { askToPlayAgain && 
                <button 
                    onClick={()=>{ resetBoard(); }}>
                        Play Another Game
                </button> 
            }
            <div style={{display: 'flex', alignItems: 'center', margin: '4px', gap: 3, position: 'absolute', transform:'translate(-50%, -50%)', top:'50%', left:'50%'}}>
                { 
                    currentBoardLayout.map((columnStr:string, columnIdx:number) =>{
                        return <div 
                                    style={{ display: 'flex', flexDirection: 'column-reverse', gap: 3 }}
                                    onClick={()=>{clickedColumn(columnIdx);}}>  
                                        <BoardColumn 
                                            columnStr={columnStr} 
                                            key={columnIdx} />
                                </div>
                    })
                }
            </div></>);
}


function BoardColumn({columnStr}:{ columnStr:string }){
    const NUMBER_OF_ROWS = 7;
    let tiles:any = [];
    for (let tileIdx:number = 0; tileIdx<NUMBER_OF_ROWS; tileIdx++) {
        if (columnStr[tileIdx]==='y')
            tiles.push(
                <div style={{ height: '30px', width: '30px', border: '1px black solid',  borderRadius:'15px', backgroundColor: 'yellow'  }} key={tileIdx}></div>
            )
        else if (columnStr[tileIdx]==='r')
            tiles.push(
                <div style={{ height: '30px', width: '30px', border: '1px black solid',  borderRadius:'15px', backgroundColor: 'red' }} key={tileIdx}></div>
            )
        else 
            tiles.push(
                <div style={{ height: '30px', width: '30px', border: '1px black solid',  borderRadius:'15px'}} key={tileIdx}></div>
            )      
    }
    return (<>
                    { tiles }
            </>);
}