import React from 'react';

class MessageForm extends React.Component {
    state = {
        'content': ''
        };
    
    handleChange = event => {
        this.setState({
            'content': event.target.value            
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        event.persist();
        
        fetch('http://167.172.110.228:3000/message/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'content': this.state.content,
            })
        }).then(response => response)
          .then(response => response.json())
          .then(data => {
                if (data.error) {
                    this.props.handleError(data.error);
                } else {
                    event.target.reset();
                    this.props.handleMessageCreate(data.message)
                }
                
          })
          .catch(error => {
                this.props.handleError(`${error}`);
          }); 
          
    }
    
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-6 px-5 mt-4">
                    <form action="/message/create" method="POST" onSubmit={this.handleSubmit}>
                        <label htmlFor="message-content" className="text-primary"><strong>What’s on your mind?</strong></label>
                        <div className="input-group mb-3">
                            <input 
                                id="message-content" 
                                className="form-control text-white border-primary bg-primary" 
                                type="text" 
                                name="content" 
                                autoComplete="off" 
                                onChange={this.handleChange} 
                                value={this.state.value} />
                            <div className="input-group-append">
                                <input className="btn btn-primary" type="submit" value="Send" />
                            </div>
                        </div>
                    </form>
                </div>  
            </div>            

        );
    }
}

export default MessageForm;
