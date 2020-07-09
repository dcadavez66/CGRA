

class MySupply extends CGFobject {

    
	constructor(scene , iniY) {
		super(scene);
        this.iniYPos = iniY;
        console.log(this.iniYPos);
		this.init();
        this.initMaterials();
	}


	init(){

       
      this.SupplyStates = {

            INACTIVE: 0,
            FALLING:  1,
            LANDED:   2
      }; 

        this.state = this.SupplyStates.INACTIVE;
        this.index = 0;  
        this.yPosition = 0;
        this.face0 = new MyQuadSupply(this.scene);    
        this.face1 = new MyQuadSupply(this.scene);
        this.face2 = new MyQuadSupply(this.scene);
        this.face3 = new MyQuadSupply(this.scene);
        this.face4 = new MyQuadSupply(this.scene);
    	this.face5 = new MyQuadSupply(this.scene);
        this.antena = new MyAntena(this.scene);

        this.antenaOn = false;

        this.deltaTime = 0;
        this.stepconst = 0.0041;
        this.deltaAcumulator = 0;

        this.TopIsClosed = true;
        this.TopOpenAngle = 0;

        this.positionAdjustY = 0;
        this.positionAdjustZ = 0;

        //precalculations
        this.fivePiForths = (5*Math.PI)/4;
        this.piForths = Math.PI/4;
        this.piHalfs = Math.PI/2;
        this.threePiForths = (3*Math.PI)/4;
        this.NpiHalfs = -Math.PI/2;
        this.Npi = -Math.PI;
	}

    initMaterials(){

        this.cubeRight = new CGFappearance(this.scene);
        this.cubeRight.setAmbient(1, 1, 1, 1);
        this.cubeRight.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeRight.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeRight.setShininess(10.0);
        this.cubeRight.loadTexture('images/supplySideRight.png');
        this.cubeRight.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeLeft = new CGFappearance(this.scene);
        this.cubeLeft.setAmbient(1, 1, 1, 1);
        this.cubeLeft.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeLeft.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeLeft.setShininess(10.0);
        this.cubeLeft.loadTexture('images/supplySideRight.png');
        this.cubeLeft.setTextureWrap('REPEAT', 'REPEAT');


        this.cubeTop = new CGFappearance(this.scene);
        this.cubeTop.setAmbient(1, 1, 1, 1);
        this.cubeTop.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeTop.setShininess(10.0);
        this.cubeTop.loadTexture('images/supplyTop.png');
        this.cubeTop.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeBot = new CGFappearance(this.scene);
        this.cubeBot.setAmbient(1, 1, 1, 1);
        this.cubeBot.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeBot.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeBot.setShininess(10.0);
        this.cubeBot.loadTexture('images/supplyTop.png');
        this.cubeBot.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeFront = new CGFappearance(this.scene);
        this.cubeFront.setAmbient(1, 1, 1, 1);
        this.cubeFront.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeFront.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeFront.setShininess(10.0);
        this.cubeFront.loadTexture('images/supplySide.png');
        this.cubeFront.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeBack = new CGFappearance(this.scene);
        this.cubeBack.setAmbient(1, 1, 1, 1);
        this.cubeBack.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeBack.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeBack.setShininess(10.0);
        this.cubeBack.loadTexture('images/supplySide.png');
        this.cubeBack.setTextureWrap('REPEAT', 'REPEAT');


       


    }
	
	display(){

        if(this.state == this.SupplyStates.INACTIVE){

        }
        else if(this.state == this.SupplyStates.FALLING){
            this.displayFalling();
        }

        else if(this.state == this.SupplyStates.LANDED){
            this.displayOnLanded();
        }
        
		
	}

    update(deltaTime){
        this.deltaTime = deltaTime;

        


        this.landed();
        if(this.state == this.SupplyStates.FALLING){
            this.yPosition -= this.deltaTime*this.stepconst;
            
        }


         if(this.state == this.SupplyStates.LANDED && this.TopIsClosed){
            
            if(this.TopOpenAngle == this.fivePiForths){
                
                this.positionAdjustY = 0.5;
                this.positionAdjustZ = 1.2;
                this.antenaOn = true;
            }
            else{
                this.TopOpenAngle += this.piForths;

                if(this.TopOpenAngle == this.piHalfs){
                    this.positionAdjustY = 1;
                    this.positionAdjustZ = 0;
                }
                else if(this.TopOpenAngle == this.threePiForths){
                    this.positionAdjustY = 1.2;
                    this.positionAdjustZ = 0.5;
                }
                else if(this.TopOpenAngle == this.piForths){
                    this.positionAdjustY = (Math.sin(this.TopOpenAngle)*0.5)+0.1;
                    this.positionAdjustZ = -(0.5-Math.cos(this.TopOpenAngle)*0.5)-0.05;    
                }
                else if(this.TopOpenAngle == Math.PI){
                    this.positionAdjustY = 1;
                    this.positionAdjustZ = 1;              
                }
            }
        }


        if(this.state == this.SupplyStates.LANDED && this.antenaOn){
            if(this.antena.isUp == false){
                this.antena.update();    
            }
            else{
                this.TopIsClosed = false;
            }    
        }
    }

    drop(){
        this.state = this.SupplyStates.FALLING;    
    }

