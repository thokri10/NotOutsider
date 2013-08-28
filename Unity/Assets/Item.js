#pragma strict
var slot:int = 0; //0
var hull:float = 0; //100
var hull_regen:float = 0; //0
var max_speed:float = 0; //100
var acceleration:float = 0; //1
var maneuverability:float = 0; //10
var turnrate:float = 0; //2
var overdrive:float = 0; //2
var shield:float = 0; //100
var shield_recharge:float = 0; //2
var stealth:float = 0; //0
var power:float = 0; //100
var power_regen:float = 0; //1

function Start () 
{
	gameObject.tag = "Item";
}

function Update () 
{
	
}