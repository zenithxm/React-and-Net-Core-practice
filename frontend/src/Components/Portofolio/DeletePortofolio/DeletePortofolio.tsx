import React, { SyntheticEvent } from "react";

interface Props {
  data: string;
  handlePortoCardDelete: (e: SyntheticEvent) => void;
}

const DeletePortofolio = ({ data, handlePortoCardDelete }: Props) => {
  return (
    <div>
      <form onSubmit={(e) => handlePortoCardDelete(e)}>
        <input readOnly={true} hidden={true} value={data} />
        <button
          type="submit"
          className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500"
        >
          X
        </button>
      </form>
    </div>
  );
};

export default DeletePortofolio;
