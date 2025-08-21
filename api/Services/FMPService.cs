using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Stock;
using api.Interfaces;
using api.Mappers;
using api.Model;
using Newtonsoft.Json;

namespace api.Services
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Stock?> FindStockBySymbolAsync(string symbol, IStockRepository _stockRepo)
        {
            try
            {
                var stockModel = await _stockRepo.GetBySymbolAsync(symbol);
                if (stockModel == null)
                {
                    var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={_config["FMPKey"]}");
                    if (result.IsSuccessStatusCode)
                    {
                        var content = await result.Content.ReadAsStringAsync();
                        var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                        if (tasks == null) return null;

                        var stockFMP = tasks[0];
                        if (stockFMP != null)
                        {
                            stockModel = await _stockRepo.CreateAsync(stockFMP.ToStockFromFMPStock());
                            return stockModel;
                        }
                    }
                }

                return stockModel;
            }
            catch (Exception ex)
            {
                return null;
                Console.WriteLine(ex);
            }
        }
    }
}