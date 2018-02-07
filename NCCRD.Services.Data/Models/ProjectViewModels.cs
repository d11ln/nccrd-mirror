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
        public List<Region> Regions { get; set; }
        public List<LocationType> LocationTypes { get; set; }
        public List<ProjectRegion> ProjectRegions { get; set; }

        public ProjectsViewModel()
        {
            Projects = new List<Project>();
            Regions = new List<Region>();
            LocationTypes = new List<LocationType>();
            ProjectRegions = new List<ProjectRegion>();
        }

        public class Geometry
        {
            public string type { get; set; }
            public List<double> coordinates { get; set; }

            public Geometry()
            {
                coordinates = new List<double>();
            }
        }

        public class ProjectGeoJson
        {
            public string type { get; set; }
            public Geometry geometry { get; set; } = new Geometry();
            public Dictionary<string, string> properties { get; set; } = new Dictionary<string, string>();
        }
    }
}