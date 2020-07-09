/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object


			|
			A

 */
class MyTriangleSmall extends CGFobject {
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

		this.triangle = new MyTriangle(this.scene , this.nDivs);

		this.vertices = this.vertices.concat(this.triangle.vertices);
		this.normals = this.normals.concat(this.triangle.normals);
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}


	display(){

		this.scene.pushMatrix();
			this.scene.scale( 0.8, 1 , 1)
			this.scene.rotate(-3*Math.PI/4 , 0,0,1);
			this.triangle.display();
		this.scene.popMatrix();
	}
}

