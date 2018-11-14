import React, { Component } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
	  state = {
        posts: [],
       
    }

    componentDidMount(){
    	// console.log(this.props)
        // es6 promises 
        axios.get('/posts')
            .then((response) => {
                // only storing 4 posts
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatedPosts})
                // console.log(response)
            })
            .catch(error => {
                console.log(error)
                // this.setState({error: true});
            });

    }

    postSelected = (id) => {
        this.setState({selectedPostId: id})
    }

	render(){
		let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                    return (
                    	<Link key={post.id} to={'/' + post.id}>
		                    <Post 
		                    title={post.title} 
		                    author={post.author}
		                    clicked={() => this.postSelected(post.id)}/>
		                </Link> );     

            });
        }

		return (
			<section className="Posts">
                    {posts}
            </section>
		);
	}
}

export default Posts;