import {
  peopleOutline,
  settingsOutline,
  idCardOutline,
  hourglassOutline,
} from "ionicons/icons";

import Landing from "./Landing"
import Friends from "./Friends";
import Timeline from "./Timeline";
import Settings from "./Settings";
import Tab4 from "./Tab4";

export const pages = [
  {
    label: "Friends",
    path: "/friends",
    icon: peopleOutline,
    component: Friends,
    isTab: true,
    redirect: false,
  },
  {
    label: "Timeline",
    path: "/timeline",
    icon: hourglassOutline,
    component: Timeline,
    isTab: true,
    redirect: false,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: settingsOutline,
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
    redirect: false,
  },
  {
    label: "Landing",
    path: "/landing",
    icon: peopleOutline,
    component: Landing,
    isTab: false,
    redirect: true,
  },
];