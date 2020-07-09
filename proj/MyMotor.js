

class MyMotor extends CGFobject{

	//if right_left = true right motor , if right_left = false , left motor
	constructor(scene , right_left) {
        super(scene);
        this.right_left = right_left;
     
        this.init();
        this.initMaterials();
    }

    init(){

    	this.rotation = 2*Math.PI;
  		this.sphere = new MySphere(this.scene , 16 , 8);
  		this.tube = new MyCylinder(this.scene, 40 , false);
  		this.pipe = new MyCylinder(this.scene, 40 , false);
  		this.helice1 = new MyHelice(this.scene);
  		this.helice11 = new MyHelice(this.scene);
  		this.helice2 = new MyHelice(this.scene);
  		this.helice22 = new MyHelice(this.scene);
  		this.half = new MyHalfSphere(this.scene , 16 , 8);

  		//precalculations
  		this.piHalfs = Math.PI/2;
  		this.NpiHalfs = -Math.PI/2;
  		this.threePiHalfs = 3*Math.PI/2;
  		this.NthreePiHalfs = -3*Math.PI/2;
    }

    initMaterials(){

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
        this.material2.loadTexture('images/helices.png');
        this.material2.setTextureWrap('REPEAT', 'REPEAT');

        this.material3 = new CGFappearance(this.scene);
        this.material3.setAmbient(1, 1, 1, 1);
        this.material3.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material3.setSpecular(0.1, 0.1, 0.1, 1);
        this.material3.setShininess(10.0);
        this.material3.loadTexture('images/motorBody.png');
        this.material3.setTextureWrap('REPEAT', 'REPEAT');


        this.material4 = new CGFappearance(this.scene);
        this.material4.setAmbient(1, 1, 1, 1);
        this.material4.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material4.setSpecular(0.1, 0.1, 0.1, 1);
        this.material4.setShininess(10.0);
        this.material4.loadTexture('images/motorBody.png');
        this.material4.setTextureWrap('REPEAT', 'REPEAT');
    }


    display(){

    	this.scene.pushMatrix();

    		this.scene.rotate(this.piHalfs , 0 , 1 , 0);

	    	this.scene.pushMatrix();

	    		
	    		if(this.right_left){
	    			this.scene.translate(-0.2, 0 , 0);
	    			this.scene.rotate(this.piHalfs , 1 , 0 , 0);	
	    		}
	    		else{
	    			this.scene.translate(-0.2, 0 , 0);
	    			this.scene.rotate(this.NpiHalfs , 1 , 0 , 0);	
	    		}
	    		
	    		this.scene.scale(0.05 , 1 , 0.05);
	    		this.pipe.display();
	    	this.scene.popMatrix();

	    	this.material2.apply();
	    	//back of the motor
	    	this.scene.pushMatrix();

	    		this.scene.translate(0.8 , 0 , 0);
	    		this.scene.rotate(this.NpiHalfs , 0 , 1, 0);
	    		this.scene.scale(0.22 , 0.22 , 0.22);
	    		this.half.display();
	    	this.scene.popMatrix();

	    	this.material3.apply();
	    	//body of the motor
	    	this.scene.pushMatrix();
	    		this.scene.scale(0.4, 0.4 ,0.4);
		    	this.scene.pushMatrix();
		    	 	this.scene.scale(2 , 1 , 1);
		    	 	this.sphere.display();
		    	this.scene.popMatrix();
		    this.scene.popMatrix();	

		    this.material2.apply();
		    this.scene.pushMatrix();
		    	this.scene.rotate(this.rotation , 1 , 0 ,0);
		    	//helices
			    this.scene.pushMatrix();

			    	this.scene.translate(0.88, 0 , 0);
			    	this.scene.rotate(this.piHalfs , 0, 0 , 1);

			    	this.scene.pushMatrix();
			    		this.scene.scale(0.2 , 0.2 , 0.2);
			    		this.tube.display();
			    	this.scene.popMatrix();

					this.scene.pushMatrix();
						
						this.scene.rotate(this.piHalfs , 0 , 0 , 1);			    	
				    	//right helice
				    	this.scene.pushMatrix();
				    		this.scene.rotate(this.NthreePiHalfs , 0 , 1 ,0);
				    		this.scene.translate(0.1 , -0.04 , 0.12);
				    		this.scene.scale(0.8 , -0.8 , 0.8);
				    		this.helice1.display();
				    	this.scene.popMatrix();

				    	this.scene.pushMatrix();
				    		this.scene.rotate(this.NthreePiHalfs , 0 , 1 ,0);
				    		this.scene.translate(0.1 , -0.04 , 0.12);
				    		this.scene.scale(0.8 , 0.8 , 0.8);
				    		this.helice11.display();
				    	this.scene.popMatrix();

				    	//left helice
				    	
				    	this.scene.pushMatrix();
				    		this.scene.rotate(this.threePiHalfs , 0 , 1 ,0);
				    		this.scene.translate(0.1 , -0.04 , -0.12);
				    		this.scene.scale(0.8 , -0.8 , 0.8);
				    		this.helice2.display();
				    	this.scene.popMatrix();

				    	this.scene.pushMatrix();
				    		this.scene.rotate(this.threePiHalfs , 0 , 1 ,0);
				    		this.scene.translate(0.1 , -0.04 , -0.12);
				    		this.scene.scale(0.8 , 0.8 , 0.8);
				    		this.helice22.display();
				    	this.scene.popMatrix();

				    this.scene.popMatrix();	

			    this.scene.popMatrix();

			this.scene.popMatrix();

		this.scene.popMatrix();    
    }

   setRotation(rotation){
   		if(this.right_left){
   			this.rotation += rotation;	
   		}
   		else{
   			this.rotation -= rotation;
   		}
   		
   }
}