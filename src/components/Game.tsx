import * as React from 'react';

export default function Game(){
    //
    const NUMBER_OF_COLUMNS = 6;
    const NUMBER_OF_ROWS = 7;

    const [currentBoardLayout, setCurrentBoardLayout] = React.useState<string[]>(Array(NUMBER_OF_COLUMNS).fill('')); 
    const [isRedTurn, setIsRedTurn] = React.useState<boolean>(true);
    const [isGameFinished, setIsGameFinished] = React.useState<boolean>(false);
    const [winnerColor, setWinnerColor] = React.useState<string>('');

    function clickedColumn(id:number){
        //check if column is full
        console.log(currentBoardLayout[id])
        if (currentBoardLayout[id].length == NUMBER_OF_ROWS) {
            alert('column is full, pick another');
            return;
        }
        const color = isRedTurn ? 'r' : 'y';
        const newBoardLayout = [...currentBoardLayout];
        newBoardLayout[id] = currentBoardLayout[id] + color;
        setCurrentBoardLayout(newBoardLayout);
        checkIsGameFinished(newBoardLayout) 
        setIsRedTurn(!isRedTurn);
    }

    function checkIsGameFinished(boardLayout:string[]){
        console.log('checking if game is finished')
        //check if columns has a winner:

        boardLayout.forEach(column=>{
            if (column.includes('rrrr')) {
                setWinnerColor('r');
                setIsGameFinished(true);
                return true
                
            }
            if (column.includes('yyyy')) {
                setWinnerColor('y');
                setIsGameFinished(true);
                return true
            }
        });
        return false
        
    }
    if (isGameFinished)
        return <div>`Game Over, ${winnerColor} wins`</div>;

    return (<>{ isRedTurn ? <div> Red turn to play </div>: <div> Yellow turn to play </div>}

            <div style={{display: 'flex', alignItems: 'center', margin: '4px', gap: 3}}>
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
    for (let tileIdx = 0; tileIdx<NUMBER_OF_ROWS; tileIdx++) {
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