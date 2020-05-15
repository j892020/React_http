import React, { Component } from 'react';
import myAxios from '../../../myAxios';

import './FullPost.css';

class FullPost extends Component {
	state = {
		loadedPost: null,
	};

	componentDidMount = () => {
		console.log('[FullPost] componentDidMount');
		this.loadData();
	};

	componentDidUpdate = () => {
		this.loadData();
	};

	loadData = () => {
		if (this.props.match.params.id) {
			if (
				!this.state.loadedPost ||
				(this.state.loadedPost &&
					this.state.loadedPost.id !== this.props.match.params.id * 1)
			) {
				myAxios
					.get('/posts/' + this.props.match.params.id)
					.then((response) => {
						this.setState({ loadedPost: response.data });
					});
			}
		}
	};

	deletePostHandler = () => {
		myAxios.delete('/posts/' + this.props.match.params.id).then((res) => {
			console.log(res);
		});
	};

	render() {
		console.log('[FullPost] render');
		let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
		if (this.props.match.params.id) {
			post = <p style={{ textAlign: 'center' }}>Loading!</p>;
		}
		if (this.state.loadedPost) {
			post = (
				<div className="FullPost">
					<h1>{this.state.loadedPost.title}</h1>
					<p>{this.state.loadedPost.body}</p>
					<div className="Edit">
						<button
							onClick={this.deletePostHandler}
							className="Delete"
						>
							Delete
						</button>
					</div>
				</div>
			);
		}
		return post;
	}
}

export default FullPost;
