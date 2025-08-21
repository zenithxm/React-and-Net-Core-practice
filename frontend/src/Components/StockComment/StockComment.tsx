import React, { useEffect, useState } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

interface Props {
  symbol: string;
}

type CommentFormInput = {
  title: string;
  content: string;
};

const StockComment = ({ symbol }: Props) => {
  const [comments, setComments] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>();

  const handleComment = (e: CommentFormInput) => {
    commentPostAPI(symbol, e.title, e.content)
      .then((res) => {
        if (res) {
          getComments();
          toast.success("Comment created successfully!");
        }
      })
      .catch((e) => {
        toast.warning("Server Error Occured");
      });
  };

  const getComments = () => {
    setLoading(true);
    commentGetAPI(symbol, 1)
      .then((res) => {
        setLoading(false);
        setComments(res?.data!);
      })
      .catch((e) => {
        toast.warning("Server Error Occured");
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
      <StockCommentForm symbol={symbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
