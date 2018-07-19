import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        username: PropType.any,
        onUserNameInputBlur: PropType.func
    }
    static defaultProps = {
        username: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            username: props.username, // 从 props 上取 username 字段
            content: '',
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleContentChange  = this.handleContentChange .bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
    }
    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }
    handleUsernameBlur(e) {
        if (this.props.onUserNameInputBlur) {
            this.props.onUserNameInputBlur(e.target.value);
        }
    }
    handleContentChange (e) {
        this.setState({ content: e.target.value });
    }
    handleSubmit() {
        if (this.props.onSubmit) {
            const { username, content } = this.state
            this.props.onSubmit({ username, content, createdTime: +new Date() })
        }
        this.setState({ content: '' });
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
                            onChange={this.handleContentChange } />
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