using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Account
{
    public class NewAccountDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        
    }
}