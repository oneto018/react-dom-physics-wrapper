import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Mw from './MatterWorld';
import Phys from './PhysWrap';


import './style.css';



const App = ()=>{  
   const [bullets, setBullets] = useState([]);
  return (<div className="container">
            <Mw> 
              <Phys  width={150}  
                      height={60} initialPosition={{x:70,y:50}}>
                <div className="el box">
                  <b>Test</b>
                </div>
              </Phys>

            <Phys width={350} height={40} initialPosition={{x:40,y:30}} options={{isStatic:true}}>
              <div className="el ground">
                this is the ground
              </div>
            </Phys>


            <Phys width={700} height={40} initialPosition={{x:70,y:60}} options={{isStatic:true}}>
              <div className="el ground">
                this is the ground
              </div>
            </Phys>

             <Phys width={30} height={800} initialPosition={{x:110,y:35}} options={{isStatic:true}}>
              <div className="el ground">
                th
              </div>
            </Phys>

             <Phys width={30} height={800} initialPosition={{x:15,y:35}} options={{isStatic:true}}>
              <div className="el ground">
                th
              </div>
            </Phys>

            {bullets.map((x,ind) => (
              <Phys key={ind} width={20} height={30} 
                    initialPosition={{x:60,y:0}}
                  
                    >
                  <div className="bullet el">
                    b
                  </div>
              </Phys>))}


              <Phys width={50} height={100} initialPosition={{x:60,y:200}}>
                <div className="el box" style={{background:'blue'}} onClick={()=>{
                  setBullets( bullets.concat([1]))
                }}>
                  <b>box2</b>
                </div>
              </Phys>
            </Mw>
          </div>)
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
