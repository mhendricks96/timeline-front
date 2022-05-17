import { Store } from "pullstate";
// This is the store that keeps track of the current user
// let storedUser: any = localStorage.getItem("user")
// let parsedUser = JSON.parse(storedUser)



interface userStoreInt {
  userInfo: any;
}

const UserStore = new Store<userStoreInt>({
  userInfo: {},
});

export default UserStore;