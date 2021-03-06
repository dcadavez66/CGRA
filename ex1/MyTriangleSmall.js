/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object


			|
			A

 */
class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0 A
			0, 1, 0,	//1 B
		   -1, 0, 0,	//2 C
			1, 0, 0     //3 D
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0,1,2,
			0,3,1/*,
			1,0,2,
			3,0,1	*/

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

