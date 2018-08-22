using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.Database.Models
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
        [Required]
        [ForeignKey("ActiveUser")]
        public int ActiveUserId { get; set; }
        [Required]
        [IgnoreDataMember]
        public User ActiveUser { get; set; }
    }
}
