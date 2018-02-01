using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NCCRD.Services.Data.Classes
{
    public static class SessionExtensions
    {
        public static string GetAccessToken(this HttpSessionStateBase session)
        {
            string access_token = "";

            if(session["AccessToken"] != null)
            {
                try
                {
                    access_token = session["AccessToken"].ToString();
                }
                catch { }
            }

            return access_token;
        }
    }
}