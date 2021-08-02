import './Pagination.css';

import { makeStyles } from '@material-ui/core/styles';

// material-ui lab imports
import PaginationComponent from '@material-ui/lab/Pagination';

const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff"
      }
    }
  }));

function Pagination(props) {
    const classes = useStyles();

    return (
        <div className="pagination">
            <PaginationComponent
                classes={{ ul: classes.ul }}
                count={props.paginationCount}
                page={props.page}
                variant="outlined"
                color="primary"
                onChange={props.onChange} />
        </div>
    )
}

export default Pagination;