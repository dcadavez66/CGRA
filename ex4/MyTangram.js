/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {


	constructor(scene, coords) {
		super(scene);
		this.init();
        this.initMaterials();
		this.display();
	}

	init(){

        this.vertices = [];
        this.normals = [];
        this.diamond = new MyDiamond(this.scene);

        this.indices = [];
        this.triangle = new MyTriangle(this.scene);

        this.parallelogram = new MyParallelogram(this.scene);

        this.smallTriangle = new MyTriangleSmall(this.scene);

        this.smallTriangle2 = new MyTriangleSmall(this.scene);

        //console.log(this.smallTriangle2.vertices);
        this.bigTriangle = new MyTriangleBig(this.scene);

        this.bigTriangle2 = new MyTriangleBig(this.scene);

        ///////////////////////////////////////////

        //this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
	}




	initMaterials(){

        this.blueCoords = [0.5,0.5,1,0,0,0];
        this.orangeCoords = [0.5,0.5,1,1,1,0];

        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(0.1, 0.1, 0.1, 1);
        this.red.setDiffuse(0.9, 0.9, 0.9, 1);
        this.red.setSpecular(0.1, 0.1, 0.1, 1);
        this.red.setShininess(10.0);
        this.red.loadTexture('images/tangram.png');
        this.red.setTextureWrap('REPEAT', 'REPEAT');


        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(0.1, 0.1, 0.1, 1);
        this.pink.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pink.setSpecular(0.1, 0.1, 0.1, 1);
        this.pink.setShininess(10.0);
        this.pink.loadTexture('images/tangram.png');
        this.pink.setTextureWrap('REPEAT', 'REPEAT');


        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(0.1, 0.1, 0.1, 1);
        this.orange.setDiffuse(0.9, 0.9, 0.9, 1);
        this.orange.setSpecular(0.1, 0.1, 0.1, 1);
        this.orange.setShininess(10.0);
        this.orange.loadTexture('images/tangram.png');
        this.orange.setTextureWrap('REPEAT', 'REPEAT');


        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0.1, 0.1, 0.1, 1);
        this.green.setDiffuse(0.9, 0.9, 0.9, 1);
        this.green.setSpecular(0.1, 0.1, 0.1, 1);
        this.green.setShininess(10.0);
        this.green.loadTexture('images/tangram.png');
        this.green.setTextureWrap('REPEAT', 'REPEAT');

        //
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.1, 0.1, 0.1, 1);
        this.purple.setDiffuse(0.9, 0.9, 0.9, 1);
        this.purple.setSpecular(0.1, 0.1, 0.1, 1);
        this.purple.setShininess(10.0);
        this.purple.loadTexture('images/tangram.png');
        this.purple.setTextureWrap('REPEAT', 'REPEAT');

        //Blue color - Big triangle
        this.blueMat = new CGFappearance(this.scene);
        this.blueMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.blueMat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.blueMat.setSpecular(0.1, 0.1, 0.1, 1);
        this.blueMat.setShininess(10.0);
        this.blueMat.loadTexture('images/tangram.png');
        this.blueMat.setTextureWrap('REPEAT', 'REPEAT');

        //Yellow color - parallelogram
        this.yellowMat = new CGFappearance(this.scene);
        this.yellowMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.yellowMat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.yellowMat.setSpecular(0.1, 0.1, 0.1, 1);
        this.yellowMat.setShininess(10.0);
        this.yellowMat.loadTexture('images/tangram.png');
        this.yellowMat.setTextureWrap('REPEAT', 'REPEAT');
    }

    updateTexCoords() {
        this.bigTriangle.updateTexCoords(this.blueCoords);
        this.bigTriangle2.updateTexCoords(this.orangeCoords);
    }


	display(){
        this.updateTexCoords();
        this.red.apply();
		//Small triangle draw (Red)
        this.scene.pushMatrix();
            this.scene.translate(-(2*Math.sqrt(2)-2),5,0);
            this.scene.rotate((Math.PI/2) , 0, 0, 1);
            this.smallTriangle2.display();
        this.scene.popMatrix();

        this.purple.apply();
         //Small triangle draw
        this.scene.pushMatrix();
            this.scene.translate(1,-1.8,0);
            this.scene.rotate(-(3*Math.PI/4) , 0, 0, 1);
            this.smallTriangle.display();
        this.scene.popMatrix();

        this.pink.apply();
        //Triangle draw
        this.scene.pushMatrix();
            this.scene.translate(1,1,0);
            this.scene.rotate(-(Math.PI/2), 0 , 0 , 1);            
            this.triangle.display();
        this.scene.popMatrix();

        this.green.apply();
        //this.scene.customMaterial.apply();
		 //Diamond draw
        this.scene.pushMatrix();
            this.scene.translate(-1.3,-0.3,0);
            this.diamond.display();
        this.scene.popMatrix();
        
        this.yellowMat.apply();
        //Paralelogram draw
        this.scene.pushMatrix();
            this.scene.translate(-2*Math.sqrt(2) +2 ,-Math.sqrt(2)-(2*Math.sqrt(2)-2) , 0);
            this.scene.scale(-1, 1 , 1);
            this.scene.rotate((3*Math.PI/4) , 0, 0, 1);
            this.parallelogram.display();
        this.scene.popMatrix();
       
       this.blueMat.apply();
      //Big triangle 1 draw
       this.scene.pushMatrix();
            this.scene.translate(0.58579,0.58579,0);
            this.scene.rotate(-(3*Math.PI/4) , 0 , 0 , 1);     
            this.bigTriangle.display();
       this.scene.popMatrix();

        this.orange.apply();
        //Big triangle 2 draw
        this.scene.pushMatrix();
            this.scene.translate(2-Math.sqrt(2),2+Math.sqrt(2),0);
            this.scene.rotate((3*Math.PI/4) , 0 , 0 , 1);     
            this.bigTriangle2.display();
        this.scene.popMatrix();
	}

    
}