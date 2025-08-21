import React, { FormEvent } from "react";
import Card from "../Card/Card";
import { CompanySearch } from "../../company";
import { v4 as uuid } from "uuid";

interface Props {
  searchResult: CompanySearch[];
  handlePortofolioSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CardList = ({ searchResult, handlePortofolioSubmit }: Props) => {
  return (
    <div className="flex flex-col items-center justify-end flex-1">
      {searchResult.length > 0 ? (
        <>
          <table className="w-full">
            <tbody>
              {searchResult.map((el) => {
                return (
                  <Card
                    id={el.symbol}
                    key={uuid()}
                    searchResult={el}
                    handlePortofolioSubmit={handlePortofolioSubmit}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}
    </div>
  );
};

export default CardList;