    landed(){
        if(this.yPosition <= -12.346 && this.SupplyStates.FALLING){
            this.state = this.SupplyStates.LANDED;
            this.TopIsClosed = true;
            //console.log(this.deltaAcumulator);
        }
    }

    displayFalling(){

        this.scene.pushMatrix();

            this.scene.translate(0 , this.yPosition , 0);

            this.cubeRight.apply();

            //face4 - Side
            this.scene.pushMatrix();
                this.scene.scale(-1,1,1);
                this.scene.translate(0 , 0 , 0.5);
                this.scene.rotate(this.piHalfs, 1 ,0, 0);
                this.face4.display();
            this.scene.popMatrix();

            
            this.cubeLeft.apply();

            //face5 - Side
            this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 0, 0, 1);

                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0 , 0 , -0.5);
                    this.scene.rotate(this.NpiHalfs, 1 ,0, 0);
                    this.face5.display();
                this.scene.popMatrix();
            this.scene.popMatrix();

            this.cubeBack.apply();

            //face2 -Side
            this.scene.pushMatrix();
                this.scene.rotate(this.piHalfs, 1, 0, 0);

                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0.5 , 0 , 0);
                    this.scene.rotate(this.NpiHalfs, 0 ,0, 1);
                    this.face2.display();
                this.scene.popMatrix();

            this.scene.popMatrix();

            this.cubeFront.apply();

            //face3 -Side
            this.scene.pushMatrix();
                this.scene.rotate(this.piHalfs, 1, 0, 0);

                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(-0.5 , 0 , 0);
                    this.scene.rotate(this.piHalfs , 0 ,0, 1);
                    this.face3.display();
                this.scene.popMatrix();

            this.scene.popMatrix();
            
            this.cubeTop.apply();
            

            //face1 --TOP
            this.scene.pushMatrix();
                this.scene.scale(-1,1,1);
                this.scene.translate(0 , 0.5 , 0);
                this.scene.rotate(this.NpiHalfs, 0 , 1 , 0);
                this.face1.display();
            this.scene.popMatrix();
            

            this.cubeBot.apply();
            
            //face0 -BOT
            this.scene.pushMatrix();

                this.scene.rotate(this.NpiHalfs, 0 , 1 , 0);
                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0 , -0.5 , 0);
                    this.scene.rotate(this.Npi , 1 , 0 , 0 );
                    this.face0.display();
                this.scene.popMatrix();

            this.scene.popMatrix();

        this.scene.popMatrix();      
    }

    displayOnLanded(){

        this.scene.pushMatrix();

            this.scene.translate(0 , -12.346, 0);

            this.cubeRight.apply();

            //face4 - Side
            this.scene.pushMatrix();
                this.scene.scale(-1,1,1);
                this.scene.translate(0 , 0 , 0.5);
                this.scene.rotate(this.piHalfs , 1 ,0, 0);
                this.face4.display();
            this.scene.popMatrix();

            
            this.cubeLeft.apply();

            //face5 - Side
            this.scene.pushMatrix();
                this.scene.rotate(Math.PI , 0, 0, 1);

                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0 , 0 , -0.5);
                    this.scene.rotate(this.NpiHalfs, 1 ,0, 0);
                    this.face5.display();
                this.scene.popMatrix();
            this.scene.popMatrix();

            this.cubeBack.apply();

            //face2 -Side
            this.scene.pushMatrix();
                this.scene.rotate(this.piHalfs , 1, 0, 0);

                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0.5 , 0 , 0);
                    this.scene.rotate(this.NpiHalfs, 0 ,0, 1);
                    this.face2.display();
                this.scene.popMatrix();

            this.scene.popMatrix();

            this.cubeFront.apply();

            //face3 -Side
            this.scene.pushMatrix();
                this.scene.rotate(this.piHalfs, 1, 0, 0);

                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(-0.5 , 0 , 0);
                    this.scene.rotate(this.piHalfs, 0 ,0, 1);
                    this.face3.display();
                this.scene.popMatrix();

            this.scene.popMatrix();
            
            this.cubeTop.apply();            

            //face1 --TOP
           this.scene.pushMatrix();
                this.scene.translate(0, this.positionAdjustY, this.positionAdjustZ);
                this.scene.rotate(this.TopOpenAngle , 1 , 0 ,0);
                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0 , 0.5 , 0);
                    this.scene.rotate(this.NpiHalfs, 0 , 1 , 0);
                    this.face1.display();
                this.scene.popMatrix();
            this.scene.popMatrix();    

            this.cubeBot.apply();
            

            this.cubeBot.apply();
            
            //face0 -BOT
           this.scene.pushMatrix();

                this.scene.rotate(this.NpiHalfs, 0 , 1 , 0);
                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0 , -0.5 , 0);
                    this.scene.rotate(this.Npi, 1 , 0 , 0 );
                    this.face0.display();
                    if(this.antenaOn == true){
                        this.scene.pushMatrix();
                            this.scene.rotate(Math.PI , 1 , 0 , 0);
                            this.scene.scale(0.5 , 0.5 , 0.5);
                            this.antena.display();
                        this.scene.popMatrix();
                    }    
                this.scene.popMatrix();
            this.scene.popMatrix();  
        this.scene.popMatrix(); 
    }


    reset(){
        this.state = this.SupplyStates.INACTIVE;
        this.yPosition = 0;
    }
        
}

