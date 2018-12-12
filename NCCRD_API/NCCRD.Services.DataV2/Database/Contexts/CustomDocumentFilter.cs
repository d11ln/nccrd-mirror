using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml;

namespace NCCRD.Services.DataV2.Database.Contexts
{
    /// <summary>
    /// I found the starting point of this class and its implemetation on StackOverflow and GitHub:
    /// https://stackoverflow.com/a/51774147/4261155
    /// https://github.com/nycdanielp/swashbuckle-custom-odata/blob/master/CustomDocumentFilter.cs
    /// </summary>
    public class CustomDocumentFilter : IDocumentFilter
    {
        public void Apply(SwaggerDocument swaggerDoc, DocumentFilterContext context)
        {
            Assembly assembly = typeof(ODataController).Assembly;
            var thisAssemblyTypes = Assembly.GetExecutingAssembly().GetTypes().ToList();

            var allowedControllers = new string[] {
                "ProjectsController"
            };
            var odatacontrollers = thisAssemblyTypes.Where(t => t.BaseType == typeof(ODataController) && allowedControllers.Contains(t.Name))
                .ToList();

            var xmlComments = LoadCommentsXML();

            foreach (var odataContoller in odatacontrollers)  // this the OData controllers in the API
            {
                //Requires endpoint methods to be decorated with [HttpGet], [HttpPost], etc...
                var methods = odataContoller.GetMethods()
                    .Where(a => a.CustomAttributes.Any(x =>
                        x.AttributeType == typeof(HttpGetAttribute) ||
                        x.AttributeType == typeof(HttpPostAttribute) ||
                        x.AttributeType == typeof(HttpPutAttribute) ||
                        x.AttributeType == typeof(HttpPatchAttribute) ||
                        x.AttributeType == typeof(HttpDeleteAttribute)))
                    .ToList();

                if (!methods.Any())
                    continue; // next controller 

                foreach (var method in methods)  // this is all of the public methods in controller
                {
                    var methodComments = GetMethodComments(xmlComments, method);

                    StringBuilder sb = new StringBuilder();

                    if (method.Name.ToLower() != "get") sb.Append("/" + method.Name);

                    List<string> listParams = new List<string>();
                    var parameterInfo = method.GetParameters().Where(pi => !pi.CustomAttributes.Any(x => x.AttributeType == typeof(FromBodyAttribute)));
                    if (parameterInfo.Count() > 0) sb.Append("(");
                    foreach (ParameterInfo pi in parameterInfo)
                    {
                        listParams.Add("{" + pi.Name + "}");
                    }
                    sb.Append(string.Join(", ", listParams.ToArray()));

                    if (parameterInfo.Count() > 0) sb.Append(")");

                    var path = "/" + "odata" + "/" + odataContoller.Name.Replace("Controller", "") + sb.ToString();
                    var odataPathItem = new PathItem();
                    var op = new Operation();

                    var _params = new List<IParameter>();
                    parameterInfo = method.GetParameters();
                    foreach (var pi in parameterInfo)
                    {
                        var body = pi.CustomAttributes.Any(x => x.AttributeType == typeof(FromBodyAttribute));

                        if (body)
                        {
                            _params.Add(new BodyParameter()
                            {
                                Name = pi.Name,
                                In = "body",
                                Required = !pi.IsOptional,
                                Description = GetParamComment(methodComments, pi.Name),
                                Schema = context.SchemaRegistry.GetOrRegister(pi.ParameterType)
                            });
                        }
                        else
                        {
                            _params.Add(new NonBodyParameter()
                            {
                                Name = pi.Name,
                                In = "path",
                                Required = true, //path params must always be required according to OpenAPI spec
                                Description = GetParamComment(methodComments, pi.Name),
                                Type = context.SchemaRegistry.GetOrRegister(pi.ParameterType).Type
                            });
                        }
                    }
                    op.Parameters = _params;

                    // The odata methods will be listed under a heading with the Controller name in swagger doc
                    op.Tags = new List<string> { odataContoller.Name.Replace("Controller", "") };
                    op.OperationId = path;

                    op.Summary = GetComment(methodComments, "summary");
                    op.Description = "Returns: " + GetComment(methodComments, "returns");
                    op.Consumes = new List<string> { "application/json" };
                    op.Produces = new List<string> { "application/json" }; //Other options: "application/atom+xml", "application/json", "text/json", "application/xml", "text/xml"
                    op.Deprecated = false;

                    var response = new Response() { Description = "OK" };
                    response.Schema = context.SchemaRegistry.GetOrRegister(method.ReturnType);
                    op.Responses = new Dictionary<string, Response> { { "200", response } };

                    var security = GetSecurityForOperation(odataContoller);
                    if (security != null)
                    {
                        op.Security = new List<IDictionary<string, IEnumerable<string>>> { security };
                    }

                    //Requires endpoint methods to be decorated with [HttpGet], [HttpPost], etc...
                    if (method.CustomAttributes.Any(x => x.AttributeType == typeof(HttpPostAttribute)))
                    {
                        odataPathItem.Post = op;
                    }
                    else if (method.CustomAttributes.Any(x => x.AttributeType == typeof(HttpPutAttribute)))
                    {
                        odataPathItem.Put = op;
                    }
                    else if (method.CustomAttributes.Any(x => x.AttributeType == typeof(HttpPatchAttribute)))
                    {
                        odataPathItem.Patch = op;
                    }
                    else if (method.CustomAttributes.Any(x => x.AttributeType == typeof(HttpDeleteAttribute)))
                    {
                        odataPathItem.Delete = op;
                    }
                    else
                    {
                        odataPathItem.Get = op;
                    }

                    //Add to SwaggerDoc
                    try
                    {
                        swaggerDoc.Paths.Add(path, odataPathItem);
                    }
                    catch { }
                }
            }
        }

