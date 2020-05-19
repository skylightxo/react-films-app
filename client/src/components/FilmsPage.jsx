import React, {useState, useEffect, useCallback, useMemo} from "react";
import _orderBy from "lodash/orderBy";
import _find from "lodash/find";
import api from "./api";
import FilmsList from "./films/FilmsList";
import FilmContext from "./contexts/FilmContext";
import FilmForm from "./forms/FilmForm";
import Spinner from "./Spinner";
import AdminRoute from "./AdminRoute";

const sortFilms = films =>
  _orderBy(films, ["featured", "title"], ["desc", "asc"]);

const FilmsPage = props => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.films.fetchAll().then(films => {
      setFilms(sortFilms(films));
      setLoading(false);
    });
  }, []);

  const addFilm = filmData =>
    api.films.create(filmData).then(film => {
      setFilms(films => sortFilms([...films, {...film}]));
    });

  const updateFilm = filmData =>
    api.films.update(filmData).then(film => {
      setFilms(films =>
        sortFilms(films.map(f => (f._id === film._id ? film : f))),
      );
    });

  const saveFilm = film =>
    (film._id ? updateFilm(film) : addFilm(film)).then(() =>
      props.history.push("/films"),
    );

  const toggleFeatured = useCallback(
    id => {
      const film = _find(films, {_id: id});
      updateFilm({...film, featured: !film.featured});
    },
    [films],
  );

  const deleteFilm = useCallback(
    film =>
      api.films.delete(film).then(() => {
        setFilms(films => sortFilms(films.filter(f => f._id !== film._id)));
      }),
    [],
  );


  const values = {
      toggleFeatured,
      deleteFilm,
    }

  const cls = props.location.pathname === "/films" ? "sixteen" : "ten";

  return (
    <FilmContext.Provider value={values}>
      <div className="ui stackable grid">
        <div className="six wide column">
          <AdminRoute
            path="/films/new"
            render={() => <FilmForm film={{}} saveFilm={saveFilm} />}
          />
          <AdminRoute
            path="/films/edit/:_id"
            render={({match}) => {
              const film = _find(films, {_id: match.params._id}) || {};
              return <FilmForm film={film} saveFilm={saveFilm} />;
            }}
          />
        </div>

        <div className={`${cls} wide column`}>
          {loading ? <Spinner /> : <FilmsList films={films} />}
        </div>
      </div>
    </FilmContext.Provider>
  );
};

export default FilmsPage;
