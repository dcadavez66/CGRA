/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {


	constructor(scene) {
		super(scene);
		this.init();
        this.initMaterials();
		this.display();
	}

	init(){

      this.face0 = new MyQuad(this.scene);    
      this.face1 = new MyQuad(this.scene);
      this.face2 = new MyQuad(this.scene);
      this.face3 = new MyQuad(this.scene);
      this.face4 = new MyQuad(this.scene);
	  this.face5 = new MyQuad(this.scene);

	}

    initMaterials(){

        this.cubeSides = new CGFappearance(this.scene);
        this.cubeSides.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeSides.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeSides.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeSides.setShininess(10.0);
        this.cubeSides.loadTexture('images/mineSide.png');
        this.cubeSides.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeTop = new CGFappearance(this.scene);
        this.cubeTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeTop.setShininess(10.0);
        this.cubeTop.loadTexture('images/mineTop.png');
        this.cubeTop.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeBot = new CGFappearance(this.scene);
        this.cubeBot.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeBot.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeBot.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeBot.setShininess(10.0);
        this.cubeBot.loadTexture('images/mineBottom.png');
        this.cubeBot.setTextureWrap('REPEAT', 'REPEAT');


    }
	
	display(){

        this.cubeSides.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //face4 - Side
        this.scene.pushMatrix();
            this.scene.translate(0 , 0 , 0.5);
            this.scene.rotate(Math.PI/2 , 1 ,0, 0);
            this.face4.display();
        this.scene.popMatrix();

        //face5 - Side
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI , 0, 0, 1);

            this.scene.pushMatrix();
                this.scene.translate(0 , 0 , -0.5);
                this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
                this.face5.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
        //face2 -Side
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2 , 1, 0, 0);

            this.scene.pushMatrix();
                this.scene.translate(0.5 , 0 , 0);
                this.scene.rotate(-Math.PI/2 , 0 ,0, 1);
                this.face2.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
        //face3 -Side
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2 , 1, 0, 0);

            this.scene.pushMatrix();
                this.scene.translate(-0.5 , 0 , 0);
                this.scene.rotate(Math.PI/2 , 0 ,0, 1);
                this.face3.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
        
        this.cubeTop.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        

        //face1 --TOP
        this.scene.pushMatrix();
            this.scene.translate(0 , 0.5 , 0);
            this.face1.display();
        this.scene.popMatrix();
        

        this.cubeBot.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        
        //face0 -BOT
        this.scene.pushMatrix();
            this.scene.translate(0 , -0.5 , 0);
            this.scene.rotate(-Math.PI , 1 , 0 , 0 );
            this.face0.display();
        this.scene.popMatrix();

        
		
		
	}
}

