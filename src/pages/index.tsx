import {
  people,
  paperPlaneOutline,
  idCardOutline,
} from "ionicons/icons";

import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Settings from "./Settings";
import Tab4 from "./Tab4";

export const pages = [
  {
    label: "Friends",
    path: "/friends",
    icon: people,
    component: Tab1,
    isTab: true,
    redirect: false,
  },
  {
    label: "Timeline",
    path: "/timeline",
    icon: people,
    component: Tab2,
    isTab: true,
    redirect: false,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: paperPlaneOutline,
    component: Settings,
    isTab: true,
    redirect: false,
  },
  {
    label: "User Info",
    path: "/userinfo",
    icon: idCardOutline,
    component: Tab4,
    isTab: true,
    redirect: true,
  },
];