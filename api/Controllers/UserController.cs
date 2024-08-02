using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _data;
        public UserController(UserService dataFromService)
        {
            _data = dataFromService;
        }
        
        //Add a user
        [HttpPost("AddUsers")
        ]
        public bool AddUser (CreateAccountDTO UserToAdd)
        {
            return _data.AddUser(UserToAdd);
        }  

        //Get all users
        [HttpGet("GetAllUsers")]
        public IEnumerable<UserModel> GetAllUsers ()
        {
            return _data.GetAllUsers();
        }

        // Get user by username using DTO
        [HttpGet("GetUserByUserName/{username}")]
        public UserIdDTO GetUserIdDTOByUserName(string username)
        {
            return _data.GetUserIdDTOByUserName(username);
        }

        // Login
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginDTO User)
        {
            return _data.Login(User);
        }

        
        //Update user Account
        [HttpPost("UpdateUser")]
        public bool UpdateUser(int id, string username)
        {
            return _data.UpdateUser(id,username);
        }

        
        //Delete user Account
        [HttpPost("DeleteUser/{userToDelete}")]
        public bool DeleteUser(string userToDelete)
        {
            return _data.DeleteUser(userToDelete);
        }


    }
}