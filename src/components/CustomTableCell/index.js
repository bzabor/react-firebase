import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#666666",
    color: theme.palette.common.white,
    fontSize: 12
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

export default CustomTableCell;
