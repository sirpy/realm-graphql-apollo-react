import "./styles.css";
import * as React from "react";
import { APP_ID } from "./index";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_PROFILES, UPDATE_MOVIE } from "./graphql-operations";

export default function App(props) {
  const [searchText, setSearchText] = React.useState("0x5ccc6fca8d5e4b038185a092c1bc9379c096f5fc104c402f32fb7793d92206bc");
  const { loading, data } = useQuery(FIND_PROFILES, {
    variables: { query: { index: {walletAddress: {hash_in: [searchText, "0xf07ba019151e670cca325b154a2e8ee6b8b9ca817b5af2f28ef92e3da162cd3b"]}} } }
  });
  console.log({loading, data})

  const movie = data ? data.user_profiles : null;
  const [updateMovie, { loading: updating }] = useMutation(UPDATE_MOVIE);
  const [newTitleText, setNewTitleText] = React.useState("Silly New Title");

  const updateMovieTitle = async () => {
    if (!movie) return;
    await updateMovie({
      variables: {
        query: { title: movie.title },
        set: { title: newTitleText }
      }
    });
    setSearchText(newTitleText);
  };

  return (
    <div className="App">
      <h1>Find a Movie</h1>
      <span className="subheading">
        The app automatically searches as you type
      </span>
      <div className="title-input">
        <input
          className="fancy-input"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          type="text"
        />
      </div>
      {APP_ID === "<Your App ID>" ? (
        <div className="status important">
          Replace APP_ID with your App ID in index.js
        </div>
      ) : (
        !loading &&
        !movie && <div className="status">No movie with that name!</div>
      )}
      {movie && (
        <div>
          {!updating && (
            <div className="title-input">
              <input
                type="text"
                className="fancy-input"
                value={newTitleText}
                onChange={e => setNewTitleText(e.target.value)}
              />
              <button
                className="fancy-button"
                onClick={() => updateMovieTitle()}
              >
                Change the movie title
              </button>
            </div>
          )}
          <h2>{movie.title}</h2>
          <div>Year: {movie.year}</div>
          <div>Runtime: {movie.runtime} minutes</div>
          <br />
          <img alt={`Poster for ${movie.title}`} src={movie.poster} />
        </div>
      )}
    </div>
  );
}
