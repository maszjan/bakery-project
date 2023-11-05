namespace backend.Models
{
    public class User
    {

        public int Id { get; set; }
        public string Name { get; set; }    
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string Postcode { get; set; }
        public string City { get; set; }
        public string Country {  get; set; }
        public string Type { get; set; }

        public string accessToken { get; set; } 

        public DateTime AccountCreatedAt { get; set; }

        public bool IsCompanyClient { get; set; }
    }
}
