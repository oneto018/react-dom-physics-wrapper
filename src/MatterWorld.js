import React,{Component} from 'react';
import Matter from 'matter-js';

const Engine = Matter.Engine,
	    Render = Matter.Render,
	    World = Matter.World,
	    Bodies = Matter.Bodies;
export default class MatterWorld extends Component{

	constructor(props){
		super(props);
		/** Set up relative positions and scales **/
		const VIEW = {};
		VIEW.SAFE_WIDTH = 100;
		VIEW.SAFE_HEIGHT = 100;
		VIEW.scale = Math.min(window.innerWidth / VIEW.SAFE_WIDTH, window.innerHeight / VIEW.SAFE_HEIGHT);


		VIEW.width = window.innerWidth / VIEW.scale;
		VIEW.height = window.innerHeight / VIEW.scale;
		VIEW.centerX = VIEW.width / 2;
		VIEW.centerY = VIEW.height / 2;
		VIEW.offsetX = (VIEW.width - VIEW.SAFE_WIDTH) / 2 / VIEW.scale;
		VIEW.offsetY = (VIEW.height - VIEW.SAFE_HEIGHT) / 2 / VIEW.scale;
		this.VIEW = VIEW;
		window.VIEW = VIEW;
		this.engine = Engine.create({
		    render: {
		        
		        options: {
		            width: 100,
		            height: 100,
		           // background: '#fafafa',
		            //wireframeBackground: '#222',
		            hasBounds: false,
		            enabled: true,
		            wireframes: false,
		            showSleeping: false,
		            showDebug: false,
		            showBroadphase: false,
		            showBounds: false,
		            showVelocity: false,
		            showCollisions: false,
		            showAxes: false,
		            showPositions: false,
		            showAngleIndicator: false,
		            showIds: false,
		            showShadows: false
		        }
		    }
		});

		//this.engine.enableSleeping = true;

	}

	componentDidMount() {
		
		
		

		var ground = Bodies.rectangle(0, 350, window.innerWidth, 500, {
		    isStatic: true
		});
		
		World.add(this.engine.world, [ground]);
		Engine.run(this.engine);

		Matter.Events.on(this.engine, 'collisionStart', function(event) {
			var pairs = event.pairs;
			console.log('colliding pairs',pairs);
		// do something with the pairs that have started collision
		});
	}

	render() {
		var children =  React.Children.map(this.props.children, 
			child => React.cloneElement(child, { engine:this.engine,VIEW:this.VIEW }));
		return (
			<div className="world">
				{children}
			</div>
		);
	}
}