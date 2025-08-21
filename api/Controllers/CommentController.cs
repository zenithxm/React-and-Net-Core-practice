using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Comment;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Model;
using api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fmpService;
        public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo, UserManager<AppUser> userManager, IFMPService fmpService)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
            _userManager = userManager;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] CommentQueryObject query)
        {
            var comments = await _commentRepo.GetAllAsync(query);
            var commentDTO = comments.Select(x => x.ToCommentDTO());
            return Ok(commentDTO);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _commentRepo.GetByIdAsync(id);
            if (comment == null) return NotFound();
            return Ok(comment.ToCommentDTO());
            //this return 200 OK, generic reply
        }

        [HttpPost("{stockId:int}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentDTO commentDTO)
        {
            if (!await _stockRepo.StockExistAsync(stockId))
                ModelState.AddModelError(nameof(stockId), "This stock does not exists.");            
            if (!ModelState.IsValid) return ValidationProblem(ModelState);//BadRequest(ModelState);
            
            var appUser = await User.GetUserLoginAsync(_userManager);
            var commentModel = commentDTO.ToCommentFromCreateCommentDTO(stockId, appUser.Id);
            commentModel = await _commentRepo.CreateAsync(commentModel);
            if (commentModel == null) return NotFound();

            return CreatedAtAction(nameof(GetById), new { id = commentModel.ID }, commentModel.ToCommentDTO());
            //this return 201 Created, telling the client it create and give header (URL) to track the new data
        }
        

        [HttpPost("{symbol:alpha}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] string symbol, [FromBody] CreateCommentDTO commentDTO)
        {
            var stock = await _fmpService.FindStockBySymbolAsync(symbol, _stockRepo);
            if (stock == null)
            {
                ModelState.AddModelError(nameof(symbol), "This stock does not exists.");
                return ValidationProblem(ModelState);//BadRequest(ModelState);
            }
            
            var appUser = await User.GetUserLoginAsync(_userManager);
            var commentModel = commentDTO.ToCommentFromCreateCommentDTO(stock.ID, appUser.Id);
            commentModel = await _commentRepo.CreateAsync(commentModel);
            if (commentModel == null) return NotFound();

            return CreatedAtAction(nameof(GetById), new { id = commentModel.ID }, commentModel.ToCommentDTO());
            //this return 201 Created, telling the client it create and give header (URL) to track the new data
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentDTO commentDTO)
        {
            var commentModel = await _commentRepo.UpdateAsync(id, commentDTO);
            if (commentModel == null) return NotFound();

            return Ok(commentModel.ToCommentDTO());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var commentModel = await _commentRepo.DeleteAsync(id);
            if (commentModel == null) return NotFound();

            return NoContent();
            //this return 204 No Content, it just say success without giving any redundant info that client already know
        }

    }
}