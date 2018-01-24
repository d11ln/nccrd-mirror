using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace DatabaseTest
{
    class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine("Select option:");
            Console.WriteLine(" (1) Deploy Database");
            Console.WriteLine(" (2) Hash User Passwords");

            string option = Console.ReadKey().KeyChar.ToString();

            switch(option)
            {
                case "1":
                    DeployDatabase();
                    break;

                case "2":
                    HashUserPasswords();
                    break;
            }

            Console.WriteLine();
            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }

        private static void DeployDatabase()
        {
            Console.WriteLine();
            Console.WriteLine("Deploying database models...");

            using (var context = new SQLDBContext())
            {
                foreach (var item in context.VersionHistory)
                {
                    Console.WriteLine();
                    Console.WriteLine(string.Format("VersionNumber: {1}{0}Comments: {2}{0}UpdateTime: {3}",
                                                        Environment.NewLine,
                                                        item.VersionNumber,
                                                        item.Comments,
                                                        item.UpdateTime.ToString("yyyy-MM-dd HH:mm:ss")));
                }
            }
        }

        private static void HashUserPasswords()
        {
            Console.WriteLine();

            using (var context = new SQLDBContext())
            {
                if(context.AppLog.FirstOrDefault(x => x.Message == "User Passwords Hashed") != null)
                {
                    Console.WriteLine("User Passwords Already Hashed!");
                    return;
                }

                HashAlgorithm hasher = MD5.Create();
                var i = 1;
                var c = context.Users.Count();

                foreach (var user in context.Users)
                {
                    Console.CursorLeft = 0;
                    Console.Write($"Hashing passwords: {i}/{c}");

                    //HASH User Password
                    user.Password = GetHashString(user.Password);

                    i++;
                    System.Threading.Thread.Sleep(10);
                }

                var activeUser = context.Users.FirstOrDefault(x => x.Username == "developer");
                if(activeUser == null)
                {
                    activeUser = new User()
                    {
                        Username = "developer",
                        Password = GetHashString("developer"),
                        FirstName = "developer",
                        Surname = "developer",
                        Organisation = "SAEON",
                        PhysicalAddressCountry = "South Africa",
                        Title = context.Title.FirstOrDefault(x => x.Value == "Mr"),
                        UserRole = context.UserRoles.FirstOrDefault(x => x.RoleName == "Administrator")
                    };

                    context.Users.Add(activeUser);
                }

                context.AppLog.Add(new AppLog()
                {
                    ActiveUserId = activeUser.UserId,
                    LogTime = DateTime.Now,
                    Message = "User Passwords Hashed"
                });

                context.SaveChanges();
            }
        }

        private static byte[] GetHash(string inputString)
        {
            HashAlgorithm algorithm = MD5.Create();  //or use SHA256.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        private static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
    }
}
