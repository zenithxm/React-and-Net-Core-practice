export type PortfolioPost = {
  symbol: string;
};
export type PortfolioDelete = {
  symbol: string;
};
export type PortfolioGet = {
  id: number;
  symbol: string;
  companyName: string;
  purchase: number;
  lastDividen: number;
  industry: string;
  marketCap: number;
  comments: any;
};
