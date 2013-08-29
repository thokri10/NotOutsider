#pragma strict
var freeMode:boolean = false;
var canEnter:boolean = false;
var distance:float;
var targetPosition:Vector3 = Vector3.zero;
private var mousePositionX:float;
private var mousePositionY:float;
var speed:float = 0;
var max_speed:float = 100;
var min_speed:float = -30;

function Update () 
{
	if (Input.GetKeyDown(KeyCode.Escape))
	{
		ToggleFreemode();
	}

	CheckDistance();
	CalculateMouse();
	
	if (!freeMode)
	{
		Pitch();
		Yaw();
	}
	
	Roll();
	
	Accelerate();
	
	CheckCamera();
}

function CheckDistance()
{
	if (GameObject.FindWithTag("Centerpoint"))
	{
		distance = Vector3.Distance(GameObject.FindWithTag("Centerpoint").transform.position, transform.position);
	}
	else
	{
		distance = 0;
	}
}

function Accelerate()
{
		speed += Input.GetAxis("Vertical");
		
		if (Input.GetAxis("Vertical") < 0) //DECELERATE
		{
			if (speed < min_speed)
			{
				speed = min_speed;
			}
		}
		else if(Input.GetAxis("Sprint") > 0 && Input.GetAxis("Vertical") > 0) //SPRINT ACCELERATE
		{
			speed += Input.GetAxis("Vertical") * 2;
			
			if (speed > max_speed * 2)
			{
				speed = max_speed * 2;
			}
		}
		else if (Input.GetAxis("Vertical") > 0) //ACCELERATE
		{
			if (speed > max_speed)
			{
				speed = max_speed;
			}
		}
		else
		{
			speed *= 0.995;
			
			if (speed < 1 && speed > -1)
			{
				speed = 0;
			}
		}
	
	rigidbody.velocity = ((transform.forward * speed) + (transform.right * 10 * Input.GetAxis("Horizontal"))); //* (1 - distance/1500);
}

function CalculateMouse()
{
	mousePositionX = Mathf.Clamp(Input.mousePosition.x, 0, Screen.width);
	mousePositionY = Mathf.Clamp(Input.mousePosition.y, 0, Screen.height);
}

function Pitch()
{
	if (mousePositionY > Screen.height/2) //LOOK UP
	{
		transform.RotateAroundLocal(transform.right, 2 * Time.deltaTime * -(mousePositionY - Screen.height/2)/Screen.height);
	}
	else if (mousePositionY < Screen.height/2) //LOOK DOWN
	{
		transform.RotateAroundLocal(transform.right, 2 * Time.deltaTime * (Screen.height/2 - mousePositionY)/Screen.height);
	}
}

function Yaw()
{
	if (mousePositionX > Screen.width/2) //LOOK RIGHT
	{
		transform.RotateAroundLocal(transform.up, 2 * Time.deltaTime * (mousePositionX - Screen.width/2)/Screen.width);
	}
	else if (mousePositionX < Screen.width/2) //LOOK LEFT
	{
		transform.RotateAroundLocal(transform.up, 2 * Time.deltaTime * -(Screen.width/2 - mousePositionX)/Screen.width);
	}
}

function CheckCamera()
{
	Camera.main.transform.rotation = transform.rotation;
	Camera.main.transform.RotateAroundLocal(Camera.main.transform.right, -0.1 * (mousePositionY - Screen.height/2)/Screen.height);
	Camera.main.transform.RotateAroundLocal(Camera.main.transform.up, 0.25 * (mousePositionX - Screen.width/2)/Screen.width);
	
	targetPosition = transform.position + (transform.forward * -7);
	
	if (Input.GetAxis("BarrelRoll") != 0)
	{
		Camera.main.transform.position = targetPosition;
	}
	else
	{
		Camera.main.transform.position = targetPosition + transform.up * 1;
	}
}

function Roll()
{
	transform.RotateAroundLocal(transform.forward, Time.deltaTime * -Input.GetAxis("BarrelRoll") * 2);
}

function OnGUI()
{
	GUI.Label(Rect(10, 10, Screen.width, 20), "Speed: " + speed);
	GUI.Label(Rect(10, 30, Screen.width, 40), "" + rigidbody.velocity);
	GUI.Label(Rect(10, 50, Screen.width, 60), "(" + mousePositionX + ", " + mousePositionY + ")");
	
	if (canEnter)
	{
		GUI.Label(Rect(Screen.width/2, Screen.height/2, Screen.width, Screen.height/2 + 10), "SHOP");
	}
}

function OnCollisionEnter(collision : Collision) 
{
	if (collision.relativeVelocity.magnitude > 50)
	{
		//Take Damage
	}
}

function OnTriggerStay(trigger:Collider)
{
	if (trigger.gameObject.tag == "Structure")
	{
		Debug.Log("Next to structure");
		canEnter = true;
	}
}

function OnTriggerExit(trigger:Collider)
{
	if (trigger.gameObject.tag == "Structure")
	{
		canEnter = false;
	}
}

function ToggleFreemode()
{
	if (freeMode)
	{
		freeMode = false;
	}
	else
	{
		freeMode = true;
	}
}