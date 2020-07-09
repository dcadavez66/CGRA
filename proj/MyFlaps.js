
class MyFlaps extends CGFobject{

	constructor(scene){
		super(scene);	
		this.init();
		this.initMaterials();
	}

	init(){

		this.quarterCircle = new MyQuarterCircle(this.scene);
		this.square = new MyPlaneFlap(this.scene, 50);
		this.turn = 0;

		//precalculations
		this.NpiHalfs = -Math.PI/2;
	}

	initMaterials(){
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/Flap.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(1, 1, 1, 1);
        this.material2.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material2.setSpecular(0.1, 0.1, 0.1, 1);
        this.material2.setShininess(10.0);
        this.material2.loadTexture('images/Flap2.png');
        this.material2.setTextureWrap('REPEAT', 'REPEAT');

	}

	display(){
		if (this.scene.displayNormals)
            this.quarterCircle.enableNormalViz();
        else
            this.quarterCircle.disableNormalViz();
        
		this.scene.pushMatrix();
			this.scene.rotate(this.NpiHalfs , 0 , 1 , 0);
			this.material.apply();	
			this.quarterCircle.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();

			this.scene.rotate( this.turn , 0 , 1 , 0);

			this.scene.pushMatrix();
				this.scene.translate(0 , 0.5 , -0.5);
				this.scene.rotate(this.NpiHalfs , 0 , 1 , 0);	
				this.material2.apply();
				this.square.display();
			this.scene.popMatrix();

		this.scene.popMatrix();
	}

	setTurn(turn){
		this.turn = turn;
	}
}