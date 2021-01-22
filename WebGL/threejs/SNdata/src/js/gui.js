//this creates the user interface (gui)
//http://workshop.chromeexperiments.com/examples/gui
function createUI(){


	//redrawing every time is not the fastest, but it works for this number of points
	
	params.gui = new dat.GUI();
	params.gui.add( params, 'size', 0,100).onChange(drawScene);
	params.gui.add( params, 'alphaTest', 0,1).onChange(drawScene);
	params.gui.add( params, 'sizeAttenuation').onChange(drawScene);
	params.gui.add( params, 'colorMapMin', 0,10).onChange(drawScene);
	params.gui.add( params, 'colorMapMax', 10,5e1).onChange(drawScene);
	params.gui.add( params, 'colorMapIndex', params.colorMapOptionsGUI).onChange(drawScene).name('colorMap');
	params.gui.add( params, 'age', params.ageRange[0], params.ageRange[1]).onChange(drawScene).name('age (1885.7-2019.7)');
}