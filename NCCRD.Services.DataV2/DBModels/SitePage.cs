﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NCCRD.Services.DataV2.DBModels
{
    [Table("SitePages")]
    public class SitePage
    {
        public int SitePageId { get; set; }

        [Required]
        [MaxLength(450)]
        public string PageTitle { get; set; }

        [Required]
        [MaxLength(1000)]
        public string URL { get; set; }
    }
}
