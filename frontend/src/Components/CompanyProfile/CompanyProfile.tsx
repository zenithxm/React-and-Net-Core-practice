import React, { useEffect, useState } from "react";
import { CompanyKeyMetrics, CompanyKeyRatios } from "../../company.d";
import RatioList from "../RatioList/RatioList";
import { getCompaniesKeyMetric, getCompaniesKeyRatio } from "../../api";
import { useOutletContext } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { formatLargeNumber, formatRatio } from "../../Helper/NumberFormatting";
import StockComment from "../StockComment/StockComment";

interface Props {}

const configs = [
  {
    label: "Current Ratio",
    render: (company: CompanyKeyRatios) => formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Free Cashflow Per Share",
    render: (company: CompanyKeyRatios) =>
      formatRatio(company.freeCashFlowPerShareTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Book Value Per Share TTM",
    render: (company: CompanyKeyRatios) =>
      formatRatio(company.bookValuePerShareTTM),
    subTitle:
      "Book value per share indicates a firm's net asset value (total assets - total li" +
      "abilities) on per share basis",
  },
  {
    label: "Divdend Yield TTM",
    render: (company: CompanyKeyRatios) =>
      formatRatio(company.dividendYieldTTM),
    subTitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Capex Per Share TTM",
    render: (company: CompanyKeyRatios) =>
      formatRatio(company.capexPerShareTTM),
    subTitle:
      "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },
  {
    label: "PE Ratio",
    render: (company: CompanyKeyRatios) =>
      formatRatio(company.priceToEarningsRatioTTM),
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay " +
      "for a stock",
  },
];

const configsMetric = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNumber(company.marketCap),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnEquityTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareho" +
      "lder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.grahamNumberTTM),
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay " +
      "for a stock",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();

  const [companyRatio, setCompanyRatio] = useState<CompanyKeyRatios>();
  const [companyMetric, setcompanyMetric] = useState<CompanyKeyMetrics>();
  const [serverError, setserverError] = useState<string>("");

  const handleCompanyKeyRatio = async () => {
    const result = await getCompaniesKeyRatio(ticker!);
    if (typeof result === "string") {
      setserverError(result);
    } else if (Array.isArray(result.data)) {
      setserverError("");
      setCompanyRatio(result?.data[0]);
    }
  };

  const handleCompanyKeyMetric = async () => {
    const result = await getCompaniesKeyMetric(ticker!);
    if (typeof result === "string") {
      setserverError(result);
    } else if (Array.isArray(result.data)) {
      setserverError("");
      setcompanyMetric(result?.data[0]);
    }
  };

  // useEffect(() => {
  //   handleCompanyKeyRatio();
  //   handleCompanyKeyMetric();
  // }, []);
  return (
    <div className="flex-1">
      {companyRatio && companyMetric ? (
        <div>
          <RatioList data={companyMetric} configs={configsMetric} />
          <RatioList data={companyRatio} configs={configs} />
          <StockComment symbol={ticker} />
        </div>
      ) : (
        <StockComment symbol={ticker} /> //<Spinner />
      )}
    </div>
  );
};

export default CompanyProfile;
