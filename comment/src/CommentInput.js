import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    }
    constructor() {
        super();
        this.state = {
            username: '',
            content: '',
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleContent = this.handleContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
    }
    _loadUsername() {
        const username = localStorage.getItem('username');
        if (username) {
            this.setState({ username });
        }
    }
    _saveUsername(username) {
        localStorage.setItem('username', username)
    }
    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }
    handleUsernameBlur(e) {
        this._saveUsername(e.target.value);
    }
    handleContent(e) {
        this.setState({ content: e.target.value });
    }
    handleSubmit() {
        if (this.props.onSubmit) {
            const { username, content } = this.state
            this.props.onSubmit({ username, content, createdTime: +new Date() })
        }
        this.setState({ content: '' });
    }
    componentWillMount() {
        this._loadUsername();
    }
    componentDidMount() {
        this.textarea.focus();
    }
    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            onBlur={this.handleUsernameBlur} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={textarea => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContent} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}
export default CommentInput