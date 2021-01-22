//this will draw the scene (with lighting)
function drawScene(){

	//clear everything first
	while (params.scene.children.length > 0){ 
		params.scene.remove(params.scene.children[0]); 
	}


	var geometry = new THREE.Geometry();
	
	//define the colormap
	params.colorMap = params.colorMapOptions[params.colorMapIndex];
	cmap = d3.scaleSequential(params.colorMap);
	var extent = [params.colorMapMin, params.colorMapMax];
	cmap.domain(extent).nice();

	// Add data points to geometry (to be added to mesh which is added to scene)
	params.data.forEach(function(d){
		// filter by year, type
		if (d.t < params.age && d.type == params.type) {
			geometry.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

			//color by distance
			// dist = Math.sqrt(d.x*d.x + d.y*d.y + d.z*d.z);
			// geometry.colors.push(new THREE.Color(cmap(dist)));

			//color by luminosity
			lum = d.log10lum;
			geometry.colors.push(new THREE.Color(cmap(lum)));
		}
			
	});


	var materialParams = {size: params.size,
						  map: params.sprite, 
						  transparent: true,
						  alphaTest: params.alphaTest,
						  sizeAttenuation: params.sizeAttenuation,
						  vertexColors: THREE.VertexColors };
	var material = new THREE.PointsMaterial( materialParams );
	var mesh = new THREE.Points( geometry, material );

	params.scene.add( mesh );

}

