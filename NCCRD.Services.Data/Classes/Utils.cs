using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;

namespace NCCRD.Services.Data.Classes
{
    public static class Utils
    {
        public static string ParseDbEntityValidationException(DbEntityValidationException e)
        {
            string errorMsg = "";

            foreach (var eve in e.EntityValidationErrors)
            {
                errorMsg += $"'{eve.Entry.Entity.GetType().Name}' (state: '{eve.Entry.State}') contains the following validation errors:{Environment.NewLine}";

                foreach (var ve in eve.ValidationErrors)
                {
                    errorMsg += $" - '{ve.PropertyName}' : {ve.ErrorMessage}{Environment.NewLine}";
                }

                errorMsg += Environment.NewLine;
            }

            return errorMsg;
        }
    }
}