/**
 * MyCircle
 * @constructor
 * @param scene - Reference to MyScene object
 * equation: (x-a)^2 + (y-b)^2 = r^2
 */
class MyQuarterCircle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];
		let a = 0;
		let b = 0;
		let x = 0;
		let y = 0;
		let grade = 0.01;
		let r = 1;
		let teta = 0;
		let i = 1;

		this.vertices.push(a,b,0);
		this.normals.push(0,0,1);
		this.vertices.push(-r,0,0);
		this.normals.push(0,0,1);
		
		for(let teta = 0; teta <= Math.PI/2 ; teta += grade ){

			x = Math.cos(teta);
			y = Math.sin(teta);
			this.vertices.push(x , y , 0);
			this.indices.push(0, i , i+1);
			this.indices.push(0, i+1 , i);
			this.normals.push(0,0,1);
			this.texCoords.push( (x+1)/2.0, ((y*(-1))+1)/2.0);
			i++;
		}
		this.vertices = this.vertices.concat(this.vertices);

		this.normals.push(0,0,-1);
		this.normals.push(0,0,-1);

		for(let teta = 0; teta <= Math.PI/2 ; teta += grade ){
			this.normals.push(0,0,-1);
		}
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
