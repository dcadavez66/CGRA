/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {


	constructor(scene , nDivs) {
		super(scene);
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        
        this.objects = [];

        this.nDivs = nDivs;
		this.init();
        this.initMaterials();
		this.display();
	}

	init(){

        this.vertices = [];
        this.normals = [];
        this.diamond = new MyDiamond(this.scene , this.nDivs);

        this.indices = [];

        this.vertices = this.vertices.concat(this.diamond.vertices);
        
        this.normals = this.normals.concat(this.diamond.normals);

        this.triangle = new MyTriangle(this.scene , this.nDivs);

        this.vertices = this.vertices.concat(this.triangle.vertices);
        this.normals = this.normals.concat(this.triangle.normals);

        this.parallelogram = new MyParallelogram(this.scene , this.nDivs);

        this.vertices = this.vertices.concat(this.parallelogram.vertices);
        this.normals = this.normals.concat(this.parallelogram.normals);


        this.smallTriangle = new MyTriangleSmall(this.scene, this.nDivs);
        this.vertices = this.vertices.concat(this.smallTriangle.vertices);
        this.normals = this.normals.concat(this.smallTriangle.normals);


        this.smallTriangle2 = new MyTriangleSmall(this.scene , this.nDivs);
        this.vertices = this.vertices.concat(this.smallTriangle2.vertices);
        this.normals = this.normals.concat(this.smallTriangle2.normals);

        this.bigTriangle = new MyTriangleBig(this.scene , this.nDivs);
        this.vertices = this.vertices.concat(this.bigTriangle.vertices);
        this.normals = this.normals.concat(this.bigTriangle.normals);

        this.bigTriangle2 = new MyTriangleBig(this.scene , this.nDivs);

        this.vertices = this.vertices.concat(this.bigTriangle2.vertices);
        this.normals = this.normals.concat(this.bigTriangle2.normals);
        ///////////////////////////////////////////

        //this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
	}


	initMaterials(){

        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(0.7, 0, 0, 1.0);
        this.red.setDiffuse(0, 0, 0, 1.0);
        this.red.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.red.setShininess(10.0);

        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(0.9, 0.3, 0.5, 1.0);
        this.pink.setDiffuse(0, 0, 0, 1.0);
        this.pink.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.pink.setShininess(10.0);

        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(0.9, 0.3, 0, 1.0);
        this.orange.setDiffuse(0, 0, 0, 1.0);
        this.orange.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.orange.setShininess(10.0);

        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0.5, 1, 0, 1.0);
        this.green.setDiffuse(0, 0, 0, 1.0);
        this.green.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.green.setShininess(10.0);

        //
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.6, 0, 1, 1.0);
        this.purple.setDiffuse(0, 0, 0, 1.0);
        this.purple.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.purple.setShininess(10.0);

        //Blue color - Big triangle
        this.blueMat = new CGFappearance(this.scene);
        this.blueMat.setAmbient(0,0.7,0.7, 1.0);
        this.blueMat.setDiffuse(0,0.7,0.7, 1.0);
        this.blueMat.setSpecular(1, 1, 1, 1.0);
        this.blueMat.setShininess(10.0);

        //Yellow color - parallelogram
        this.yellowMat = new CGFappearance(this.scene);
        this.yellowMat.setAmbient(1,1,0.1 , 1);
        this.yellowMat.setDiffuse(1,1,0.1 , 1);
        this.yellowMat.setSpecular(1, 1, 1, 1.0);
        this.yellowMat.setShininess(10.0);

    }
	display(){

    
        this.red.apply();
		//Small triangle draw (Red)
        this.scene.pushMatrix();
            
            this.scene.translate(-(2*Math.sqrt(2)-2),5,0);
            this.scene.rotate((Math.PI/2) , 0, 0, 1);
            super.display();
            this.smallTriangle2.display();
        this.scene.popMatrix();

        this.purple.apply();
         //Small triangle draw
        this.scene.pushMatrix();
            this.scene.translate(-0.2,-3,0);
            this.scene.rotate(-(3*Math.PI/4) , 0, 0, 1);
             super.display();
            this.smallTriangle.display();
        this.scene.popMatrix();

        this.pink.apply();
        //Triangle draw
        this.scene.pushMatrix();
            this.scene.translate(1,1,0);
            this.scene.rotate(-(Math.PI/2), 0 , 0 , 1);            
            super.display();
            this.triangle.display();
        this.scene.popMatrix();

        //this.green.apply();
        this.scene.customMaterial.apply();
		 //Diamond draw
        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/4 , 0 , 0, 1);
            this.scene.translate(-1,-1.3,0);
            super.display();
            this.diamond.display();
        this.scene.popMatrix();
        
        this.yellowMat.apply();
        //Paralelogram draw
        this.scene.pushMatrix();
            this.scene.translate(-2*Math.sqrt(2)+0.84 ,-Math.sqrt(2)-(2*Math.sqrt(2)-2) -0.56 , 0);
            this.scene.scale(-1, 1 , 1);
            this.scene.rotate((3*Math.PI/4) , 0, 0, 1);
            super.display();
            this.parallelogram.display();
        this.scene.popMatrix();
       
       this.blueMat.apply();
      //Big triangle 1 draw
       this.scene.pushMatrix();
            this.scene.translate(0.58579,0.58579,0);
            this.scene.rotate(-(3*Math.PI/4) , 0 , 0 , 1);
            super.display();       
            this.bigTriangle.display();
       this.scene.popMatrix();

        this.orange.apply();
        //Big triangle 2 draw
        this.scene.pushMatrix();
            this.scene.translate(2-Math.sqrt(2),2+Math.sqrt(2),0);
            this.scene.rotate((3*Math.PI/4) , 0 , 0 , 1);
            super.display();       
            this.bigTriangle2.display();
        this.scene.popMatrix();
	}

    updateBuffers(complexity){
        this.nDivs = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10

        // reinitialize buffers
        this.init();
        this.initNormalVizBuffers();
    }

    
}

