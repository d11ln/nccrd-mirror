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
        public string EntityName { get; set; }

        [Required]
        [MaxLength(450)]
        public string ChangeType { get; set; }

        //[Required]
        public string PrimaryKeyValue { get; set; }

        [Required]
        [MaxLength(450)]
        public string PropertyName { get; set; }

        public string OldValue { get; set; }

        public string NewValue { get; set; }

        [Required]
        public DateTime DateChanged { get; set; }

        //FK - User
        [ForeignKey("ActiveUser")]
        public int? ActiveUserId { get; set; }
        [IgnoreDataMember]
        public User ActiveUser { get; set; }

    }
}
