import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { BASE_URL } from "../helper"

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  const icon_s= {
    marginTop:"15px",
    height:"4.5rem",
    width:"4.5rem",
    lineHeight:"4.5rem",
    fontSize:"2rem",
    background:"rgb(236 236 236)",
    color:"#130f40",
    borderRadius:".5rem",
    marginLeft:".3rem",
    cursor:"pointer",
    textAlign:"center",
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
        style={{marginTop:"33px",border:"none",
        borderBottom:"3px solid #575a58",fontFamily:"Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",    fontSize:"revert",
        outline: "none"}}
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn" type="submit" style={icon_s} >
        <FontAwesomeIcon icon={faMagnifyingGlass}  />
                </button>
      </form>
    </div>
  );
};

export default SearchInput;
