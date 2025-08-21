using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Stock;
using api.Model;

namespace api.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<GetStockDTO>> GetUserPortfolio(AppUser user);
        Task<Portfolio> CreateAsync(Portfolio portfolioModel);
        Task<Portfolio?> DeleteAsync(string appUserID, string symbol);
    }
}