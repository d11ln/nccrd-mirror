using NCCRD.Database.Models.Contexts;
using System;

namespace DatabaseTest
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new SQLDBContext())
            {
                foreach(var item in context.VersionHistory)
                {
                    Console.WriteLine(string.Format("VersionNumber: {1}{0}Comments: {2}{0}UpdateTime: {3}", 
                                                        Environment.NewLine, 
                                                        item.VersionNumber,
                                                        item.Comments,
                                                        item.UpdateTime.ToString("yyyy-MM-dd HH:mm:ss")));
                    Console.WriteLine();
                }
            }

            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
    }
}
