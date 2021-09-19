import React, { useState, useEffect } from 'react';

// own component imports
import { isArticleVotedFromUser } from '../../../utils/axios/user/UserFunctions';

// material-ui imports
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { updateShareCounter } from '../../../utils/axios/user/UserFunctions';
import { getArticleById, updateArticleVoting } from '../../../utils/axios/article/ArticleFunctions';

// material-ui icon imports
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// third-party imports
import { useSelector } from 'react-redux';

import './ArticleVoting.css';

function ArticleVoting(props) {
    const [articleVoting, setArticleVoting] = useState(props.articleVoting);
    const [isArticleVoted, setIsArticleVoted] = useState("");   // "upvoted", "downvoted" or ""
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const userid = useSelector(state => state.user.userid); 

    const showSnackbar = () => { setOpenSnackbar(true); };
    const handleClose = () => { setOpenSnackbar(false); };

    useEffect(() => {
        setArticleVoting(props.articleVoting);
        async function getIsArticleUpvotedFromUser() {
            console.log("userid: " + userid);
            const votedFromUserResponse = await isArticleVotedFromUser(userid, props.articleid);
            setIsArticleVoted(votedFromUserResponse);
        }
        getIsArticleUpvotedFromUser();
    }, [props.articleVoting, props.articleid, userid])

    const updateVoting = (articleVoting, incValue) => {
        if (userid === props.creatorid) {
            showSnackbar();
            return;
        }
        updateShareCounter(incValue, props.creatorid);
        updateArticleVoting(articleVoting, props.articleid, props.voterid).then(() => {
            getArticleById(props.articleid, props.answerid).then((articleResponse) => {
                setArticleVoting(articleResponse[0].voting);
            });
        });
    }

    return (
        <div className="article-voting">
            <Tooltip title="Dieser Beitrag ist hilfreich und verständlich." placement="left" arrow>
                <IconButton onClick={() => updateVoting(1, 10)}>
                    <ArrowDropUpIcon 
                        iconStyle={{width: '56px', height: '56px'}}
                        style={{width: '56px', height: '56px', color: isArticleVoted === "upvoted" ? '#F48225' : '#696F75' }} />
                </IconButton>
            </Tooltip>
            <p>{articleVoting}</p>
            <Tooltip title="Dieser Beitrag ist nicht hilfreich und unverständlich." placement="left" arrow>
                <IconButton onClick={() => updateVoting(-1, -3)}>
                    <ArrowDropDownIcon
                        iconStyle={{width: '56px', height: '56px'}}
                        style={{width: '56px', height: '56px', color: isArticleVoted === "downvoted" ? '#F48225' : '#696F75' }} />
                </IconButton>
            </Tooltip>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert 
                    severity="error"
                    onClose={() => handleClose()}
                    style={{backgroundColor: '#8B3E2F', color: 'white'}}>Eigene Beiträge können nicht gevotet werden.</Alert>
            </Snackbar>
        </div>
    )
}

export default ArticleVoting;