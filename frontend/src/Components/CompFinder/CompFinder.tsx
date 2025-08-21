import React, { SyntheticEvent, useEffect, useState } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import { useOutletContext } from "react-router";
import CompFinderItem from "./CompFinderItem/CompFinderItem";
import { v4 as uuid } from "uuid";

interface Props {
  ticker: string;
}

const CompFinder = ({ ticker }: Props) => {
  const [searchResultComp, setSearchResultComp] = useState<CompanySearch[]>([]);
  const [serverError, setserverError] = useState<string>("");

  const handleSearchSubmitComp = async () => {
    const result = await searchCompanies(ticker!.substring(0, 3));
    if (typeof result === "string") {
      setserverError(result);
    } else if (Array.isArray(result.data)) {
      setserverError("");
      setSearchResultComp(result.data);
    }
  };

  useEffect(() => {
    handleSearchSubmitComp();
  }, []);

  return (
    <div className="inline-flex round-md shadow-sm m-4">
      {searchResultComp ? (
        searchResultComp.map((el) => {
          return <CompFinderItem key={uuid()} ticker={el.symbol} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default CompFinder;
