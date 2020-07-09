

class MyQuarterCylinder extends CGFobject {
	constructor(scene, nDivs, top) {
		super(scene);
		nDivs = typeof nDivs !== 'undefined' ? nDivs : 3;
		top = typeof top !== 'undefined' ? top : true
		this.top = top;
		this.nDivs = nDivs;
		this.initBuffers();
	}
	initBuffers() {

		this.vertices=[];
		this.indices=[];
		this.normals=[];
		
		this.texCoords = [];

		let a = 0;
		let b = 0;
		let x = 0;
		let y = 1;
		let z = 0;
		let grade = 2*Math.PI/this.nDivs;
		let r = 1;
		let teta = 0;
		let i = 1;
		let j = 0;
		let total_i = 0;
		let start_top = 0;
		let x_teta_45 = [];
		let z_teta_45 = [];
		let teta_45_index = 0;
		

		this.vertices.push(a,0,b);
		this.normals.push(0,-1,0);

		this.vertices.push(0,0,r);
		this.normals.push(0,0,r);

		for(let teta = Math.PI/2; teta <= Math.PI ; teta += grade ){


			x = Math.cos(teta);
			z = Math.sin(teta);
			
			this.vertices.push(x , 0 , z);
			this.normals.push(x,0,z);
			if(this.top){
				this.indices.push(0, i , i+1);	
			}

			i++;
		}	

		total_i = i;
		start_top = total_i+1;
		j = total_i+2;

		this.vertices.push(a,y,b);
		this.normals.push(0,1,0);
		this.vertices.push(0,y,r);
		this.normals.push(0,0,r);

		for(let teta = Math.PI/2; teta <= Math.PI ; teta += grade){
			x = Math.cos(teta);
			z = Math.sin(teta);
			this.vertices.push(x , y , z);
			this.normals.push(x,0,z);
			if(this.top){
				this.indices.push(start_top, j+1 , j);	
			}
			
			j++;
		}
			

		i = 1;
		j = total_i +2;
		for(let teta = Math.PI/2; teta <= Math.PI ; teta += grade){

			this.indices.push(j, i, i+1);
			this.indices.push(j, i+1,i);
			
			this.indices.push(j,j+1, i+1);
			this.indices.push(j+1,j, i+1);
			
			i++;
			j++;
		}

		this.vertices = this.vertices.concat(this.vertices);

		for(let k = 0 ; k < total_i *2 ; k++){
			if(k <= total_i){
				this.normals.push(0,-1,0);
			}
			else{
				this.normals.push(0,1,0);
			}
		}
		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
