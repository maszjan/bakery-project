using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class User : IdentityUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Name { get; set; } 
        public string SurName { get; set; } 
        public string Address { get; set; }
        public string Postcode { get; set; }
        public string City { get; set; }
        public string Country {  get; set; }
        public string Role { get; set; }


        public DateOnly AccountCreatedAt { get; set; }

        public bool IsCompanyClient { get; set; }

        public User()
        {
            Role = "client";
        }
    }
}
