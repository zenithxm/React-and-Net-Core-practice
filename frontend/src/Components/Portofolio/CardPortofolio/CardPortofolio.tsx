import React, { SyntheticEvent } from "react";
import DeletePortofolio from "../DeletePortofolio/DeletePortofolio";
import { Link } from "react-router-dom";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  id: string;
  data: PortfolioGet;
  handlePortoCardDelete: (e: SyntheticEvent) => void;
}

const CardPortofolio = ({ id, data, handlePortoCardDelete }: Props) => {
  return (
    <div
      id={id}
      key={id}
      className="w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3"
    >
      <Link to={`/company/${data.symbol}/company-profile`} className="pt-6 text-xl font-bold">
        {data.symbol}
      </Link>
      <DeletePortofolio
        data={data.symbol}
        handlePortoCardDelete={handlePortoCardDelete}
      />
    </div>
  );
};

export default CardPortofolio;
