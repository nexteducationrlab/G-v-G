var slice_flag=false;
var final_degree=0.01;
var task2_index=200;
var activity2_index=0.02;
var activity1_index=0.02;
var viewer;
var canvas;
var body;
var viewerSettings = {
		cameraEyePosition : [-2.0, -1.5, 1.0],
		cameraCenterPosition : [0.0, 0.0, 0.0],
		cameraUpVector : [0.0, 0.0, 1.0]
};

/*
This function is used in all the activities to initialize the canvas. 
The canvas is the place where the 2D shapes appear
*/
initialiseCanvas=function(id,task){
	//Change the camera angle for task3
	if(task=="task3"){
		viewerSettings = {
			cameraEyePosition : [-2.0, -1.5, 0.3],
			cameraCenterPosition : [0.0, 0.0, 0.6],
			cameraUpVector : [0.0, 0.0, 1.0]
		};	
	}
	viewer = new JSM.ThreeViewer ();
	canvas = document.getElementById (id);
	//canvas.width = document.body.clientWidth;
	//canvas.height = document.body.clientHeight;
	viewer.Start (canvas, viewerSettings);
	viewer.navigation.EnableZoom (false);
}
/*
This function creates the rectangle for Activity 1 and Activity 2
*/
createRectangle=function(){

	body = new JSM.Body ();			
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.55, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.55, 0.0, -1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, -1.0)));
	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	return body;

}

/* This function creates the circle for Activity 3*/
createCircle = function(){
	AddBodyToViewer(new JSM.GenerateCuboid(1.0,1.0,1.0));

}

AddBodyToViewer=function(body)
{
	var meshes;
	meshes = JSM.ConvertBodyToThreeMeshes (body);
	viewer.AddMeshes (meshes);	
	viewer.Draw();		
}

removeMeshes=function(){
	viewer.RemoveMeshes ();
}

/*
This function is called when the horizontal swipe gesture is detected in Activity 1.
The rectangle is rotated in the Z axis and added to the previous rectangle.
A series of rectangles rotated in the Z axis results in a cylinder being formed.

*/
rotate=function(direction){
	var transformation;
	if(direction=="right"){
		for(degree = final_degree; degree < final_degree+0.02; degree+=0.002){
			transformation = JSM.RotationZTransformation (degree,new JSM.Coord (0,0,0));
			body.Transform (transformation);
			AddBodyToViewer (body);
		}
	} 
	final_degree=degree;
}

/*
This function is called each time the vertical swipe gesture is detected in Activity 2.
A rectangle is translated and added to the previous rectangle.
This results in multiple rectangles being stacked on top of each other to form a cuboid.
*/
stackCuboid=function(){
	var cuboidBody = new JSM.GenerateCuboid (1, 1, 0.01);
	var addition = JSM.TranslationTransformation (new JSM.Coord (0.0, 0.0, activity1_index));
	var transformation = new JSM.Transformation ();
	transformation.Append (addition);
	cuboidBody.Transform (transformation);
	AddBodyToViewer(cuboidBody);
	activity1_index+=0.02;
}

/*
This function is called each time the vertical swipe gesture is detected in Activity 3.
The circle is translated and added to the previous circle.
This results in multiple circle being stacked on top of each other to form a cylinder.
*/
stackCylinder=function(){
	var cylinderBody = JSM.GenerateCylinder (0.5, 0.01,100,true, false);
	var addition = JSM.TranslationTransformation (new JSM.Coord (0.0, 0.0, activity2_index));
	var transformation = new JSM.Transformation ();
	transformation.Append (addition);
	cylinderBody.Transform (transformation);
	AddBodyToViewer(cylinderBody);
	activity2_index+=0.02;
}