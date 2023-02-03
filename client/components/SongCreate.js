import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { hashHistory, Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  // when user presses enter, add song to backend
  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        // after this mutation is successful, run this query
        // to get whatever new data is needed
        refetchQueries: [{ query: fetchSongs }],
      })
      // push back to the home path
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div class="container">
        <Link to="/">BACK</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title: </label>
          {/* controlled input means we are watching them */}
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

// merging mutation and component together
// and calling this.props.mutate will run the mutation tied
// with the component
export default graphql(mutation)(SongCreate);
