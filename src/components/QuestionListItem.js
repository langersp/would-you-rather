import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import Typography from '@material-ui/core/Typography'

const QuestionListItem = props => {
    const { question, authedUser, avatarURL } = props
    //const authedUser = this.props.authedUser
    const classes = props

    //const id = this.props.id
    const { id, author, optionOne} = question

    if (authedUser === null) {
      //return <Redirect to='/Login' />
      return (
        <Redirect
          to={{
            pathname: '/Login',
            //search: "?utm=your+face",
            state: { referrer: this.props.location.pathname }
          }}
        />
      )
    }

    return (
      <ListItem component={Link} to={`/question/${id}`} alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src={avatarURL} />
        </ListItemAvatar>
        <ListItemText
          primary='Would you rather....'
          secondary={
            <React.Fragment>
              <Typography
                component='span'
                className={classes.inline}
                color='textPrimary'>
                {author}
              </Typography>
              {optionOne.text} or ...
            </React.Fragment>
          }
        />
      </ListItem>
    )
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const question = questions[id]
  const avatarURL =
    Object.values(users).length !== 0
      ? Object.values(users).filter(person => person.id === question.author)[0]
          .avatarURL
      : ''
  return {
    question: question,
    authedUser: authedUser,
    avatarURL: avatarURL
  }
}
export default connect(mapStateToProps)(QuestionListItem)
