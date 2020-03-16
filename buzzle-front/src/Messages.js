import React from 'react';
import './App.css';

class Messages extends React.Component {
    state = {
        'messages': []
    }

    componentDidMount() {
        fetch('http://localhost:3000/messages', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => response.json())
          .then(data => {
              this.setState({
                  'messages': data.messages
              })
          })
          .catch(error => {
              console.error('Error:', error);
          });
    }

    render() {
        const messages = this.state.messages;
        if (messages.length === 0) {
            return (
                <ul>
                    <li>No messages...</li>
                </ul>
            )
        } else {
            return (
                <ul>{
                    messages.map(item => {
                        return (
                            <li key={item.message.id}>
                                {item.message.content}
                            </li>
                        );
                    })
                }</ul>
            )
        }
    }
}

export default Messages;
