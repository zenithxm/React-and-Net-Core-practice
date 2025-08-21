import axios from "axios";
import { handleError } from "../Helper/ErrorHandler";
import { PortfolioDelete, PortfolioGet, PortfolioPost } from "../Models/Portfolio";

const api = "http://localhost:5199/api/portfolio";

export const PortfolioPostAPI = async (
  symbol: string
) => {
  try {
    const data = await axios.post<PortfolioPost>(api + `/${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const PortfolioDeleteAPI = async (
  symbol: string
) => {
  try {
    const data = await axios.delete<PortfolioDelete>(api + `/${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const PortfolioGetAPI = async () => {
  try {
    const data = await axios.get<PortfolioGet[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};