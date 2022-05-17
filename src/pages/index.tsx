import {
  people,
  paperPlaneOutline,
  idCardOutline,
} from "ionicons/icons";

import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";

export const pages = [
  {
    label: "Friends",
    path: "/tab1",
    icon: people,
    component: Tab1,
    isTab: true,
    redirect: false,
  },
  {
    label: "Timeline",
    path: "/tab2",
    icon: people,
    component: Tab2,
    isTab: true,
    redirect: false,
  },
  {
    label: "Settings",
    path: "/tab3",
    icon: paperPlaneOutline,
    component: Tab3,
    isTab: true,
    redirect: false,
  },
  {
    label: "User Info",
    path: "/tab4",
    icon: idCardOutline,
    component: Tab4,
    isTab: true,
    redirect: true,
  },
];