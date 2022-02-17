function returnDataSlotBasedOnGivenId(id) {
  //return the name of the property in the pinia state linked to the given id
  switch (id) {
    case "":
      return "popular";

    case "28":
      return "action";

    case "16":
      return "animation";

    case "12":
      return "adventure";

    case "35":
      return "comedy";

    case "99":
      return "documentary";

    default:
      console.log(
        "error occured, default case got triggered here is the id received as argument:"
      );
      console.log(id);
  }
}

export default returnDataSlotBasedOnGivenId;
