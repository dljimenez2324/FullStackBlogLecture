using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.DTO;
using api.Services.Context;

namespace api.Services
{
    public class UserService
    {
        private readonly DataContext _context;
        public UserService(DataContext context)
        {
            _context = context;
        }

        // These are our helper functions to  check if our user exists so this will hold some logic
        
        // Does User Exist
        public bool DoesUserExist(string username)
        {
            // check our tables to see if the user name is contained within it
            // check if one item matches our condition .. that item will be returned
            // if no items matches it will return null
            // if multiple items match it will return an error
        }

        // Adding user function
        public bool AddUser(CreateAccountDTO userToAdd)
        {
            
        }
    }
}