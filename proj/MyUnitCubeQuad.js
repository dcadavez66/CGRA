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
	}

	init(){

      this.index = 0;  
      this.face0 = new MyQuad(this.scene);    
      this.face1 = new MyQuad(this.scene);
      this.face2 = new MyQuad(this.scene);
      this.face3 = new MyQuad(this.scene);
      this.face4 = new MyQuad(this.scene);
	  this.face5 = new MyQuad(this.scene);

      //precalculations
      this.piHalfs = Math.PI/2;
      this.NpiHalfs = -Math.PI/2;

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


        this.mountain2Front = new CGFtexture(this.scene , 'images/split_cubemap/front2.png');
        this.mountain2Back = new CGFtexture(this.scene , 'images/split_cubemap/back2.png');
        this.mountain2Right = new CGFtexture(this.scene, 'images/split_cubemap/right2.png');
        this.mountain2Left = new CGFtexture(this.scene , 'images/split_cubemap/left2.png');
        this.mountain2Top = new CGFtexture(this.scene , 'images/split_cubemap/top2.png');

        this.textures = [
                [this.montainFront,
                this.montainBack,
                this.montainRight,
                this.montainLeft,
                this.montainTop],

                [this.mountain2Front,
                this.mountain2Back,
                this.mountain2Right,
                this.mountain2Left,
                this.mountain2Top],
        ];

    }
	
	display(){

        this.cubeRight.apply();

        //face4 - Side
        this.scene.pushMatrix();
            this.scene.translate(0 , 0 , 0.5);
            this.scene.rotate(this.piHalfs , 1 ,0, 0);
            this.face4.display();
        this.scene.popMatrix();

        
        this.cubeLeft.apply();

        //face5 - Side
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI , 0, 0, 1);

            this.scene.pushMatrix();
                this.scene.translate(0 , 0 , -0.5);
                this.scene.rotate(this.NpiHalfs , 1 ,0, 0);
                this.face5.display();
            this.scene.popMatrix();
        this.scene.popMatrix();

        this.cubeBack.apply();

        //face2 -Side
        this.scene.pushMatrix();
            this.scene.rotate(this.piHalfs , 1, 0, 0);

            this.scene.pushMatrix();
                this.scene.translate(0.5 , 0 , 0);
                this.scene.rotate(this.NpiHalfs , 0 ,0, 1);
                this.face2.display();
            this.scene.popMatrix();

        this.scene.popMatrix();

        this.cubeFront.apply();
        
        //face3 -Side
        this.scene.pushMatrix();
            this.scene.rotate(this.piHalfs , 1, 0, 0);

            this.scene.pushMatrix();
                this.scene.translate(-0.5 , 0 , 0);
                this.scene.rotate(this.piHalfs , 0 ,0, 1);
                this.face3.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
        
        this.cubeTop.apply();     

        //face1 --TOP
        this.scene.pushMatrix();
            this.scene.translate(0 , 0.5 , 0);
            this.scene.rotate(this.NpiHalfs , 0 , 1 , 0);
            this.face1.display();
        this.scene.popMatrix();
		
	}


    updateCubeAppliedTexture(index){

        this.index = index;

        this.cubeFront.setTexture(this.textures[this.index][0]);
        this.cubeBack.setTexture(this.textures[this.index][1]);
        this.cubeRight.setTexture(this.textures[this.index][2]);
        this.cubeLeft.setTexture(this.textures[this.index][3]);
        this.cubeTop.setTexture(this.textures[this.index][4]);
    }
}

