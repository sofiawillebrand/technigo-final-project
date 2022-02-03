import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../utils/urls";

import { MainContainer } from "./reusable-components/Containers";
import { Select } from "./reusable-components/Inputs";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const [topUsers, setTopUsers] = useState([]);
  const [country, setCountry] = useState("");
  const [timeSpan, settimeSpan] = useState("week");
  const signedInUser = useSelector((store) => store.user);
  let urlPath = `leaderboard?timeSpan=${timeSpan}`;

  if (country) {
    urlPath = `leaderboard?timeSpan=${timeSpan}&country=${country}`;
  }

  const options = {
    method: "GET",
    headers: {
      Authorization: signedInUser.accessToken,
    },
  };

  useEffect(async () => {
    await fetch(API_URL(urlPath), options)
      .then((res) => res.json())
      .then((data) => {
        setTopUsers(data.response);
      });
  }, [country, timeSpan]);

  return (
    <MainContainer>
      <h1>Leaderboard</h1>
      <div>
        <button onClick={() => settimeSpan("week")}>This week</button>
        <button onClick={() => settimeSpan("month")}>
          This month
        </button>
        <button onClick={() => settimeSpan("year")}>This year</button>
        <button onClick={() => settimeSpan("")}>All time high</button>
      </div>
      <Select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">All countries</option>
        <option value="Sweden">Sweden</option>
        <option value="Norway">Norway</option>
      </Select>
      {topUsers &&
        topUsers.map((user) => (
          <div key={user.user}>
            <h2>{user.user}</h2>
            <p>{user.score}</p>
          </div>
        ))}
    </MainContainer>
  );
};

export default Leaderboard;
