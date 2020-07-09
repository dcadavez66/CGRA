/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene , nDivs) {
		super(scene);
		nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

		this.nDivs = nDivs;
        this.patchLength = 2.0 / nDivs;


		this.initBuffers();
	}
	initBuffers() {

		let divs = this.nDivs;
		this.vertices = [];

		for(var j = 1 ; j >= -1 ; j -= this.patchLength ){

			for(var i = -1 ; i <= 1 ; i += this.patchLength ){

					this.vertices.push(i , j , 0);
					if( j == -i ){
						break;
					}
			}
		}

		//console.log(this.vertices);

		let triangle_points = [];
		var n_t_edge = 0;
		for(var n = 0 ; n < this.vertices.length ; n++){
			if(this.vertices[n*3] == -1){

				triangle_points.push(n);
			}
			else{

			}
		}
		//console.log(triangle_points);
		this.indices = [];

		/*this.indices.push(0,1,2);
		this.indices.push(1,3,2);
		this.indices.push(2,3,4);
		this.indices.push(2,4,5);*/

		let start_point = 0;
		let end_point = 0;
		let n_of_quads = 0;
		for(var i = 0 ; i < this.nDivs ; i++){

			n_of_quads = i;
			start_point = triangle_points[i];
			console.log(start_point);
		   	for(var j = 0 ; j < n_of_quads ; j++){

		   		this.indices.push(start_point+j , triangle_points[i+1]+j , triangle_points[i]+1+j );
		   		this.indices.push( triangle_points[i]+1+j , triangle_points[i+1]+j  , triangle_points[i+1]+1+j );

		   		this.indices.push(triangle_points[i+1]+j , start_point+j ,  triangle_points[i]+1+j );
		   		this.indices.push( triangle_points[i+1]+j  , triangle_points[i]+1+j ,  triangle_points[i+1]+1+j );
		   			
		   	}
			
			this.indices.push(start_point + n_of_quads, triangle_points[i+1] + n_of_quads , triangle_points[i+1] + n_of_quads + 1);
			this.indices.push(triangle_points[i+1] + n_of_quads ,start_point + n_of_quads,  triangle_points[i+1] + n_of_quads + 1);
		}

		//console.log(this.indices);
		this.normals = [];

		for(var i = 0 ; i <= this.vertices.length ; i++){
			this.normals.push(0 , 0, 1);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

