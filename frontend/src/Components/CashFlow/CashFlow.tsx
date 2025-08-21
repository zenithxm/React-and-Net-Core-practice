import React, { useEffect, useState } from "react";
import { CompanyCashFlow } from "../../company";
import { useOutletContext } from "react-router";
import { getCompaniesCashFlow } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatLargeNumber } from "../../Helper/NumberFormatting";

interface Props {}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeNumber(company.netCashUsedForInvestingActivites),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeNumber(company.netCashUsedProvidedByFinancingActivities),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeNumber(company.commonStockIssued),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeNumber(company.freeCashFlow),
  },
];

const CashFlow = (props: Props) => {
  const ticker = useOutletContext<string>();

  const [companyCashFlow, setcompanyCashFlow] = useState<CompanyCashFlow[]>();
  const [serverError, setserverError] = useState<string>("");

  const handleCompanyCashFlow = async () => {
    const result = await getCompaniesCashFlow(ticker!);
    if (typeof result === "string") {
      setserverError(result);
    } else if (Array.isArray(result.data)) {
      setserverError("");
      setcompanyCashFlow(result?.data);
    }
  };

  useEffect(() => {
    handleCompanyCashFlow();
  }, []);

  return (
    <div>
      {companyCashFlow ? (
        <Table configs={config} data={companyCashFlow} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CashFlow;
