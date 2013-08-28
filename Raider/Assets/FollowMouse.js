#pragma strict
var mousePosition:Vector2 = Vector2.zero;

function Start () {

}

function Update () 
{
	CalculateMouse();
	
	transform.position.x = mousePosition.x/Screen.width;
	transform.position.y = mousePosition.y/Screen.height;
}

function CalculateMouse()
{
	mousePosition.x = Mathf.Clamp(Input.mousePosition.x, -Screen.width, Screen.width);
	mousePosition.y = Mathf.Clamp(Input.mousePosition.y, -Screen.height, Screen.height);
}