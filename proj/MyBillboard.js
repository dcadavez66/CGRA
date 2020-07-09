class MyBillboard extends CGFobject{

	constructor(scene){
		super(scene);
		this.init();
		this.initMaterials();
	}


	init(){

		// this.billboardFront = new MyQuadSupply(this.scene);
		this.billboardFront = new MyPlane(this.scene);
		this.billboardBack = new MyQuadSupply(this.scene);
		this.billboardRight = new MyQuadSupply(this.scene);
		this.billboardLeft = new MyQuadSupply(this.scene);
		this.billboardTop = new MyQuadSupply(this.scene);
		this.billboardBottom= new MyQuadSupply(this.scene);
		this.leg1 = new MyCube(this.scene);
		this.leg2 = new MyCube(this.scene);

        //precalculations
        this.piHalfs = Math.PI/2;
        this.NpiHalfs = -Math.PI/2;
        this.Npi = -Math.PI; 
	}

	initMaterials(){

        this.billboardpaintSide = new CGFappearance(this.scene);
        this.billboardpaintSide.setAmbient(1, 1, 1, 1);
        this.billboardpaintSide.setDiffuse(0.1, 0.1, 0.1, 1);
        this.billboardpaintSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.billboardpaintSide.setShininess(10.0);
        this.billboardpaintSide.loadTexture('images/suppliesDeliveredSides.png');
        this.billboardpaintSide.setTextureWrap('REPEAT', 'REPEAT'); 

        this.wood = new CGFappearance(this.scene);
        this.wood.setAmbient(1, 1, 1, 1);
        this.wood.setDiffuse(0.1, 0.1, 0.1, 1);
        this.wood.setSpecular(0.1, 0.1, 0.1, 1);
        this.wood.setShininess(10.0);
        this.wood.loadTexture('images/wood.png');
        this.wood.setTextureWrap('REPEAT', 'REPEAT');   

		this.billboardpaint = new CGFappearance(this.scene);
        this.billboardpaint.setAmbient(1, 1, 1, 1);
        this.billboardpaint.setDiffuse(0.1, 0.1, 0.1, 1);
        this.billboardpaint.setSpecular(0.1, 0.1, 0.1, 1);
        this.billboardpaint.setShininess(10.0);
        this.texture = new CGFtexture(this.scene , "images/suppliesDelivered_EXP2.png");
        this.billboardpaint.setTexture(this.texture);
        this.billboardpaint.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = new CGFshader(this.scene.gl ,"shaders/billboard.vert", "shaders/billboard.frag");	
        this.shader.setUniformsValues({uSampler2: 1});
	}


	display(){
		 
		 this.wood.apply();

		 this.scene.pushMatrix();
		 	this.scene.scale(0.1 , 1 , 0.1);
		 	this.leg1.display();
		 this.scene.popMatrix();

		 this.scene.pushMatrix();
		 	this.scene.translate(1.6 , 0, 0);
		 	this.scene.scale(0.1 , 1 , 0.1);
		 	this.leg2.display();
		 this.scene.popMatrix();


		 this.scene.pushMatrix();

		 	this.scene.scale(2 ,1, 0.2 );
		 	this.scene.translate(0.4 , 1, 0);


            this.billboardpaintSide.apply();
           
            //face5 - Side
            this.scene.pushMatrix();
                this.scene.rotate(Math.PI , 0, 0, 1);

                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0 , 0 , -0.5);
                    this.scene.rotate(this.NpiHalfs , 1 ,0, 0);
                    this.billboardBack.display();
                this.scene.popMatrix();
            this.scene.popMatrix();

            
            //face2 -Side
            this.scene.pushMatrix();
                this.scene.rotate(this.piHalfs , 1, 0, 0);

                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0.5 , 0 , 0);
                    this.scene.rotate(this.NpiHalfs , 0 ,0, 1);
                    this.billboardRight.display();
                this.scene.popMatrix();

            this.scene.popMatrix();

            //face3 -Side
            this.scene.pushMatrix();
                this.scene.rotate(this.piHalfs , 1, 0, 0);

                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(-0.5 , 0 , 0);
                    this.scene.rotate(this.piHalfs , 0 ,0, 1);
                    this.billboardLeft.display();
                this.scene.popMatrix();

            this.scene.popMatrix();
            

            //face1 --TOP
            this.scene.pushMatrix();
                this.scene.scale(-1,1,1);
                this.scene.translate(0 , 0.5 , 0);
                this.scene.rotate(this.NpiHalfs , 0 , 1 , 0);
                this.billboardTop.display();
            this.scene.popMatrix();
            
            //face0 -BOT
            this.scene.pushMatrix();

                this.scene.rotate(this.NpiHalfs , 0 , 1 , 0);
                this.scene.pushMatrix();
                    this.scene.scale(-1,1,1);
                    this.scene.translate(0 , -0.5 , 0);
                    this.scene.rotate(this.Npi , 1 , 0 , 0 );
                    this.billboardBottom.display();
                this.scene.popMatrix();

            this.scene.popMatrix();

           this.billboardpaint.apply();
            this.scene.setActiveShader(this.shader);
            this.texture.bind(1);
            //face4 - Side
            this.scene.pushMatrix();
                this.scene.scale(-1,1,1);
                this.scene.translate(0 , 0 , 0.5);
                this.scene.rotate(Math.PI , 1 ,0, 0);
                this.billboardFront.display();
            this.scene.popMatrix();

        this.scene.popMatrix(); 
	}

    update(dropped){
        this.shader.setUniformsValues({suppliesDropped: dropped});
    }
}