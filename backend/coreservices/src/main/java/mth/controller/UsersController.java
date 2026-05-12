package mth.controller;

import java.util.Map;
import mth.models.Task;
import mth.models.Roles;
import mth.models.Menus;
import mth.models.Rolesmapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mth.models.Users;
import mth.services.UsersService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/authservice")
public class UsersController {

	@Autowired
	UsersService US;
	
	@CrossOrigin(origins = "*")
	
	@PostMapping("/signup")
	public Object signup(@RequestBody Users U)
	{
		return US.signup(U);
	}
	
	@PostMapping("/signin")
	public Object signin(@RequestBody Map<String, Object> data)
	{
		return US.signin(data);
	}
	
	@GetMapping("/uinfo")
	public Object uinfo(@RequestHeader("Token") String token)
	{
		return US.uinfo(token);
	}
	
	@GetMapping("/listtask")
	public Object listtask()
	{
	    return US.listTask();
	}
	
	@PostMapping("/deletetask")
	public Object deletetask(@RequestBody Map<String, Object> data)
	{
	    return US.deleteTask(Long.parseLong(data.get("id").toString()));
	}
	
	
	@GetMapping("/test")
	public String testMethod()
	{
		return "Welcome I'm fine";
	}
	
	@PostMapping("/addrole")
	public Object addrole(@RequestBody Roles R)
	{
	    return US.addRole(R);
	}
	
	@GetMapping("/allusers")
	public Object allusers()
	{
	    return US.getAllUsers();
	}

	@PostMapping("/addmenu")
	public Object addmenu(@RequestBody Menus M)
	{
	    return US.addMenu(M);
	}

	@PostMapping("/maprole")
	public Object maprole(@RequestBody Rolesmapping RM)
	{
	    return US.mapRole(RM);
	}
	
	@PostMapping("/addtask")
	public Object addtask(@RequestBody Task T)
	{
	    return US.addTask(T);
	}

	@GetMapping("/tasks")
	public Object tasks()
	{
	    return US.getTasks();
	}
	
	@GetMapping("/listusers")
	public Object listusers()
	{
	    return US.listUsers();
	}
}
