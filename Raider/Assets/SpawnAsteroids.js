#pragma strict
var asteroid:GameObject;
var number_of_asteroids:int = 5;

function Start () 
{
	for (var i = 0; i < number_of_asteroids; i += 1)
	{
		var asteroid_instance = Instantiate(asteroid, Random.insideUnitSphere * 1500, Random.rotation);
		asteroid_instance.rigidbody.velocity = asteroid_instance.transform.forward * Random.Range(-15, 15);
		asteroid_instance.transform.localScale *= Random.Range(0.005, 5);
	}
}

function Update () {

}