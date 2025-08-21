import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { CompanyDividen } from "../../company";
import { getCompaniesDividen } from "../../api";
import Spinner from "../Spinner/Spinner";
import SimpleLineChart from "../SimpleLineChart/SimpleLineChart";

interface Props {}

const Dividen = (props: Props) => {
  const ticker = useOutletContext<string>();

  const [companyDividen, setcompanyDividen] = useState<CompanyDividen[]>();
  const [serverError, setserverError] = useState<string>("");

  const handleCompanyDividen = async () => {
    const result = await getCompaniesDividen(ticker!);
    if (typeof result === "string") {
      setserverError(result);
    } else if (Array.isArray(result.data)) {
      setserverError("");
      setcompanyDividen(result?.data);
    }
  };

  useEffect(() => {
    handleCompanyDividen();
  }, []);
  return (
    <div>
      {companyDividen ? (
        <SimpleLineChart
          data={companyDividen}
          xAxis="date"
          dataKey="adjClose"
        />
      ) : (
        <h1 className="ml-3">Company does not have a dividend!</h1>
      )}
    </div>
  );
};

export default Dividen;
