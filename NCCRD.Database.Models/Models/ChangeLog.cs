using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("ChangeLog")]
    public class ChangeLog
    {
        public int ChangeLogId { get; set; }

        [Required]
        [MaxLength(450)]
        public string TableName { get; set; }

        [Required]
        [MaxLength(450)]
        public string ColumnName { get; set; }

        [Required]
        public string OldValue { get; set; }

        [Required]
        public string NewValue { get; set; }

        [Required]
        public DateTime UpdateTime { get; set; }

        //FK - User
        [Required]
        [ForeignKey("UpdateUser")]
        public int UpdateUserId { get; set; }
        [Required]
        [IgnoreDataMember]
        public User UpdateUser { get; set; }

    }
}
