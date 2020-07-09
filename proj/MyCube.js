/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
        this.initMaterials();
	}

	init(){

      this.index = 0;  
      this.face0 = new MyQuadSupply(this.scene);    
      this.face1 = new MyQuadSupply(this.scene);
      this.face2 = new MyQuadSupply(this.scene);
      this.face3 = new MyQuadSupply(this.scene);
      this.face4 = new MyQuadSupply(this.scene);
	  this.face5 = new MyQuadSupply(this.scene);

      //precalculations
      this.piHalfs = Math.PI/2;
      this.NpiHalfs = -Math.PI/2;
      this.Npi = -Math.PI; 


	}

    initMaterials(){

        this.cubeRight = new CGFappearance(this.scene);
        this.cubeRight.setAmbient(1, 1, 1, 1);
        this.cubeRight.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeRight.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeRight.setShininess(10.0);
        this.cubeRight.loadTexture('images/split_cubemap/right.png');
        this.cubeRight.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeLeft = new CGFappearance(this.scene);
        this.cubeLeft.setAmbient(1, 1, 1, 1);
        this.cubeLeft.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeLeft.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeLeft.setShininess(10.0);
        this.cubeLeft.loadTexture('images/split_cubemap/left.png');
        this.cubeLeft.setTextureWrap('REPEAT', 'REPEAT');


        this.cubeTop = new CGFappearance(this.scene);
        this.cubeTop.setAmbient(1, 1, 1, 1);
        this.cubeTop.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeTop.setShininess(10.0);
        this.cubeTop.loadTexture('images/split_cubemap/top.png');
        this.cubeTop.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeBot = new CGFappearance(this.scene);
        this.cubeBot.setAmbient(1, 1, 1, 1);
        this.cubeBot.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeBot.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeBot.setShininess(10.0);
        this.cubeBot.loadTexture('images/split_cubemap/bottom.png');
        this.cubeBot.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeFront = new CGFappearance(this.scene);
        this.cubeFront.setAmbient(1, 1, 1, 1);
        this.cubeFront.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeFront.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeFront.setShininess(10.0);
        this.cubeFront.loadTexture('images/split_cubemap/front.png');
        this.cubeFront.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeBack = new CGFappearance(this.scene);
        this.cubeBack.setAmbient(1, 1, 1, 1);
        this.cubeBack.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubeBack.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeBack.setShininess(10.0);
        this.cubeBack.loadTexture('images/split_cubemap/back.png');
        this.cubeBack.setTextureWrap('REPEAT', 'REPEAT');


        this.montainFront = new CGFtexture(this.scene , 'images/split_cubemap/front.png');
        this.montainBack = new CGFtexture(this.scene , 'images/split_cubemap/back.png');
        this.montainRight = new CGFtexture(this.scene, 'images/split_cubemap/right.png');
        this.montainLeft = new CGFtexture(this.scene , 'images/split_cubemap/left.png');
        this.montainTop = new CGFtexture(this.scene , 'images/split_cubemap/top.png');
        this.montainBot = new CGFtexture(this.scene , 'images/split_cubemap/bottom.png');


        this.desertFront = new CGFtexture(this.scene , 'images/split_cubemap/front2.png');
        this.desertBack = new CGFtexture(this.scene , 'images/split_cubemap/back2.png');
        this.desertRight = new CGFtexture(this.scene, 'images/split_cubemap/right2.png');
        this.desertLeft = new CGFtexture(this.scene , 'images/split_cubemap/left2.png');
        this.desertTop = new CGFtexture(this.scene , 'images/split_cubemap/top2.png');
        this.desertBot = new CGFtexture(this.scene , 'images/split_cubemap/bottom2.png');

        this.textures = [
                [this.montainFront,
                this.montainBack,
                this.montainRight,
                this.montainLeft,
                this.montainTop,
                this.montainBot],

                [this.desertFront,
                this.desertBack,
                this.desertRight,
                this.desertLeft,
                this.desertTop,
                this.desertBot]
        ];

    }
	
	display(){

        //this.cubeRight.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //face4 - Side
        this.scene.pushMatrix();
            this.scene.translate(0 , 0 , 0.5);
            this.scene.rotate(this.piHalfs, 1 ,0, 0);
            this.face4.display();
        this.scene.popMatrix();

        
        // this.cubeLeft.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //face5 - Side
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI , 0, 0, 1);

            this.scene.pushMatrix();
                this.scene.translate(0 , 0 , -0.5);
                this.scene.rotate(this.NpiHalfs , 1 ,0, 0);
                this.face5.display();
            this.scene.popMatrix();
        this.scene.popMatrix();

        // this.cubeBack.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //face2 -Side
        this.scene.pushMatrix();
            this.scene.rotate(this.piHalfs , 1, 0, 0);

            this.scene.pushMatrix();
                this.scene.translate(0.5 , 0 , 0);
                this.scene.rotate(this.NpiHalfs , 0 ,0, 1);
                this.face2.display();
            this.scene.popMatrix();

        this.scene.popMatrix();

        // this.cubeFront.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //face3 -Side
        this.scene.pushMatrix();
            this.scene.rotate(this.piHalfs , 1, 0, 0);

            this.scene.pushMatrix();
                this.scene.translate(-0.5 , 0 , 0);
                this.scene.rotate(this.piHalfs , 0 ,0, 1);
                this.face3.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
        
        // this.cubeTop.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        

        //face1 --TOP
        this.scene.pushMatrix();
            this.scene.translate(0 , 0.5 , 0);
            this.scene.rotate(this.NpiHalfs , 0 , 1 , 0);
            this.face1.display();
        this.scene.popMatrix();
        

        // this.cubeBot.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        
        //face0 -BOT
        this.scene.pushMatrix();

            this.scene.rotate(this.NpiHalfs , 0 , 1 , 0);
            this.scene.pushMatrix();
                this.scene.translate(0 , -0.5 , 0);
                this.scene.rotate(this.Npi , 1 , 0 , 0 );
                this.face0.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
		
		
	}
}