        private XmlDocument LoadCommentsXML()
        {
            var _docuDoc = new XmlDocument();
            var dllPath = Assembly.GetExecutingAssembly().Location;
            string docuPath = dllPath.Substring(0, dllPath.LastIndexOf(".")) + ".XML";

            if (File.Exists(docuPath))
            {
                _docuDoc.Load(docuPath);
            }

            return _docuDoc;
        }

        private XmlNode GetMethodComments(XmlDocument _docuDoc, MethodInfo mi)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(mi.Name);

            List<string> listParams = new List<string>();
            var parameterInfo = mi.GetParameters();

            //Add parameter to method name (if any)
            if (parameterInfo.Length > 0) sb.Append("(");
            foreach (ParameterInfo pi in parameterInfo)
            {
                listParams.Add(pi.ParameterType.ToString());
            }
            sb.Append(string.Join(", ", listParams.ToArray()));
            if (parameterInfo.Length > 0) sb.Append(")");

            //Construct search path/name
            string search = "M:" + mi.DeclaringType.FullName + "." + sb.ToString();

            XmlNode xmlDocuOfMethod = _docuDoc.SelectSingleNode(
                "//member[@name='" + search + "']");

            return xmlDocuOfMethod;
        }

        private string GetComment(XmlNode methodComments, string commentName)
        {
            var comment = "";

            if (methodComments != null)
            {
                foreach (XmlNode childNode in methodComments.ChildNodes)
                {
                    if (childNode.Name == commentName.ToLower())
                    {
                        comment = childNode.InnerText.Replace(Environment.NewLine, "").Trim();
                    }
                }
            }

            return comment;
        }

        private string GetParamComment(XmlNode methodComments, string paramName)
        {
            var comment = "";

            if (methodComments != null)
            {
                //Construct search path/name
                XmlNode xmlDocuOfMethod = methodComments.SelectSingleNode(
                    "//param[@name='" + paramName + "']");

                comment = xmlDocuOfMethod.InnerText.Replace(Environment.NewLine, "").Trim();
            }

            return comment;
        }

        private Dictionary<string, IEnumerable<string>> GetSecurityForOperation(MemberInfo odataContoller)
        {
            Dictionary<string, IEnumerable<string>> securityEntries = null;
            if (odataContoller.GetCustomAttribute(typeof(Microsoft.AspNetCore.Authorization.AuthorizeAttribute)) != null)
            {
                securityEntries = new Dictionary<string, IEnumerable<string>> { { "oauth2", new[] { "actioncenter" } } };
            }
            return securityEntries;
        }
    }
}
