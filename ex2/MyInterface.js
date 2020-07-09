/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
/*
        //Checkbox for cube
        //his.gui.add(this.scene , 'displayCube').name('Display Cube');

        //Checkbox tangram 
        this.gui.add(this.scene , 'displayTangram').name('Display Tangram');

        //Checkbox Quad
        this.gui.add(this.scene , 'displayQuad').name('Display Quad');

        //Checkbox for Diamond
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        //Checkbox for Triangle
        this.gui.add(this.scene , 'displayTriangle').name('Display Triangle');

        //Checkbox for Parallelogram
        this.gui.add(this.scene , 'displayParallelogram').name('Display Para');

        //Checkbox for Big Triangle
        this.gui.add(this.scene , 'displayBigTriangle').name('Display Big T');

        //Checkbox for Big Triangle 2
        this.gui.add(this.scene , 'displayBigTriangle2').name('Display Big T2');


        //Checkbox for Small Triangle
        this.gui.add(this.scene , 'displaySmallTriangle').name('Display Small T');
        */
        return true;
    }
}