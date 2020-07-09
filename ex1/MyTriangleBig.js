/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0 A
			0, 1, 0,	//1 B
			0, 2, 0,	//2 C
		   -1, 1, 0,    //3 D
		    1, 1, 0,    //4 E
		   -2, 0, 0,    //5 F
		    2, 0, 0,    //6 G
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			
			0, 2, 5,
			0, 6, 2/*,
			2, 0, 5,
			6, 0, 2*/


		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;


		this.initGLBuffers();
	}
}

