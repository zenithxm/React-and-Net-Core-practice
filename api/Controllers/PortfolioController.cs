using System;
using System.Collections.Generic;
using System.IO.Pipelines;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing.Abstractions;

namespace api.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepo;
        private readonly IPortfolioRepository _portfolioRepo;
        private readonly IFMPService _fmpService;
        public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepo, IPortfolioRepository portfolioRepo, IFMPService fmpService)
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolioRepo;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            var appUser = await User.GetUserLoginAsync(_userManager);
            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            return Ok(userPortfolio);
        }

        [HttpPost("{symbol}")]
        [Authorize]
        public async Task<IActionResult> AddPortfolio([FromRoute] string symbol)
        {
            var appUser = await User.GetUserLoginAsync(_userManager);
            var stock = await _fmpService.FindStockBySymbolAsync(symbol, _stockRepo);
            if (stock == null)
            {
                ModelState.AddModelError(nameof(symbol), "This stock does not exists.");
                return ValidationProblem(ModelState);//BadRequest(ModelState);
            }

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            if (userPortfolio.Any(x => x.Symbol.ToUpper() == symbol.ToUpper()))
                ModelState.AddModelError(nameof(symbol), "This stock already exists in portfolio.");            
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var portfolioModel = new Portfolio
            {
                AppUserID = appUser.Id,
                StockID = stock.ID
            };
            
            await _portfolioRepo.CreateAsync(portfolioModel);
            return Created();
        }

        [HttpDelete]
        [Route("{symbol}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] string symbol)
        {
            var appUser = await User.GetUserLoginAsync(_userManager);
            var portfolioModel = await _portfolioRepo.DeleteAsync(appUser.Id, symbol);
            if (portfolioModel == null) return NotFound();

            return NoContent();
            //this return 204 No Content, it just say success without giving any redundant info that client already know
        }
    }
}