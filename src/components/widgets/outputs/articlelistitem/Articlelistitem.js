import './Articlelistitem.css';

import { Link } from 'react-router-dom';

function Articlelistitem(props) {
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    /*const convertIntToDate = () => {
        const date = props.created;
        return new Date(date);
    }*/

    return (
        <div className="article-list-item" key={props.index}>
            <Link to={{pathname: `/article/${props.id}`}}>
                <h3>{props.title}</h3>
            </Link>
            <p>{props.voting} Voting {props.answerCounter} Antworten {props.views} Ansichten</p>
            <p>{props.creator}</p>
        </div>
    )
}

export default Articlelistitem;