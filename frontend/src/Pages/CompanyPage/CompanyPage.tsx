import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyKeyRatios, CompanyProfile } from "../../company";
import { getCompanies, getCompaniesKeyRatio } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import RatioList from "../../Components/RatioList/RatioList";
import Spinner from "../../Components/Spinner/Spinner";
import CompFinder from "../../Components/CompFinder/CompFinder";
import { formatLargeNumber } from "../../Helper/NumberFormatting";

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();
  const [serverError, setserverError] = useState<string>("");

  const handleCompanyProfile = async () => {
    const result = await getCompanies(ticker!);
    if (typeof result === "string") {
      setserverError(result);
    } else if (Array.isArray(result.data)) {
      setserverError("");
      setCompany(result?.data[0]);
    }
  };

  useEffect(() => {
    handleCompanyProfile();
  }, []);
  return (
    <section>
      {company ? (
        <>
          <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
            <Sidebar />
            <CompanyDashboard ticker={ticker!}>
              <Tile name="Company Name" data={company.companyName} />
              <Tile name="Price" data={formatLargeNumber(company.price)} />
              <Tile
                name="Avg. Volume"
                data={formatLargeNumber(company.averageVolume, false)}
              />
              <Tile name="Sector" data={company.sector} />
              <div className="px-4 pt-4">
                <CompFinder ticker={ticker!} />
                <p className="bg-white shadow rounded text-medium text-gray-500">
                  {company.description}
                </p>
              </div>
            </CompanyDashboard>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default CompanyPage;
