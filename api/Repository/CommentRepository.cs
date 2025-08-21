using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Comment;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Comment?> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            Comment? commentModel = await _context.Comments.FirstOrDefaultAsync(x => x.ID == id);
            if (commentModel == null) return null;

            _context.Comments.Remove(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<List<Comment>> GetAllAsync(CommentQueryObject query)
        {
            var comments = _context.Comments.Include(x => x.AppUser).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Symbol))
                comments = comments.Where(x => x.Stock.Symbol.ToUpper() == query.Symbol.ToUpper());

            comments = query.IsDescending ? comments.OrderByDescending(x => x.CreateOn) : comments.OrderBy(x => x.CreateOn);

            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            comments = comments.Skip(skipNumber).Take(query.PageSize);

            return await comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.ID == id);
        }

        public async Task<Comment?> UpdateAsync(int id, UpdateCommentDTO commentDTO)
        {
            Comment? commentModel = await _context.Comments.FirstOrDefaultAsync(x => x.ID == id);
            if (commentModel == null) return null;

            commentModel.Title = commentDTO.Title;
            commentModel.Content = commentDTO.Content;

            await _context.SaveChangesAsync();
            return commentModel;
        }
    }
}