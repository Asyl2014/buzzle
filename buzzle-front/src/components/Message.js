import React from 'react';
import Moment from 'react-moment';
import { AnimateGroup } from 'react-animation';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'content': props.message.content,
            'editing': false
        }
    }

    handleContentChange = event => {
        this.setState({
            'content': event.target.value
        });
    }

    handleEditSubmit = event => {
        event.preventDefault();

        if (this.state.editing) {
            const id = this.props.message.id;
            fetch(`http://localhost:3000/message/${id}/edit`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'content': this.state.content
                })
            }).then(response => response)
              .then(response => response.json())
              .then(data => {
                  if (data.error) {
                      this.props.handleError(data.error);
                  } else {
                      this.props.handleMessageEdit(data.message);
                      this.setState({
                          'editing': false
                      });
                  }
              })
              .catch(error => {
                  this.props.handleError(`${error}`);
              });
        } else {
            this.setState({
                'editing': true
            });
        }
    }

    handleDeleteSubmit = event => {
        event.preventDefault();

        if (this.state.editing) {
            this.setState({
                'editing': false
            });
        } else {
            const id = this.props.message.id;
            fetch(`http://localhost:3000/message/${id}/delete`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => response)
              .then(response => response.json())
              .then(data => {
                    if (data.error) {
                        this.props.handleError(data.error);
                    } else {
                        this.props.handleMessageDelete(id);
                    }
              })
              .catch(error => {
                  this.props.handleError(`${error}`);
              });
        }
    }

    render() {
        const user = this.props.user || {};
        const message = this.props.message;
        const editing = this.state.editing;

        const editAction = `/message/${message.id}/edit`;
        const deleteAction = `/message/${message.id}/delete`;

        let cardClasses = 'message card p-3 m-2 text-white';
        cardClasses += user.id === message.user.id ? ' bg-primary' : ' bg-secondary';
        return (
            <div className="col-md-4">
                <div className={cardClasses}>
                    <h5 className="card-title">{message.user.login}</h5>
                    <AnimateGroup animation="bounce">
                        {editing
                            ? <textarea key="0" onChange={this.handleContentChange} value={this.state.content}></textarea>
                            : <div key="1" className="message-content card-text">{message.content}</div>
                        }
                    </AnimateGroup>
                    <time className="message-date card-subtitle">
                        <small>
                            <Moment format="LLL">{message.createdAt}</Moment>
                        </small>
                    </time>
                    {(user.administrator || user.id === message.user.id) &&
                        <div className="clearfix">
                            <div className="float-right">
                                <form className="d-inline mr-1" action={editAction} onSubmit={this.handleEditSubmit} method="GET">
                                    <input className="edit-button btn btn-sm btn-outline-light" type="submit" value={editing ? 'Done' : 'Edit'} />
                                </form>
                                <form className="d-inline ml-1" action={deleteAction} onSubmit={this.handleDeleteSubmit} method="POST">
                                    <input className="delete-button btn btn-sm btn-outline-light" type="submit" value={editing ? 'Cancel' : 'Delete'} />
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Message;
