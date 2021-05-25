import './Articlelistitem.css';

import { Link } from 'react-router-dom';

function Articlelistitem(props) {
    return (
        <div className="article-list-item" key={props.index}>
            <Link to={{pathname: `/article/${props.id}`}}>
                <h3>{props.title}</h3>
            </Link>
            <p>{props.voting} Voting {props.answerCounter} Antworten {props.views} Ansichten</p>
        </div>
    )
}

export default Articlelistitem;