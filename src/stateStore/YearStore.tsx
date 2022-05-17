import { Store } from "pullstate";

interface yearStoreInt {
  year: any;
}

const YearStore = new Store<yearStoreInt>({
  year: "2022",
});

export default YearStore;