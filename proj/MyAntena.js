class MyAntena extends CGFobject{
	constructor(scene){
		super(scene);
		this.init();
		this.initMaterials();
	}

	init(){
		this.pipe1 = new MyCylinder(this.scene, 40 , false);
		this.pipe2 = new MyCylinder(this.scene,40 , true);
		this.halfSphere = new MyQuarterSphere(this.scene, 16 , 8);
		this.sphere = new MySphere(this.scene , 16 , 8);
		this.sphere2 = new MySphere(this.scene, 16 , 8);	

		this.antenaRise = 1;
		this.isUp = false;

	}

	initMaterials(){

		this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(1, 1, 1, 1);
        this.material1.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material1.setSpecular(0.1, 0.1, 0.1, 1);
        this.material1.setShininess(10.0);
        this.material1.loadTexture('images/AntenaPoint.png');
        this.material1.setTextureWrap('REPEAT', 'REPEAT');


        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(1, 1, 1, 1);
        this.material2.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material2.setSpecular(0.1, 0.1, 0.1, 1);
        this.material2.setShininess(10.0);
        this.material2.loadTexture('images/AntenaPole.png');
        this.material2.setTextureWrap('REPEAT', 'REPEAT');

        this.material3 = new CGFappearance(this.scene);
        this.material3.setAmbient(1, 1, 1, 1);
        this.material3.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material3.setSpecular(0.1, 0.1, 0.1, 1);
        this.material3.setShininess(10.0);
        this.material3.loadTexture('images/parabolica.png');
        this.material3.setTextureWrap('REPEAT', 'REPEAT');



	}

	display(){

		this.scene.pushMatrix();
			//this.scene.scale(0.2 , 3.9 , 0.2);
			this.scene.scale(0.2 , this.antenaRise , 0.2);
			this.pipe1.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			
			this.scene.pushMatrix();
			this.material3.apply();
				//this.scene.translate(0.5, 5 ,0.5);
				this.scene.translate(0.5, 1.1 + this.antenaRise ,0.5);
				this.scene.rotate(Math.PI/2 , 0, 1 , 0);
				this.scene.scale(1.2 , 1.2 , 1.2);
				this.halfSphere.display();
			this.scene.popMatrix();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-0.2 , 1.1 + this.antenaRise , -0.2);
				this.scene.rotate(Math.PI/4 , 0 , 1 , 0);

				this.scene.pushMatrix();
					this.material2.apply();
					this.scene.rotate(Math.PI/2 ,  1, 0 , 0);
					this.scene.scale(0.05,1.5 ,0.05);
					this.pipe2.display();
				this.scene.popMatrix();
				
			this.scene.popMatrix();

		    this.scene.pushMatrix();
		    	this.material1.apply();
				this.scene.translate(0.9,1.1+ this.antenaRise,0.9);
				this.scene.scale( 0.08 , 0.08 , 0.08);
				this.sphere.display();
			this.scene.popMatrix();


		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			//this.scene.translate(0, 3.73 , 0);
			this.scene.translate(0 , this.antenaRise, 0);
			this.scene.scale(0.27 , 0.27 , 0.27);
			this.sphere2.display();
		this.scene.popMatrix();

	
	}

	update(){

		if(this.antenaRise < 3.9){
			this.antenaRise += 0.195;
		}
		else{
			this.isUp = true;
		}

	}
}