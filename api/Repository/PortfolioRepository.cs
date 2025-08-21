using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Stock;
using api.Interfaces;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Portfolio> CreateAsync(Portfolio portfolioModel)
        {
            await _context.Portfolios.AddAsync(portfolioModel);
            await _context.SaveChangesAsync();
            return portfolioModel;
        }

        public async Task<Portfolio?> DeleteAsync(string appUserID, string symbol)
        {
            Stock? stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Symbol == symbol);
            if (stockModel == null) return null;

            Portfolio? portfolioModel = await _context.Portfolios.FirstOrDefaultAsync(x => x.StockID == stockModel.ID && x.AppUserID == appUserID);
            if (portfolioModel == null) return null;

            _context.Portfolios.Remove(portfolioModel);
            await _context.SaveChangesAsync();
            return portfolioModel;

        }

        public async Task<List<GetStockDTO>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolios.Where(x => x.AppUserID == user.Id)
                .Select(s => new GetStockDTO
                {
                    ID = s.StockID,
                    Symbol = s.Stocks.Symbol,
                    CompanyName = s.Stocks.CompanyName,
                    Purchase = s.Stocks.Purchase,
                    LastDividen = s.Stocks.LastDividen,
                    Industry = s.Stocks.Industry,
                    MarketCap = s.Stocks.MarketCap
                }).ToListAsync();
        }
    }
}