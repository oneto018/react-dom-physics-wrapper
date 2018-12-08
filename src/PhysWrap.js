import React,{Component} from 'react';
import Matter from 'matter-js';
const {World,Bodies,} = Matter;

export default class PhysWrap extends Component{

	constructor(props){
		super(props);
		this.dom =  React.createRef();
		this.renderedOnce = false;
		var {initialPosition={x:0,y:0},engine,VIEW,width,height,options={}} = this.props;
		console.log('props',this.props);
		var {x,y} = initialPosition;
		this._body = Bodies.rectangle(x,y, 
			VIEW.width*width/window.innerWidth, 
       	 	VIEW.height*height/window.innerHeight,
       	 	options);
		console.log('init',this._body);
		World.add(engine.world,this._body);

	}


	componentDidMount() {
		var {initialForce}=this.props;
		if(initialForce){
			
			Matter.Body.applyForce(this._body,{x:this._body.x,y:this._body.y},initialForce);
		}
		this.intervalId = window.setInterval(()=>{
			if(this._body.isSleeping){
			} else {
				this.forceUpdate();
			}
			
		},1000/60);
		
	}

	componentWillUnmount() {
		window.clearInterval(this.intervalId);
	}

	

	render(){
		
		var dom = this.dom;
		var body = this._body;
		//console.log('rendering body',body);
		if(!body){
			return null;
		}
		this.renderedOnce = true;
		var {VIEW,width,height} = this.props;
		console.log('VIEW',this.props);
		if(dom.current){
			var actualDom = dom.current;
			var transform=`translate( ${ ((VIEW.offsetX + body.position.x) * VIEW.scale - actualDom.offsetWidth/2 ) }px, ${(VIEW.offsetY *2 + ( body.position.y) * VIEW.scale - actualDom.offsetHeight/2)}px )`;
			if(!isNaN(body.angle)){
       		 transform +=  `  rotate( ${body.angle}rad )`;
			}
		} else {
			transform = '';
		}
		
		transform = transform.replace(/\r?\n|\r/g,'');

        //console.log('transform',transform);

		var style = {transform:transform,width:width,height:height,visibility:(dom.current)?'visible':'hidden'};

		var children = React.cloneElement(this.props.children, { ref:this.dom ,style:style });
		return children;
	}
}