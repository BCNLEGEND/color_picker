import { DRAWER_WIDTH } from "../constants";
const drawerWidth = DRAWER_WIDTH;

const styles = (theme) => ({
  root: {
    dislplay: "flex",
  },
  hide: {
    display: "none",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: "64px",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbtns: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1rem",
  },
  btn: {
    margin: "0 0.5rem",
  },
  link: {
    textDecoration: "none",
  },
});

export default styles;
