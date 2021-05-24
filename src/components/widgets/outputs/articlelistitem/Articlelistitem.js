import './Articlelistitem.css';

function Articlelistitem(props) {
    return (
        <div className="article-list-item" key={props.index}>
            <h3>{props.title}</h3>
            <p>{props.voting} Voting {props.answerCounter} Antworten {props.views} Ansichten</p>
        </div>
    )
}

export default Articlelistitem;