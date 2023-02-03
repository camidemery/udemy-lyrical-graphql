import React, { Component } from "react";
import { graphql } from "react-apollo";
import songDetail from "../queries/songDetail";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    // handle when the data is still loading
    const { song } = this.props.data;
    if (!song) {
      return <div>Loading</div>;
    }

    return (
      <div className="container">
        <Link to="/">BACK</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate song={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(songDetail, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
