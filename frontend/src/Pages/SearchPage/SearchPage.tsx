import React, {
  useState,
  useEffect,
  ChangeEvent,
  SyntheticEvent,
  FormEvent,
} from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import Search from "../../Components/Search/Search";
import ListPortofolio from "../../Components/Portofolio/ListPortofolio/ListPortofolio";
import CardList from "../../Components/CardList/CardList";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  PortfolioDeleteAPI,
  PortfolioGetAPI,
  PortfolioPostAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setserverError] = useState<string>("");
  const [listPortofolio, setlistPortofolio] = useState<PortfolioGet[]|null>([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setserverError(result);
    } else if (Array.isArray(result.data)) {
      setserverError("");
      setSearchResult(result.data);
    }
  };

  const handlePortofolioSubmit = (e: any) => {
    e.preventDefault();
    PortfolioPostAPI(e.target[0].value)
      .then((res) => {
        if (res) {
          populatePortfolio();
          toast.success("Portfolio successfully added!");
        }
      })
      .catch((e) => {
        toast.warning("Server Error Occured");
      });

    // const exist = listPortofolio.findIndex((el) => el === e.target[0].value);
    // if (exist < 0) {
    //   const tempPortofolio = [...listPortofolio, e.target[0].value];
    //   setlistPortofolio(tempPortofolio);
    // }
  };

  const handlePortoCardDelete = (e: any) => {
    e.preventDefault();
    PortfolioDeleteAPI(e.target[0].value)
      .then((res) => {
        if (res) {
          populatePortfolio();
          toast.success("Portfolio successfully deleted!");
        }
      })
      .catch((e) => {
        toast.warning("Server Error Occured");
      });

    // const tempPortofolio = listPortofolio.filter(
    //   (el) => el !== e.target[0].value
    // );
    // setlistPortofolio(tempPortofolio);
  };

  const populatePortfolio = () => {
    PortfolioGetAPI()
      .then((res) => {
        if (res) {
          setlistPortofolio(res?.data!);
        }
      })
      .catch((e) => {
        toast.warning("Server Error Occured");
      });
  };

  useEffect(() => {
    populatePortfolio();
  }, []);

  return (
    <div className="App">
      <Search
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ListPortofolio
        listPortofolio={listPortofolio!}
        handlePortoCardDelete={handlePortoCardDelete}
      />
      <CardList
        searchResult={searchResult}
        handlePortofolioSubmit={handlePortofolioSubmit}
      />{" "}
      {serverError && <h1>{serverError}</h1>}
    </div>
  );
};

export default SearchPage;
