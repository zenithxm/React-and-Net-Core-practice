using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Stock;
using api.Helpers;
using api.Interfaces;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;
        public StockRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            Stock? stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.ID == id);
            if (stockModel == null) return null;

            _context.Stocks.Remove(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            var stocks = _context.Stocks.Include(c => c.Comments).ThenInclude(x => x.AppUser).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Symbol))
                stocks = stocks.Where(x => x.Symbol.Contains(query.Symbol));
            if (!string.IsNullOrWhiteSpace(query.CompanyName))
                stocks = stocks.Where(x => x.CompanyName.Contains(query.CompanyName));

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                    stocks = query.IsDescending ? stocks.OrderByDescending(x => x.Symbol) : stocks.OrderBy(x => x.Symbol);
                if (query.SortBy.Equals("CompanyName", StringComparison.OrdinalIgnoreCase))
                    stocks = query.IsDescending ? stocks.OrderByDescending(x => x.CompanyName) : stocks.OrderBy(x => x.CompanyName);
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            stocks = stocks.Skip(skipNumber).Take(query.PageSize);

            return await stocks.ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _context.Stocks.Include(c => c.Comments)
                .ThenInclude(x => x.AppUser)
                .FirstOrDefaultAsync(x => x.ID == id);
        }

        public async Task<Stock?> GetBySymbolAsync(string symbol)
        {
            return await _context.Stocks.Include(c => c.Comments)
                .ThenInclude(x => x.AppUser)
                .FirstOrDefaultAsync(x => x.Symbol.ToUpper() == symbol.ToUpper());
        }

        public async Task<bool> StockExistAsync(int id)
        {
            return await _context.Stocks.AnyAsync(x => x.ID == id);
        }

        public async Task<bool> StockExistAsync(string symbol)
        {
            return await _context.Stocks.AnyAsync(x => x.Symbol.ToUpper() == symbol.ToUpper());
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockDTO stockDTO)
        {
            Stock? stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.ID == id);
            if (stockModel == null) return null;

            stockModel.Symbol = stockDTO.Symbol;
            stockModel.CompanyName = stockDTO.CompanyName;
            stockModel.Purchase = stockDTO.Purchase;
            stockModel.LastDividen = stockDTO.LastDividen;
            stockModel.Industry = stockDTO.Industry;
            stockModel.MarketCap = stockDTO.MarketCap;

            await _context.SaveChangesAsync();
            return stockModel;
        }
    }
}