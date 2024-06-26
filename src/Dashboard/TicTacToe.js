import React from 'react'
import './TicTacToe.css'
const v = '_'
const x = 'x'
const o = 'o'
const players = [{name:'p1',sign:x}, {name:'com',sign:o}]

/* utils */
function combinations(list,n) {
  if (n>list.length)
    return []
  
  if (n === list.length)
    return [list]
  
  const combs = []
  if (n===1) {
    for (let i=0; i<list.length; i++) {
      combs.push([list[i]])
    }
    return combs
  }
  
  let h
  let t
  for (let i=0; i<list.length-n+1; i++) {
    h = list.slice(i, i + 1)
    t = combinations(list.slice(i + 1), n - 1)
    for (let j=0; j<t.length; j++) {
      combs.push(h.concat(t[j]))
    }
  }
  return combs
}

function isInline(p) {
  return [ p[0].x*(p[1].y-p[2].y) + p[1].x*(p[2].y-p[0].y) + p[2].x*(p[0].y-p[1].y) ]/2 === 0
}

function isWinning(marked) {
  const combs = combinations(marked, 3)
  const win = combs.some(c=>{
    return isInline(c)
  })
  return win
}

class TicTacToe extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      blocks: [[v,v,v],[v,v,v],[v,v,v]],
      msg: '',
      pIndex: 0,
      over: false,
      win: 0,
      lose: 0,
      draw: 0,
    }
  }
  render(){
    return (
      <div className='GameOuter'>
      <div className="container-fluid text-center">
      {/* <div className='TicTacToe' style="background-color: red;"> */}
        <div className="row mb-3">
          <div className="col-12">
          </div>
        </div>
        
        <h4>
          {this.state.name}
        </h4>
        
        <div className="row mb-3">
          <div className="col-12">
            <button type="button" className="btn btn-lg btn-outline-dark shadow-sm" onClick={()=>{
                console.clear()
                this.setState({
                  pIndex: 0,
                  blocks: [[v,v,v],[v,v,v],[v,v,v]],
                  over: false,
                  msg: 'p1 starts'
                })
              }}>Reset</button>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <p>
              <span>W: {this.state.win}</span><span> | </span>
              <span>L: {this.state.lose}</span><span> | </span>
              <span>D: {this.state.draw}</span>
            </p>
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-12">
            <p>Try to win!</p>
            {this.state.msg}
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            {
              this.state.blocks.map((rows,i)=>(
                <div className="row mb-2">
                  <div className="col-12" style={{whiteSpace:'nowrap'}}>
                    {
                      rows.map((val,j)=>(
                        <button 
                          className={val===v?'btn btn-outline-success btn-lg m-1 shadow-sm':(val===players[0].sign?'btn btn-primary btn-lg m-1 shadow-sm':'btn btn-danger btn-lg m-1 shadow-sm')}
                          style={{width:60,height:60}}
                          disabled={val!==v||this.state.over===true}
                          onClick={()=>{
                            const blocks = this.state.blocks
                            const pIndex = 0
                            blocks[i][j] = players[pIndex].sign
      
                            const marked = []
                            blocks.map((rows,r)=>{
                              rows.map((val,c)=>{
                                if (val === players[pIndex].sign) marked.push({y:r,x:c})
                              })
                            })
                            
                            // check is p1 winning
                            const winning = isWinning(marked)
                            if (winning) {
                              const msg = players[pIndex].name + ' won!'
                              this.setState({msg:msg,over:true,win:this.state.win+1})
                              return
                            } else if (marked.length === 5) {// if all selected, means it's a draw
                              const msg = 'It\'s a draw.'
                              this.setState({msg:msg,over:true,draw:this.state.draw+1})
                              window.location.reload(true)
                            }
                            
                            // com player index
                            const cpIndex = pIndex+1
      
                            // get unmarked blocks
                            const choices = []
                            blocks.map((rows,r)=>{
                              rows.map((val,c)=>{
                                if (val === v) choices.push({r:r,c:c})
                              })
                            })
                            
                            // check which com should mark;
                            // 1) check any could straightly win, or
                            // 2) to prevent lose, or
                            // 3) random
                            let cIndex
                            for (let i in choices) {
                              const entry = choices[i]
                              
                              // deep clone blocks for testing
                              const blocksClone = JSON.parse(JSON.stringify(blocks))
                              blocksClone[entry.r][entry.c] = players[cpIndex].sign
                              
                              const cMarkedTmp = []
                              blocksClone.forEach((rows,r)=>{
                                rows.forEach((val,c)=>{
                                  if (val === players[cpIndex].sign) cMarkedTmp.push({y:r,x:c})
                                })
                              })
                              if (isWinning(cMarkedTmp)) {
                                cIndex = i
                                break
                              }
                            }
                            
                            // or prevent p1 from winning 
                            if (!cIndex) {
                              for (let i in choices) {
                                const entry = choices[i]

                                // deep clone blocks for testing
                                const blocksClone = JSON.parse(JSON.stringify(blocks))
                                blocksClone[entry.r][entry.c] = players[pIndex].sign

                                const cMarkedTmp = []
                                blocksClone.forEach((rows,r)=>{
                                  rows.forEach((val,c)=>{
                                    if (val === players[pIndex].sign) cMarkedTmp.push({y:r,x:c})
                                  })
                                })
                                if (isWinning(cMarkedTmp)) {
                                  cIndex = i
                                  break
                                }
                              }
                            }
                            
                            // or else set randomly
                            if (!cIndex) cIndex = Math.floor(Math.random() * choices.length)
                            
                            // com marks randomly
                            // TODO: add machine learning to increase com playing level
                            //const cIndex = Math.floor(Math.random() * choices.length)
                            
                            blocks[choices[cIndex].r][choices[cIndex].c] = players[cpIndex].sign
                            
                            // get current marked for com
                            const cMarked = []
                            blocks.map((rows,r)=>{
                              rows.map((val,c)=>{
                                if (val === players[cpIndex].sign) cMarked.push({y:r,x:c})
                              })
                            })
                            // check is com winning
                            const cWinning = isWinning(cMarked)
                            if (cWinning) {
                              const msg = players[cpIndex].name + ' won!'
                              this.setState({msg:msg,over:true,lose:this.state.lose+1})
                            }
                            this.setState({blocks:blocks})
                          }}>
                          {val}
                        </button>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default TicTacToe
