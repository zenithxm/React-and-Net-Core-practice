import React from "react";
import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";
import {v4 as uuid} from "uuid"

interface Props {
  comments: CommentGet[];
}

const StockCommentList = ({ comments }: Props) => {
  return (
    <div>
      {comments
        ? comments.map((comment) => {
            return <StockCommentListItem key={uuid()} comment={comment} />;
          })
        : "No comment"}
    </div>
  );
};

export default StockCommentList;
