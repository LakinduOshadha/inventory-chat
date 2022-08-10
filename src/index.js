import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Talk from 'talkjs';
// import {app, auth, db, uid} from './firebase.js';

class App extends Component {

    
    constructor(props) {
        super(props);
        
        this.inbox = undefined;
    }

    componentDidMount() {
        // Promise can be `then`ed multiple times
        // console.log(uid);
        Talk.ready
            .then(() => {
                const me = new Talk.User({
                    id: "11111",
                    name: "2018/E/070",
                    email: "1111e@looney.net",
                    photoUrl: "https://talkjs.com/docs/img/george.jpg",
                    // welcomeMessage: "Hey there! How are you? :-)"
                });

                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tu18Wmpv",
                        me: me
                    });
                }

                const other = new Talk.User({
                    id: "2222",
                    name: "Lecture 01",
                    email: "22222@teflon.com",
                    photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
                    // welcomeMessage: "Hey there! Love to chat :-)"
                });

                // You control the ID of a conversation. oneOnOneId is a helper method that generates
                // a unique conversation ID for a given pair of users. 
                const conversationId = Talk.oneOnOneId(me, other);
            
                const conversation = window.talkSession.getOrCreateConversation(conversationId);
                conversation.setParticipant(me);
                conversation.setParticipant(other);
            
                this.inbox = window.talkSession.createInbox({
                    selected: conversation
                });
                this.inbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    componentWillUnmount() {
        if (this.inbox) {
            this.inbox.destroy();
        }
    }

    render() {
        return (<span>
            <div style={{height: '500px'}} ref={c => this.container = c}>Loading...</div>
        </span>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
