#pragma strict
var asteroid:GameObject;
var number_of_asteroids:int = 5;
var spawn_radius:float = 1500;

function Start () 
{
	for (var i = 0; i < number_of_asteroids; i += 1)
	{
		var asteroid_instance = Instantiate(asteroid, Random.insideUnitSphere * spawn_radius, Random.rotation);
		asteroid_instance.rigidbody.velocity = asteroid_instance.transform.forward * Random.Range(-15, 15);
		asteroid_instance.transform.localScale *= Random.Range(0.005, 5);
		asteroid_instance.rigidbody.mass = (1000/30) * asteroid_instance.transform.localScale.x;
		asteroid_instance.rigidbody.AddTorque(asteroid_instance.transform.forward * 5000 * asteroid_instance.rigidbody.mass);
	}
}

function Update () {

}