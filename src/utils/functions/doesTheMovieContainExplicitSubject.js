function doesTheMovieContainExplicitSubject(movie) {
  return (
    movie.title?.toLowerCase().includes("porn") ||
    movie.title?.toLowerCase().includes("sexe") ||
    movie.title?.toLowerCase().includes("xxx") ||
    movie.original_title?.toLowerCase().includes("porn") ||
    movie.original_title?.toLowerCase().includes("sexe") ||
    movie.original_title?.toLowerCase().includes("xxx") ||
    movie.overview?.toLowerCase().includes("porn") ||
    movie.overview?.toLowerCase().includes("sexe") ||
    movie.overview?.toLowerCase().includes("xxx")
  );
}

export default doesTheMovieContainExplicitSubject;
