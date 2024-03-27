import { Filter } from "./components/filter";
import { Loader } from "./ui/loader";
import { useApp } from "./providers/appProvider";
import { CardList } from "./components/cardList";

export default function App() {
  const { results } = useApp();

  return (
    <div className="main">
      <Filter />
      <Loader isLoading={results?.status === "loading"} />
      {results?.status === "success" && <CardList characters={results.data} />}
    </div>
  );
}
