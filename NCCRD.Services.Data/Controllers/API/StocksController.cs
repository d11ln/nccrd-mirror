using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers.API
{
    /// <summary>
    /// Manage Stocks data
    /// </summary>
    public class StocksController : ApiController
    {
        /// <summary>
        /// Get all Stock data
        /// </summary>
        /// <returns>Stock data as JSON</returns>
        [HttpGet]
        [Route("api/Stocks/GetAll")]
        public IEnumerable<Stock> GetAll()
        {
            List<Stock> data = new List<Stock>();

            using (var context = new SQLDBContext())
            {
                data = context.Stocks.ToList();
            }

            return data;
        }

        /// <summary>
        /// Get Stock by Id
        /// </summary>
        /// <param name="id">The Id of the Stock to get</param>
        /// <returns>Stock data as JSON</returns>
        [HttpGet]
        [Route("api/Stocks/GetByID/{id}")]
        public Stock GetByID(int id)
        {
            Stock data = null;

            using (var context = new SQLDBContext())
            {
                data = context.Stocks.FirstOrDefault(x => x.StockId == id);
            }

            return data;
        }

        /*/// <summary>
        /// Add Stock
        /// </summary>
        /// <param name="stock">The Stock to add</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Stocks/Add")]
        public bool Add([FromBody]Stock stock)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                if (context.Stocks.Count(x => x.StockId == stock.StockId) == 0)
                {
                    //Add Region entry
                    context.Stocks.Add(stock);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Update Stock
        /// </summary>
        /// <param name="stock">Stock to update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Stocks/Update")]
        public bool Update([FromBody]Stock stock)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Stocks.FirstOrDefault(x => x.StockId == stock.StockId);
                if (data != null)
                {
                    //add properties to update here
                    //..
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete Stock
        /// </summary>
        /// <param name="stock">Stock to delete</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/Stocks/Delete")]
        public bool Delete([FromBody]Stock stock)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Stocks.FirstOrDefault(x => x.StockId == stock.StockId);
                if (data != null)
                {
                    context.Stocks.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/

        /*/// <summary>
        /// Delete Stock by Id
        /// </summary>
        /// <param name="id">Id of Stock to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/Stocks/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.Stocks.FirstOrDefault(x => x.StockId == id);
                if (data != null)
                {
                    context.Stocks.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }*/
    }
}