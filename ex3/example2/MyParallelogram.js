/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
                     B_________D____F			
				   -              -
				 -              -
	 			A____C________ E

 */
class MyParallelogram extends CGFobject {
	constructor(scene , nDivs) {
		super(scene);
		nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;
		this.nDivs = nDivs;
		this.initBuffers();
	}
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		this.triangle1 = new MyTriangle(this.scene , this.nDivs);

		this.vertices = this.vertices.concat(this.triangle1.vertices);
        
        this.normals = this.normals.concat(this.triangle1.normals);
        ///////////////////////////////////////////////////////////

		
        ///////////////////////////////////////////////////////////
		this.triangle4 = new MyTriangle(this.scene , this.nDivs);

		this.vertices = this.vertices.concat(this.triangle4.vertices);
        
        this.normals = this.normals.concat(this.triangle4.normals);
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		
		this.initGLBuffers();
	}

	display(){

		this.scene.pushMatrix();

			this.scene.scale(-1 , 1 , 1);
			this.scene.rotate( -5*Math.PI/4, 0, 0, 1);

			this.scene.pushMatrix();
				this.scene.translate( 1, 1 ,0 );
				this.scene.rotate(Math.PI/2 , 0,0,1);
				super.display();
				this.triangle1.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate( 3, 1 ,0 );
				this.scene.rotate(-Math.PI/2 , 0,0,1);
				super.display();
				this.triangle4.display();
			this.scene.popMatrix();

		this.scene.popMatrix();
	}
}

