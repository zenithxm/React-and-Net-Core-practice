import React, { FormEvent } from "react";
import "./Card.css";
import { CompanySearch } from "../../company";
import AddPortofolio from "../Portofolio/AddPortofolio/AddPortofolio";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  searchResult: CompanySearch;
  handlePortofolioSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Card = ({ id, searchResult, handlePortofolioSubmit }: Props) => {
  return (
    <tr id={id} key={id} className="w-full p-6 bg-slate-100 rounded-lg">
      <td className="p-2">
        <Link to={`/company/${searchResult.symbol}/company-profile`}>
          <h2 className="font-bold text-center text-black md:text-left">
            {searchResult.name}
          </h2>
          <span className="font-bold text-center text-black md:text-left">
            ({searchResult.symbol})
          </span>
        </Link>
      </td>
      <td className="p-2">
        <p className="text-black">{searchResult.currency}</p>
      </td>
      <td className="p-2">
        <p className="font-bold text-black">
          {searchResult.exchange}- {searchResult.exchangeFullName}
        </p>
      </td>
      <td className="p-2">
        <AddPortofolio
          handlePortofolioSubmit={handlePortofolioSubmit}
          symbol={searchResult.symbol}
        />
      </td>
    </tr>
  );
};

export default Card;
