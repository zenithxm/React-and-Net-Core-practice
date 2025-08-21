using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Comment;
using api.Model;

namespace api.Mappers
{
    public static class CommentMappers
    {
        public static GetCommentDTO ToCommentDTO(this Comment commentModel)
        {
            return new GetCommentDTO
            {
                ID = commentModel.ID,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreateOn = commentModel.CreateOn,
                CreatedBy = commentModel.AppUser.UserName,
                StockID = commentModel.StockID
            };
        }
        public static Comment ToCommentFromCreateCommentDTO(this CreateCommentDTO commentDTO, int stockId, string appUserID)
        {
            return new Comment
            {
                Title = commentDTO.Title,
                Content = commentDTO.Content,
                StockID = stockId,
                AppUserID = appUserID
            };
        }
    }
}