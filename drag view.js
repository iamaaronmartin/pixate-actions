/**
 * Drag view
 * @summary Draggable content layer
 * @description Aligns the selected layer to the top of canvas
 * @author Aaron Martin
 * @copyright Aaron Martin
 * @license MIT
 * @see http://githut-repo-location-of-this-script.com
 * @version 1.0
 */


// Global variables

	// Where the swipe view will begin on screen
	var swipeResting = 335;

	// Where the swipe view will be pushed away to on dismissal
	var swipeAway = 335;


// Create a container for all the views

var swipe = createLayer('Swipe');
swipe.width = Screen.width + 10;
swipe.height = Screen.height;
swipe.backgroundColor = '#ffffff';
swipe.left = swipeResting;


// Drag actions on the 'swipe' view

var dragSwipe = createDragInteraction(swipe);
dragSwipe.direction = DragDirection.horizontal;

var moveSwipe = createMoveAnimation(swipe);
moveSwipe.basedOn = swipe.dragRelease;
moveSwipe.animates = AnimationMode.withDuration;
moveSwipe.condition = 'swipe.x > ' + Screen.width / 2;
moveSwipe.referenceEdge = Edge.left;
moveSwipe.toX = swipeAway;
moveSwipe.easing = EasingCurve.easeInOutQuadratic;
moveSwipe.duration = 0.3;

var moveSwipeElse = addAnimationCondition(moveSwipe);

moveSwipeElse.basedOn = swipe.drag;
moveSwipeElse.animates = AnimationMode.withDuration;
moveSwipeElse.condition = 'swipe.x < ' + Screen.width / 2;
moveSwipeElse.toX = -10;
moveSwipeElse.easing = EasingCurve.easeInOutQuadratic;
moveSwipeElse.duration = 0.3;


// Create the nested-layers inside of the 'swipe' view

var shadowLeft = createLayer('shadow left');
shadowLeft.width = 10;
shadowLeft.height = Screen.height;
shadowLeft.x = 0;
shadowLeft.backgroundColor = 'transparent';

var content = createLayer('content');
content.width = Screen.width;
content.height = Screen.height;
content.left = 10;
content.backgroundColor = 'transparent';
createScrollInteraction(content);


// Create the shadow on the left edge of the 'swipe' view

var SHADOWS = 10;
var label, view;

for (var i = SHADOWS-1; i >= 0; i--) {

	// the numbering we'll use for layer names
	label = i;

	view = createLayer('shadow' + label);
	view.width = 1;
	view.height = Screen.height;
	view.x = 0 + i;
	view.backgroundColor = '#000';
	view.opacity = 0.0125 * i;
	nestLayers(shadowLeft, view);

}


// Nest all the layers

nestLayers(swipe, shadowLeft, content);
