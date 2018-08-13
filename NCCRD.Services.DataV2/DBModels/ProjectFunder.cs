using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.DBModels
{
    [Table("ProjectFunder")]
    public class ProjectFunder
    {
        public int ProjectFunderId { get; set; }

        //FK - Funder
        [Required]
        public int FunderId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Funder Funder { get; set; }

        //FK - Project
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [IgnoreDataMember]
        public Project Project { get; set; }

        //FK - FundingStatus
        public int? FundingStatusId { get; set; }
        [IgnoreDataMember]
        public FundingStatus FundingStatus { get; set; }
    }
}
