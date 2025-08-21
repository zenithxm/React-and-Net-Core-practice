import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

interface Props {
  ticker: string;
}

const CompFinderItem = ({ ticker }: Props) => {
  return (
    <Link
      key={uuid()}
      reloadDocument
      to={`/company/${ticker}/company-profile`}
      type="button"
      className="inline-flex items-center p-4 rounded-l-lg uppercase"
    >
      {ticker}
    </Link>
  );
};

export default CompFinderItem;
