using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; } 
        public string SurName { get; set; } 
        public string Address { get; set; }
        public string Postcode { get; set; }
        public string City { get; set; }
        public string Country {  get; set; }
   
        public DateOnly AccountCreatedAt { get; set; }

        public bool IsCompanyClient { get; set; }
    }
}
