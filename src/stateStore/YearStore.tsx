import { Store } from "pullstate";

let storedYear: any = localStorage.getItem("year")
let parsedYear = JSON.parse(storedYear)

interface yearStoreInt {
  year: any;
}

const YearStore = new Store<yearStoreInt>({
  year: parsedYear || "2022",
});

export default YearStore;