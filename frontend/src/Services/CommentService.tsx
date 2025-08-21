import axios from "axios";
import { handleError } from "../Helper/ErrorHandler";
import { CommentGet, CommentPost } from "../Models/Comment";

const api = "http://localhost:5199/api/comment";

export const commentPostAPI = async (
  symbol: string,
  title: string,
  content: string
) => {
  try {
    const data = await axios.post<CommentPost>(api + `/${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentGetAPI = async (
  symbol: string,
  pageNumber: number
) => {
  try {
    const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}&PageNumber=${pageNumber}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};