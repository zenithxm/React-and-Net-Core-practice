import axios from "axios";
import {
    CompanyBalanceSheet,
    CompanyCashFlow,
  CompanyDividen,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyKeyRatios,
  CompanyProfile,
  CompanySearch,
} from "./company";

export const searchCompanies = async (query: string) => {
  try {
    const data = await axios.get<CompanySearch[]>(
      `https://financialmodelingprep.com/stable/search-symbol?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("error: ", err.message);
      return err.message;
    } else {
      console.log("error: ", err);
      return "An unexpected error has occured";
    }
  }
};

export const getCompanies = async (query: string) => {
  try {
    const data = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("error: ", err.message);
      return err.message;
    } else {
      console.log("error: ", err);
      return "An unexpected error has occured";
    }
  }
};

export const getCompaniesKeyRatio = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyRatios[]>(
      `https://financialmodelingprep.com/stable/ratios-ttm?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("error: ", err.message);
      return err.message;
    } else {
      console.log("error: ", err);
      return "An unexpected error has occured";
    }
  }
};

export const getCompaniesKeyMetric = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("error: ", err.message);
      return err.message;
    } else {
      console.log("error: ", err);
      return "An unexpected error has occured";
    }
  }
};

export const getCompaniesIncomeStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/stable/income-statement?symbol=${query}&limit=5&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
        console.log(err)
      console.log("error: ", err.message);
      return err.message;
    } else {
      console.log("error: ", err);
      return "An unexpected error has occured";
    }
  }
};

export const getCompaniesBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&limit=5&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
        console.log(err)
      console.log("error: ", err.message);
      return err.message;
    } else {
      console.log("error: ", err);
      return "An unexpected error has occured";
    }
  }
};

export const getCompaniesCashFlow = async (query: string) => {
  try {
    const data = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${query}&limit=5&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
        console.log(err)
      console.log("error: ", err.message);
      return err.message;
    } else {
      console.log("error: ", err);
      return "An unexpected error has occured";
    }
  }
};

export const getCompaniesDividen = async (query: string) => {
  try {
    const data = await axios.get<CompanyDividen[]>(
      `https://financialmodelingprep.com/stable/historical-price-eod/dividend-adjusted?symbol=${query}&limit=5&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
        console.log(err)
      console.log("error: ", err.message);
      return err.message;
    } else {
      console.log("error: ", err);
      return "An unexpected error has occured";
    }
  }
};