using NCCRD.Services.Data.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;

namespace NCCRD.Services.Data.Classes
{
    public class APIClient
    {
        private HttpClient _client;

        public APIClient()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri("http://localhost:58683/");
        }

        public async Task<HttpResponseMessage> Get(string route, string access_token = "")
        {
            if(!string.IsNullOrEmpty(access_token))
            {
                _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", access_token);
            }

            var response = await _client.GetAsync(route);
            return response;
        }

        public async Task<HttpResponseMessage> Post(string route, object data, string access_token = "")
        {
            var response = await _client.PostAsJsonAsync(route, data);
            return response;
        }

        public async Task<HttpResponseMessage> Register(RegisterBindingModel model)
        {
            var response = await _client.PostAsJsonAsync("api/Account/Register", model);
            return response;
        }

        public async Task<LoginResponseViewModel> Login(LoginBindingModel model)
        {
            LoginResponseViewModel result = new LoginResponseViewModel();

            List<KeyValuePair<string, string>> values = new List<KeyValuePair<string, string>>();
            values.Add(new KeyValuePair<string, string>("grant_type", "password"));
            values.Add(new KeyValuePair<string, string>("username", model.Email));
            values.Add(new KeyValuePair<string, string>("password", model.Password));

            using (var content = new FormUrlEncodedContent(values))
            {
                var response = await _client.PostAsync("/Token", content);

                //get access token from response body
                var responseJson = await response.Content.ReadAsStringAsync();
                var jObject = JObject.Parse(responseJson);

                result = new LoginResponseViewModel()
                {
                    access_token = jObject.GetValue("access_token").ToString(),
                    token_type = jObject.GetValue("token_type").ToString(),
                    expires_in = long.Parse(jObject.GetValue("expires_in").ToString()),
                    userName = jObject.GetValue("userName").ToString(),
                    issued = DateTime.ParseExact(jObject.GetValue(".issued").ToString(), "ddd, dd MMM yyyy HH:mm:ss 'GMT'", CultureInfo.InvariantCulture),
                    expires = DateTime.ParseExact(jObject.GetValue(".expires").ToString(), "ddd, dd MMM yyyy HH:mm:ss 'GMT'", CultureInfo.InvariantCulture)
                };
            }

            return result;
        }

    }
}