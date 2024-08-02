using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.DTO
{
    public class LoginDTO
    {
        // adding username for our userservices to work
        public string? UserName { get; set; }
        public string? Password { get; set; }
    }
}