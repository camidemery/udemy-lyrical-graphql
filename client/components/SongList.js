import React, { Component } from "react";
import gql from "graphql-tag";
// bonding the query to the component?
import { graphql, renderToStringWithData } from "react-apollo";
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";
import deleteSong from "../mutations/deleteSong";

// Why the F is this guy using classes... because the stack is effing old
class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: { id },
      refetchQueries: [{ query: fetchSongs }],
    });
    // can use the data.refetch only if that query is tied to
    // that component
    // }).then(()=> this.props.data.refetch());
  }
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    // need to handle the loading state
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

// bonding is what executes query when component is rendered
// when the query is complete, the component will rerender
// this is a double wrap of the helper to tie both helpers to the component
// can be done using the useMutation API these days
export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
