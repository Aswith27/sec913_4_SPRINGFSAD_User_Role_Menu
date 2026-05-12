package mth.services;

import java.util.HashMap;
import mth.models.Task;
import mth.repository.TaskRepository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Users;
import mth.repository.UsersRepository;
import mth.models.Roles;
import mth.models.Menus;
import mth.models.Rolesmapping;
import mth.repository.RolesRepository;
import mth.repository.MenusRepository;
import mth.repository.RolesmappingRepository;
import mth.models.Task;
import mth.repository.TaskRepository;




@Service
public class UsersService {
	
	@Autowired
	UsersRepository UR;
	@Autowired
	RolesRepository RR;

	@Autowired
	MenusRepository MR;

	@Autowired
	RolesmappingRepository RMR;
	
	@Autowired
	JwtService JWT;
		
	public Object signup(Users U)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			Object id = UR.checkByEmail(U.getEmail());
			if(id != null)
			{				
				response.put("code", 501);
				response.put("message", "Email ID already registered");
			}
			else
			{
				U.setStatus(1);	//Make the status of the user as active
				
				UR.save(U);			//Insert into the database table (users)
				
				response.put("code", 200);
				response.put("message", "User account has been created.");
			}
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object signin(Map<String, Object> data)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			Object role = UR.validateCredentials(data.get("username").toString(), data.get("password").toString()); 	//Validate user name and password
			if(role != null)
			{
				response.put("code", 200);
				response.put("jwt", JWT.generateJWT(data.get("username"), role)); //Generate JWT token and return as response
			}
			else
			{
				response.put("code", 404);
				response.put("message", "Invalid Credentials!");
			}
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	public Object uinfo(String token)
	{
		Map<String, Object> response = new HashMap<>();
		try
		{
			Map<String, Object> payload = JWT.validateJWT(token);
	        String email = (String) payload.get("username");
	        Users U = (Users) UR.findByEmail(email);
	        
	        List<Object> menuList = UR.getMenus(Long.valueOf(U.getRole()));
			
	        response.put("code", 200);
	        response.put("fullname", U.getFullname());
	        response.put("menulist", menuList);
		}catch(Exception e)
		{
			response.put("code", 500);
			response.put("message", e.getMessage());
		}
		return response;
	}
	
	
	public Object addRole(Roles R)
	{
	    Map<String, Object> response = new HashMap<>();

	    try
	    {
	        RR.save(R);

	        response.put("code", 200);
	        response.put("message", "Role Added");
	    }
	    catch(Exception e)
	    {
	        response.put("code", 500);
	        response.put("message", e.getMessage());
	    }

	    return response;
	}

	public Object addMenu(Menus M)
	{
	    Map<String, Object> response = new HashMap<>();

	    try
	    {
	        MR.save(M);

	        response.put("code", 200);
	        response.put("message", "Menu Added");
	    }
	    catch(Exception e)
	    {
	        response.put("code", 500);
	        response.put("message", e.getMessage());
	    }

	    return response;
	}

	public Object mapRole(Rolesmapping RM)
	{
	    Map<String, Object> response = new HashMap<>();

	    try
	    {
	        RMR.save(RM);

	        response.put("code", 200);
	        response.put("message", "Role Mapping Added");
	    }
	    catch(Exception e)
	    {
	        response.put("code", 500);
	        response.put("message", e.getMessage());
	    }

	    return response;
	}
	
	public Object addTask(Task T)
	{
	    Map<String, Object> response = new HashMap<>();

	    try
	    {
	        TR.save(T);

	        response.put("code", 200);
	        response.put("message", "Task Added");
	    }
	    catch(Exception e)
	    {
	        response.put("code", 500);
	        response.put("message", e.getMessage());
	    }

	    return response;
	}
	
	public Object deleteTask(Long id)
	{
	    Map<String, Object> response = new HashMap<>();

	    try
	    {
	        TR.deleteById(id);

	        response.put("code", 200);
	        response.put("message", "Task Deleted");
	    }
	    catch(Exception e)
	    {
	        response.put("code", 500);
	        response.put("message", e.getMessage());
	    }

	    return response;
	}
	
	public Object listTask()
	{
	    return TR.findAll();
	}
	
	public Object getAllUsers()
	{
	    return UR.findAll();
	}
	
	public Object getTasks()
	{
	    return TR.findAll();
	}
	
	public Object listUsers()
	{
	    return UR.findAll();
	}
	
	@Autowired
	TaskRepository TR;
}
