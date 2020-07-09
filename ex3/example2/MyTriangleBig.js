/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangleBig extends CGFobject {
	constructor(scene , nDivs) {
		super(scene);
		nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

		this.nDivs = nDivs;
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];

		this.normals = [];

		this.triangle = new MyTriangle(this.scene , this.nDivs);

		this.vertices = this.vertices.concat(this.triangle.vertices);
		this.normals = this.normals.concat(this.triangle.normals);

		this.triangle2 = new MyTriangle(this.scene , this.nDivs);

		this.vertices = this.vertices.concat(this.triangle2.vertices);
		this.normals = this.normals.concat(this.triangle2.normals);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;


		this.initGLBuffers();
	}

	display(){

		this.scene.pushMatrix();
			this.scene.translate(1 , 1 , 0);
			this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1 , 1 , 0);
			this.scene.rotate( Math.PI/2, 0 , 0, 1);
			this.triangle2.display();
		this.scene.popMatrix();


	}
}

