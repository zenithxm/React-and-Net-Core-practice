import React, { SyntheticEvent } from "react";
import CardPortofolio from "../CardPortofolio/CardPortofolio";
import { v4 as uuid } from "uuid";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  listPortofolio: PortfolioGet[];
  handlePortoCardDelete: (e: SyntheticEvent) => void;
}

const ListPortofolio = ({ listPortofolio, handlePortoCardDelete }: Props) => {
  return (
    <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        My Portofolio
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        {listPortofolio.length > 0 ? (
          <>
            {" "}
            {listPortofolio.map((el) => {
              return (
                <CardPortofolio
                  id={uuid()}
                  key={uuid()}
                  data={el}
                  handlePortoCardDelete={handlePortoCardDelete}
                />
              );
            })}{" "}
          </>
        ) : (
          <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
            Your portfolio is empty.
          </h3>
        )}
      </div>
    </section>
  );
};

export default ListPortofolio;
