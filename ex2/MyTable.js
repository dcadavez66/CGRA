/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTable extends CGFobject {


	constructor(scene) {
		super(scene);
		this.init();
		this.display();
	}

	init(){

<<<<<<< HEAD
        this.tableleg = new MyTableLeg(this.scene);


	}
	
	display(){
		
        this.tableleg.display();
      
	}
}
=======
        this.tabletop = new MyTabletop(this.scene);
        

		
	}
	
	display(){
        this.scene.pushMatrix();
            this.scene.translate(0 , 0.95 , 0);
            this.tabletop.display();
        this.scene.popMatrix();
		
	}
}

>>>>>>> 97b1df5a7484aa654e19c93220d9a7d35c2f4731
