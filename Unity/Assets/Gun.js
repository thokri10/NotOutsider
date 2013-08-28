#pragma strict
var hit:RaycastHit;
var target:Vector3 = Vector3.zero;

var obj_Projectile:GameObject;
var canFire:boolean = true;
var firerate:float = 15; //Pews per second

function Start () 
{

}

function Update () 
{
	if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), hit, 1000) && hit.collider.gameObject.tag != "Projectile") 
	{
		target = hit.point;
	}
	else
	{
		target = Camera.main.ViewportToWorldPoint(Vector3(Input.mousePosition.x/Screen.width, Input.mousePosition.y/Screen.height, 1000));
	}
	
	transform.LookAt(target);
	
	if (!transform.parent.gameObject.GetComponent(Movement).freeMode)
	{
		Fire();
	}
}

function Fire()
{
	if (Input.GetMouseButton(0) && canFire)
	{
		canFire = false;
		
		var instance = Instantiate(obj_Projectile, transform.position + transform.forward, transform.rotation);
		instance.rigidbody.AddForce(instance.transform.forward * 300, ForceMode.Impulse);
		Destroy(instance, 1.5);
		
		yield WaitForSeconds(1/firerate);
		canFire = true;
	}
}