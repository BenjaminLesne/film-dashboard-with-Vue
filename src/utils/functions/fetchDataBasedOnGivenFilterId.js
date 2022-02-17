import returnDataSlotBasedOnGivenId from "./returnDataSlotBasedOnGivenId";
import doesTheMovieContainExplicitSubject from "./doesTheMovieContainExplicitSubject";
import env from "../../env";

async function fetchDataBasedOnGivenFilterId(filterId) {
  //setup the url to fetch data based on which filter is active
  const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${env.apiKey}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&certification_country=FR&certification.lte=PG`;

  const pieceOfOptionUrl = filterId === "" ? "" : `&with_genres=${filterId}`;

  const url = baseUrl + pieceOfOptionUrl;
  const whatToReturn = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //add data to pinia store
      const whereToAddTheData = returnDataSlotBasedOnGivenId(filterId);

      const dataFiltered = data.results.filter(
        (movie) => doesTheMovieContainExplicitSubject(movie) === false
      );

      return { whereToAddTheData, data: dataFiltered };
    });

  return whatToReturn;
}

export default fetchDataBasedOnGivenFilterId;
