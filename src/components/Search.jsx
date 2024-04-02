import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';


const Search = () => {
  const [username, setUserName] = useState("");
  const { user, setUser } = useUser();

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.info("No '"+username+"' found !");
        setUser(null);
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (err) {
      toast.info("Something Went Wrong!");
      setUser(null);
    }
    setUserName("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
    if (e.target.value === "") {
      setUser(null);
    }
  };

  return (
    <div>
      <form className="d-flex finder" role="search">
        <input
          className="form-control finder-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={username}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

export default Search;
