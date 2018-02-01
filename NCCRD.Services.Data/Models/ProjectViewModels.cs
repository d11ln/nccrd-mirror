using NCCRD.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCCRD.Services.Data.Models
{
    public class ProjectsViewModel
    {
        public List<Project> Projects { get; set; }

        public ProjectsViewModel()
        {
            Projects = new List<Project>();
        }
    }
}