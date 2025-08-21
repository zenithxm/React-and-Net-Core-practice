import React from "react";
import { CompanyIncomeStatement } from "../../company";
import { v4 as uuid } from "uuid";

interface Props {
  data: any[] //CompanyIncomeStatement[]
  configs: any[]
}

const Table = ({ data, configs }: Props) => {
  const renderedRow = data.map((el) => {
    return (
      <tr key={uuid()}>
        {configs.map((val: any) => {
          return (
            <td key={uuid()} className="p-4 whitespace-nowarp text-sm font-normal text-gray-900">
              {val.render(el)}
            </td>
          );
        })}
      </tr>
    );
  });
  const renderedHeader = configs.map((val: any) => {
    return (
      <th
        key={uuid()}
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {val.label}
      </th>
    );
  });

  return (
    <div className="bg-white shadow rounded-lg p-6 sm:p-4 xl:p-8">
      <table>
        <thead className="min-w-full divide-y divide-gray-200 m-5">
          <tr>{renderedHeader}</tr>
        </thead>
        <tbody>{renderedRow}</tbody>
      </table>
    </div>
  );
};

export default Table;
