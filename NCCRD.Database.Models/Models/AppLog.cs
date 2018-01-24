using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("AppLog")]
    public class AppLog
    {
        public int AppLogId { get; set; }
        [Required]
        public string Message { get; set; }
        public string MessageDetail { get; set; } //Optional
        [Required]
        public DateTime LogTime { get; set; }

        //FK - User
        [ForeignKey("ActiveUser")]
        public int ActiveUserId { get; set; }
        [Required]
        public User ActiveUser { get; set; }
    }
}
