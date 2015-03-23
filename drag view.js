/**
 * Alignment: Drag view
 * @summary Draggable content layer
 * @description Aligns the selected layer to the top of canvas
 * @author Aaron Martin
 * @copyright Aaron Martin
 * @license MIT
 * @see http://githut-repo-location-of-this-script.com
 * @version 1.0
 */

// create a container for all the views
var swipe = createLayer('Swipe');
swipe.width = Screen.width + 10;
swipe.height = Screen.height;
swipe.backgroundColor = 'transparent';
swipe.left = -10;


// drag actions

var dragSwipe = createDragInteraction(swipe);
dragSwipe.direction = DragDirection.horizontal;

var moveSwipe = createMoveAnimation(swipe);
moveSwipe.basedOn = swipe.dragRelease;
moveSwipe.animates = AnimationMode.withDuration;
moveSwipe.condition = 'swipe.x > ' + Screen.width / 2;
moveSwipe.referenceEdge = Edge.left;
moveSwipe.toX = 335;
moveSwipe.easing = EasingCurve.easeInOutQuadratic;
moveSwipe.duration = 0.3;

var moveSwipeElse = addAnimationCondition(moveSwipe);

moveSwipeElse.basedOn = swipe.drag;
moveSwipeElse.animates = AnimationMode.withDuration;
moveSwipeElse.condition = 'swipe.x < ' + Screen.width / 2;
moveSwipeElse.toX = -10;
moveSwipeElse.easing = EasingCurve.easeInOutQuadratic;
moveSwipeElse.duration = 0.3;


// create nested-layers inside main swipe view
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

