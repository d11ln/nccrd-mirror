using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Database.Models
{
    [Table("SitePages")]
    public class SitePage
    {
        public int SitePageId { get; set; }
        [Required]
        public string PageTitle { get; set; }
        [Required]
        public string URL { get; set; }
    }
}
