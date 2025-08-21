import React, { useEffect, useState } from "react";
import { CompanyBalanceSheet } from "../../company";
import { useOutletContext } from "react-router";
import { getCompaniesBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import { formatLargeNumber } from "../../Helper/NumberFormatting";

interface Props {}

const config = [
  {
    label: <span className="font-bold">Total Assets</span>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.totalAssets),
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.totalCurrentAssets),
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.cashAndCashEquivalents),
  },
  {
    label: "Property & equipment",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.propertyPlantEquipmentNet),
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.intangibleAssets),
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.longTermDebt),
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.otherCurrentLiabilities),
  },
  {
    label: <span className="font-bold">Total Liabilites</span>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.totalLiabilities),
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.totalCurrentLiabilities),
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.longTermDebt),
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.otherLiabilities),
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.totalStockholdersEquity),
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) =>
      formatLargeNumber(company.retainedEarnings),
  },
];

const BalanceSheet = (props: Props) => {
  const ticker = useOutletContext<string>();

  const [companyBalanceSheet, setcompanyBalanceSheet] =
    useState<CompanyBalanceSheet>();
  const [serverError, setserverError] = useState<string>("");

  const handleCompanyBalanceSheet = async () => {
    const result = await getCompaniesBalanceSheet(ticker!);
    if (typeof result === "string") {
      setserverError(result);
    } else if (Array.isArray(result.data)) {
      setserverError("");
      setcompanyBalanceSheet(result?.data[0]);
    }
  };

  useEffect(() => {
    handleCompanyBalanceSheet();
  }, []);

  return (
    <div className="flex-1">
      {companyBalanceSheet ? (
        <RatioList data={companyBalanceSheet} configs={config} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default BalanceSheet;
