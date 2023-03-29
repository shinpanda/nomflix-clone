import { useSearchParams } from "react-router-dom";

function SearchSection() {
  const [params, _] = useSearchParams();

  return <h1>{params.get("keyword")}</h1>;
}

export default SearchSection;
