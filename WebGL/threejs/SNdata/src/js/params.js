//all "global" variables are contained within params object
var params;
function defineParams(){
	params = new function() {
		//to hold the data
		this.data;
		
		this.container = null;
		this.renderer = null;
		this.scene = null;

		//for frustum      
		this.zmax = 5.e10;
		this.zmin = 1;
		this.fov = 45.

		//for gui
		this.gui = null;

		//a texture for the points (from here https://github.com/mrdoob/three.js/blob/master/examples/textures/sprites)
		this.sprite = new THREE.TextureLoader().load( 'src/textures/disc.png' );

		//for the material of the points
		this.size = 8;
		this.alphaTest = 0.1;
		this.sizeAttenuation = true;

		//define some colors (https://github.com/d3/d3-scale-chromatic)
		this.colorMapOptions = [d3.interpolateReds,
								d3.interpolateViridis,
								d3.interpolatePiYG,
								d3.interpolateGreens];
		this.colorMapOptionsGUI = {'reds':0,
								   'viridis':1,
								   'pink-green':2,
								   'greens':3
								}
		this.colorMapIndex = 1;
		this.colorMap = this.colorMapOptions[this.colorMapIndex];
		this.colorMapMin = 5;
		this.colorMapMax = 18;
		this.ageRange;
		this.age = 2019;
		this.type_set;
		this.type = 'II';
	};


}
