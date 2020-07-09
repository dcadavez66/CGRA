/**
* MyPyramid
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, angle , position) {
        super(scene);
        this.angle = angle;
        this.position = position;
        this.init();
        this.initMaterials();
    }

    init() {

        //vehicle movement variables 
        this.accelaration = 0;
        this.velocity = 0;
        this.preVelocity = 0;

        //autopilot button debounce variables
        this.autoFalseTime = 0.0;
        this.autoTrueTime = 0.0;
        this.state = 0;

        //rotor variables
        this.time = 0;
        this.initialTime = 0;
        this.initTime = true;
        this.currTime = 0;
        this.timeOld = 0;
        this.deltaTime = 0;
        this.desltaTimeAcomulator = 0;


        //variables for opening the cabine
        this.open_cab = false;
        this.auxAnimation = 0;
        this.isOpen = false;
        this.isClosed = true;
        this.openAngle = 0;
        this.animationOver = false;


        //variables for vehicle boundaries and speed control
       	this.nextposition = this.position;
       	this.posScaleVar = 0;


        //variables auto pilot
        this.automatic = false;
        this.calcCenter = true;
        this.beta = 0;
        this.center = [0,0,0];
        this.initAngle = 0;
        this.initPosition = [0,0,0];
        this.autoAngle = 0;
        this.sector = 0;
        this.doCircle = false;
        this.stepAngle = 0.001257;


        //precalculations
        this.piHalfs = Math.PI/2;
        this.NpiHalfs = -Math.PI/2;
        this.piSixths = Math.PI/6;
        this.NpiSixths = -Math.PI/6;
        this.half = 1/2;
        this.twoPi = 2*Math.PI;
        this.nPi = -Math.PI;
        this.circFrac = 2*Math.PI*0.01/50;
        this.NpiForths = -Math.PI/4;
        this.piForths = -Math.PI/4;
        this.piUnderThirty = Math.PI/30;
        this.NpiUnderThirty = -Math.PI/30;
        this.timeScaleConst = 100 % 1000;


        this.supplyPosition =[
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ] 

        for(let i = 0 ; i < this.supplyPosition.length ; i++){
            this.supplyPosition[i][1] = this.position[1];    
        }
        
        //object initialization
        this.top_zepplin = new MySphere(this.scene, 20, 20);
        this.motor_right = new MyMotor(this.scene , true);
        this.motor_left = new MyMotor(this.scene , false);
        this.cabine = new MyCabine(this.scene);
        this.flap = new MyFlaps(this.scene);
        this.flap2 = new MyFlaps(this.scene);
        this.flap3 = new MyFlaps(this.scene);
        this.flap4 = new MyFlaps(this.scene);
        this.supply0 = new MySupply(this.scene, this.position[1]);
        this.supply1 = new MySupply(this.scene, this.position[1]);
        this.suppl2 = new MySupply(this.scene, this.position[1]);
        this.supply3 = new MySupply(this.scene, this.position[1]);
        this.supply4 = new MySupply(this.scene, this.position[1]);

        this.flagHolder = new MyCylinder(this.scene,40 , true);
        this.flagHolder2 = new MyCylinder(this.scene,40 , true);
        this.flag = new MyPlane(this.scene , 20);
        this.flag2 = new MyPlane(this.scene , 20);

        this.cargoIndex = 0;
        this.maxCargo = 4;

        this.cargo = [
            this.supply0,
            this.supply1,
            this.suppl2,
            this.supply3,
            this.supply4
        ];         
    }

    initMaterials(){
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/topZepplin5.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(1, 1, 1, 1);
        this.material1.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material1.setSpecular(0.1, 0.1, 0.1, 1);
        this.material1.setShininess(10.0);
        this.material1.loadTexture('images/cabine.png');
        this.material1.setTextureWrap('REPEAT', 'REPEAT');

        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(1, 1, 1, 1);
        this.material2.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material2.setSpecular(0.1, 0.1, 0.1, 1);
        this.material2.setShininess(10.0);
        this.material2.loadTexture('images/rope.png');
        this.material2.setTextureWrap('REPEAT', 'REPEAT');




        this.flagAppearance = new CGFappearance(this.scene);
        this.flagAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.flagAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.flagAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.flagAppearance.setShininess(120);

        this.flagTexture = new CGFtexture(this.scene , "images/flag.png");
        this.flagAppearance.setTexture(this.flagTexture);
        this.flagAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.flagShader = new CGFshader(this.scene.gl , "shaders/flag.vert" , "shaders/flag.frag");
         this.flagShader.setUniformsValues({uSampler2: 1});
         //this.flagShader.setUniformsValues({timeFactor: 0});      


        this.flagAppearance2 = new CGFappearance(this.scene);
        this.flagAppearance2.setAmbient(0.3, 0.3, 0.3, 1);
        this.flagAppearance2.setDiffuse(0.7, 0.7, 0.7, 1);
        this.flagAppearance2.setSpecular(0.0, 0.0, 0.0, 1);
        this.flagAppearance2.setShininess(120);

        this.flagTexture2 = new CGFtexture(this.scene , "images/flag2.png");
        this.flagAppearance2.setTexture(this.flagTexture);
        this.flagAppearance2.setTextureWrap('REPEAT', 'REPEAT');   


    }

    display(){

        

        this.scene.pushMatrix();

            this.scene.translate(this.position[0],this.position[1], this.position[2]);    
            this.scene.rotate(this.angle , 0 , 1 , 0);
            

            this.scene.pushMatrix();
                this.material.apply();
                this.scene.rotate(this.piHalfs , 0 , 1 , 0);
                this.scene.scale(2 , 1 , 1);
                this.top_zepplin.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();

                
                
                this.scene.pushMatrix();
                    this.scene.translate(-0.5 , -1 , -0.8);
                    this.scene.scale(0.2 , 0.2 , 0.2);
                    this.motor_right.display();
                this.scene.popMatrix();


                this.scene.pushMatrix();
                    this.scene.translate(0.5 , -1 , -0.8);
                      this.scene.scale(0.2 , 0.2 , 0.2);
                    this.motor_left.display();
                this.scene.popMatrix();

            this.scene.popMatrix();

            this.scene.pushMatrix();
                 this.scene.translate(0, -0.8 ,-0.5);
                 this.scene.rotate(this.piHalfs , 0 , 1 , 0);
                 this.scene.scale(0.5, 0.5 , 0.5);
                this.cabine.display();
            this.scene.popMatrix();


            this.scene.pushMatrix();
                this.scene.translate(0 ,0.4, -1.8);
                this.scene.scale(0.5,0.5,0.5);
                this.flap.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0 ,-0.4, -1.8);
                this.scene.scale(0.5,-0.5,0.5);
                this.flap2.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0.4,0,-1.8 );
                this.scene.rotate(this.NpiHalfs , 0 , 0 ,1);
                this.scene.scale(0.5,0.5,0.5);
                this.flap3.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(-0.4,0,-1.8 );
                this.scene.rotate(this.piHalfs , 0 , 0 ,1);
                this.scene.scale(0.5,0.5,0.5);
                this.flap4.display();
            this.scene.popMatrix();


            this.scene.pushMatrix();        

                this.scene.translate(0 , 0 , -3);
                this.scene.rotate(this.piHalfs, 0 , 1, 0);
                this.scene.scale(0.5 , 0.5 , 0.5);

                this.material2.apply();

                this.scene.pushMatrix();
                    this.scene.translate(-0.5 , -0.3 , 0);
                    this.scene.rotate(this.piHalfs , 0  , 0 , 1);
                    this.scene.scale(0.01 , 2 , 0.01);
                    this.flagHolder.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(-0.5 , 0.3 , 0);
                    this.scene.rotate(this.piHalfs , 0  , 0 , 1);
                    this.scene.scale(0.02 , 2 , 0.02);
                    this.flagHolder2.display();
                this.scene.popMatrix();


                this.flagAppearance.apply();
                this.scene.setActiveShader(this.flagShader);
                this.flagTexture.bind(1);

                this.scene.pushMatrix();
                    this.scene.translate(0.5 , 0 , 0);
                    this.scene.scale(2 , 2 , 1);
                    this.flag.display();
                    this.scene.pushMatrix();
                    this.flagAppearance2.apply();
                        this.scene.rotate(Math.PI , 0 , 1 , 0);
                        this.flag2.display();
                    this.scene.popMatrix();
            this.scene.popMatrix();
            this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        this.scene.popMatrix();

        //display MySupply
        this.scene.pushMatrix();
            
            this.scene.translate(this.supplyPosition[0][0],this.supplyPosition[0][1], this.supplyPosition[0][2]);
            this.scene.pushMatrix();
                this.scene.scale(0.5 , 0.5 , 0.5);
                this.scene.translate(0, -2 , 0);
                this.cargo[0].display();
            this.scene.popMatrix(); 
        this.scene.popMatrix();

        this.scene.pushMatrix();
            
            this.scene.translate(this.supplyPosition[1][0],this.supplyPosition[1][1], this.supplyPosition[1][2]);
            this.scene.pushMatrix();
                this.scene.scale(0.5 , 0.5 , 0.5);
                this.scene.translate(0, -2 , 0);
                this.cargo[1].display();
            this.scene.popMatrix(); 
        this.scene.popMatrix();

        this.scene.pushMatrix();
            
            this.scene.translate(this.supplyPosition[2][0],this.supplyPosition[2][1], this.supplyPosition[2][2]);
            this.scene.pushMatrix();
                this.scene.scale(0.5 , 0.5 , 0.5);
                this.scene.translate(0, -2 , 0);
                this.cargo[2].display();
            this.scene.popMatrix(); 
        this.scene.popMatrix();                  

        
        this.scene.pushMatrix();
            
            this.scene.translate(this.supplyPosition[3][0],this.supplyPosition[3][1], this.supplyPosition[3][2]);
            this.scene.pushMatrix();
                this.scene.scale(0.5 , 0.5 , 0.5);
                this.scene.translate(0, -2 , 0);
                this.cargo[3].display();
            this.scene.popMatrix(); 
        this.scene.popMatrix();   


        this.scene.pushMatrix();
            
            this.scene.translate(this.supplyPosition[4][0],this.supplyPosition[4][1], this.supplyPosition[4][2]);
            this.scene.pushMatrix();
                this.scene.scale(0.5 , 0.5 , 0.5);
                this.scene.translate(0, -2 , 0);
                this.cargo[4].display();
            this.scene.popMatrix(); 
        this.scene.popMatrix();
        
        
    }


    update(t, speedFactor){
        
            this.time = t;
            this.deltaTime = this.time - this.timeOld;

            
            this.desltaTimeAcomulator += this.deltaTime;

            
            if(this.initTime){
                this.initialTime = t;
                this.initTime = false;
            } 

            this.currTime = (this.time -this.initialTime)/8000;


            if(this.cargoIndex != this.maxCargo+1){
           
                if(this.cargo[this.cargoIndex].state == this.cargo[this.cargoIndex].SupplyStates.LANDED && this.cargo[this.cargoIndex].TopIsClosed == false){
                    this.cargoIndex++;
                }
                this.cargo[this.cargoIndex].update(this.deltaTime);
            }    
            
            
            this.openAnimation();    
            
            this.flagShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
            this.flagShader.setUniformsValues({ velocity: this.velocity*2 });
            this.flagShader.setUniformsValues({angleRotation: this.angle});
        
            if(this.accelaration == 0 ){
                this.velocity = this.velocity - this.velocity*0.01;
            }
            else{
                this.preVelocity = this.velocity;
                this.velocity = (this.accelaration *this.currTime);    
            }

            if(this.velocity * this.preVelocity < 0){
                this.initialTime = this.time;
            }
            
             if(this.velocity == 0){
                this.initialTime = this.time;    
            }
          
            this.velocity = this.velocity * speedFactor;

            if(this.scene.Apressed){
                this.flap.setTurn(this.piSixths);
                this.flap2.setTurn(this.piSixths);
            }
            else if(this.scene.Dpressed){
                this.flap.setTurn(this.NpiSixths);
                this.flap2.setTurn(this.NpiSixths);   
            }
            else{
                this.flap.setTurn(0);
                this.flap2.setTurn(0);
            }
                
            
            if(this.automatic == false){

            	this.posScaleVar = this.velocity * this.currTime;
            	if(this.posScaleVar > 0.75*speedFactor){
            		this.posScaleVar = 0.75*speedFactor;
            		this.velocity = 1.5*speedFactor;

            	}
            	if(this.posScaleVar < -0.25*speedFactor){
            		this.posScaleVar = -0.25*speedFactor;
            		this.velocity = -0.5*speedFactor;

            	}

            	this.nextposition[0] += (this.half * this.posScaleVar) * Math.sin(this.angle);
            	this.nextposition[2] += (this.half * this.posScaleVar) * Math.cos(this.angle);

            	//x position boundaries
            	if(this.nextposition[0] > 25){
            		this.position[0] = 25;
            	} else if(this.nextposition[0] < -25){
            		this.position[0] = -25;
            	} else{
                	this.position[0] = this.nextposition[0];
                }

                //z position boundaries
            	if(this.nextposition[2] > 25){
            		this.position[2] = 25;
            	} else if(this.nextposition[2] < -25){
            		this.position[2] = -25;
            	} else {
	                this.position[2] = this.nextposition[2];
    			}
            }
            else{
                
                this.velocity = 0.75;

                if(this.calcCenter){
                	//Translating angle to [-pi pi] interval           
                	while(this.angle > Math.PI){
                		this.angle -= this.twoPi;
                	}

                	while(this.angle < this.nPi){
                		this.angle += this.twoPi;
                	}

                	if(this.angle < Math.PI && this.angle >= this.piHalfs){

                    	this.beta = this.angle - this.piHalfs;
                    	this.initAngle = this.nPi + this.angle;

                    	this.center[0] = this.position[0] - Math.sin(this.beta)*5;
                     	this.center[1] = this.position[1];
                        this.center[2] = this.position[2] - Math.cos(this.beta)*5;

                        this.initPosition[0] = this.center[0] + (Math.cos(this.initAngle)*5);
                        this.initPosition[1] = this.center[1];
                        this.initPosition[2] = this.center[2] + (Math.sin(this.initAngle)*5);

                       	this.sector = 1;
                    }

                	if(this.angle < this.NpiHalfs && this.angle >= this.nPi){

                    	this.beta = this.angle - this.piHalfs;
                    	this.initAngle = Math.PI + this.angle;

                    	this.center[0] = this.position[0] - Math.sin(this.beta)*5;
                     	this.center[1] = this.position[1];
                        this.center[2] = this.position[2] - Math.cos(this.beta)*5;

                        this.initPosition[0] = this.center[0] + (Math.cos(this.initAngle)*5);
                        this.initPosition[1] = this.center[1];
                        this.initPosition[2] = this.center[2] + (Math.sin(this.initAngle)*5);

                       	this.sector = 1;
                    }

                    if(this.angle < 0 && this.angle >= this.NpiHalfs){
                    	
                    	this.beta = this.angle + this.piHalfs;
                    	this.initAngle = Math.PI + this.angle;               
                    		
                     	this.center[0] = this.position[0] + Math.sin(this.beta)*5;
                     	this.center[1] = this.position[1];
                        this.center[2] = this.position[2] + Math.cos(this.beta)*5;

                        this.initPosition[0] = this.center[0] + (Math.cos(this.initAngle)*5);
                        this.initPosition[1] = this.center[1];
                        this.initPosition[2] = this.center[2] - (Math.sin(this.initAngle)*5);

                        this.sector = 2;
                    }

                    if(this.angle < this.piHalfs && this.angle >= 0){

                    	this.beta = this.angle;
                    	this.initAngle = this.nPi + this.angle;

                    	this.center[0] = this.position[0] + Math.cos(this.beta)*5;
                     	this.center[1] = this.position[1];
                        this.center[2] = this.position[2] - Math.sin(this.beta)*5;

                        this.initPosition[0] = this.center[0] + (Math.cos(-this.initAngle)*5);
                        this.initPosition[1] = this.center[1];
                        this.initPosition[2] = this.center[2] + (Math.sin(-this.initAngle)*5);

                       	this.sector = 2;
                    }

                    this.autoAngle = this.initAngle;
                    this.autoRotateAngle = this.angle;
                    this.calcCenter = false;
                    this.doCircle = true;
                }


                if(this.doCircle){

                	if(this.sector == 1){
		            	this.autoAngle += (this.circFrac * this.deltaTime);
		            	this.autoRotateAngle += (this.circFrac * this.deltaTime);
		            	this.angle = this.autoRotateAngle;
		                this.position[0] = this.center[0] + (Math.cos(-this.autoAngle)*5);
		                this.position[2] = this.center[2] + (Math.sin(-this.autoAngle)*5);
                    }

                	if(this.sector == 2){
		            	this.autoAngle += (this.circFrac * this.deltaTime);
		            	this.autoRotateAngle += (this.circFrac * this.deltaTime);
		            	this.angle = this.autoRotateAngle;
		                this.position[0] = this.center[0] + (Math.cos(this.autoAngle)*5);
		                this.position[2] = this.center[2] - (Math.sin(this.autoAngle)*5);
                    }  
                }
            }
            
            if(this.velocity == 0){
                this.motor_right.setRotation(this.twoPi);
                this.motor_left.setRotation(this.twoPi);    
            }
            else{

                if(this.scene.Spressed || this.accelaration < 0 ){
                    this.motor_right.setRotation(this.NpiForths*this.velocity);
                    this.motor_left.setRotation(this.NpiForths*this.velocity);    
                }
                else{
                    this.motor_right.setRotation(this.piForths*this.velocity);
                    this.motor_left.setRotation(this.NpiForths*this.velocity);    
                }
                
            }
            this.timeOld = this.time;

    }

    accelarate(accelaration){
        this.accelaration = accelaration;
    }

    turn(angle){
        this.angle += angle;
    }

    reset(){
        this.position[0] = 0;
        this.position[2] = 0;
        this.angle = 0; 
        this.velocity = 0;
        this.calcCenter = true;
        this.doCircle = false;
        this.automatic = false;

        for(let i = 0 ; i < this.cargo.length ; i++){
            this.cargo[i].reset();
        }
        if(this.open_cab){
            this.cabine.openCabine(0); 
            this.open_cab = false;
            this.isOpen = false;
            this.isClosed = true;
            this.openAngle = 0;
            this.animationOver = false;
        }
        this.cargoIndex = 0;
    }

    dropSupply(){
        
        if(this.isOpen && (this.cargoIndex < this.cargo.length) ){
            if(this.cargo[this.cargoIndex].state == this.cargo[this.cargoIndex].SupplyStates.INACTIVE){
                this.supplyPosition[this.cargoIndex][0] = this.position[0];
                this.supplyPosition[this.cargoIndex][2] = this.position[2];
                this.cargo[this.cargoIndex].drop();
            }
            
        }

    }

    openAnimation(){
        if(this.open_cab && this.animationOver == false){
            if(!this.isOpen){
                this.openAngle += this.piUnderThirty;
                this.isClosed = false;
                this.cabine.openCabine(this.openAngle);
                this.auxAnimation++;
            }           
            if(this.auxAnimation == 5){
                this.isOpen = true;
                this.isClosed = false;
                this.auxAnimation = 0;
                this.animationOver = true;
            } 
        }

        else if(!this.open_cab && this.animationOver == false){
           
            if(!this.isClosed){
                this.openAngle += this.NpiUnderThirty;
                this.isOpen = false;
                this.cabine.openCabine(this.openAngle);
                this.auxAnimation++ 
            }

            if(this.auxAnimation == 5){
                this.isOpen = false;
                this.isClosed = true;
                this.openAngle = 0;
                this.auxAnimation = 0;
                this.animationOver = true;     
            }
        }
    }

    openCabine(){
        if( (this.isOpen == false && this.isClosed == true) || (this.isOpen == true && this.isClosed == false) ){
            this.open_cab = !this.open_cab;
            this.animationOver = false;
        }
    }

    autoPilot(){

    	if(this.state == 0 && this.time - this.autoFalseTime  > 1000){
        	this.automatic = true;
        	this.state = 1;
        	this.autoTrueTime = this.time;
    	}

    	if(this.state == 1 && this.time - this.autoTrueTime  > 1000){
        	this.automatic = false;
    		this.calcCenter = true;
    		this.doCircle = false;
    		this.state = 0;
    		this.autoFalseTime = this.time;
    	}
    }
}
        	