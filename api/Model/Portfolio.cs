using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    [Table("Portfolios")]
    public class Portfolio
    {
        public string AppUserID { get; set; } = string.Empty;
        public int StockID { get; set; }
        public AppUser AppUsers { get; set; }
        public Stock Stocks { get; set; }
    }
}