using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Stock;
using api.Model;

namespace api.Mappers
{
    public static class StockMappers
    {
        public static GetStockDTO ToStockDTO(this Stock stockModel)
        {
            return new GetStockDTO
            {
                ID = stockModel.ID,
                Symbol = stockModel.Symbol,
                CompanyName = stockModel.CompanyName,
                Purchase = stockModel.Purchase,
                LastDividen = stockModel.LastDividen,
                Industry = stockModel.Industry,
                MarketCap = stockModel.MarketCap,
                Comments = stockModel.Comments.Select(x => x.ToCommentDTO()).ToList()
            };
        }

        public static Stock ToStockFromCreateStockDTO(this CreateStockDTO stockDTO)
        {
            return new Stock
            {
                Symbol = stockDTO.Symbol,
                CompanyName = stockDTO.CompanyName,
                Purchase = stockDTO.Purchase,
                LastDividen = stockDTO.LastDividen,
                Industry = stockDTO.Industry,
                MarketCap = stockDTO.MarketCap
            };
        }
        
        
        public static Stock ToStockFromFMPStock(this FMPStock stockFMP)
        {
            return new Stock
            {
                Symbol = stockFMP.symbol,
                CompanyName = stockFMP.companyName,
                Purchase = (decimal)stockFMP.price,
                LastDividen = (decimal)stockFMP.lastDividend,
                Industry = stockFMP.industry,
                MarketCap = stockFMP.marketCap
            };
        }
    }
}