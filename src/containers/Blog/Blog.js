import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
// import NewPost from './NewPost/NewPost';

// import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
const Posts = React.lazy(() => import('./Posts/Posts'));

const AsyncNewPost = asyncComponent(() => {
	return import('./NewPost/NewPost');
});

class Blog extends Component {
	state = {
		auth: true,
	};

	componentDidUpdate() {
		console.log('[Blog] componentDidUpdate');
	}

	render() {
		console.log('[Blog] render');

		return (
			<div className="Blog">
				<header>
					<nav>
						<ul>
							<li>
								<NavLink
									to="/posts"
									exact
									activeClassName="my-active"
									activeStyle={{
										color: '#fa923f',
										textDecoration: 'underline',
									}}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: '/new-post',
										hash: '#submit',
										search: '?quick-submit=true',
									}}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				{/* <Route path="/" exact render={() => <h1>Home</h1>} />
				<Route path="/" render={() => <h1>Home 2</h1>} /> */}
				<Switch>
					{this.state.auth ? (
						<Route path="/new-post" component={AsyncNewPost} />
					) : null}
					<Route
						path="/posts"
						render={(props) => (
							<Suspense fallback={<div>Loading...</div>}>
								<Posts {...props} />
							</Suspense>
						)}
					/>
					{/* <Route render={() => <h1>Not found</h1>} /> */}
					{/* <Redirect from="/" to="/posts" /> */}
					{/* <Route path="/:id" component={FullPost} /> */}
				</Switch>
			</div>
		);
	}
}

export default Blog;
