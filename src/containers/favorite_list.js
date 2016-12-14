import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCommits } from '../actions/index';
import { Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn } from 'material-ui/Table';

import Info from './info';

class FavoriteList extends Component {
  constructor(props) {
    super(props);

    this.renderInfo = this.renderInfo.bind(this);
  }
  renderInfo(selection) {
    const repo = this.props.repo.favorites[selection[0]];
    this.props.fetchCommits(`${repo.owner.login}/${repo.name}`);
  }

  renderFavorite(repoData) {
    const author = repoData.owner.login;
    const name = repoData.name;
    const stars = repoData.stargazers_count;
    return (
      <TableRow>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/author/${author}`}>{author}</Link>
        </TableRowColumn>
        <TableRowColumn>{stars}</TableRowColumn>
      </TableRow>
    );
  }

  render() {
    return (
      <div>
        <Info {...this.props} />
        <Table onRowSelection={this.renderInfo}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Repo</TableHeaderColumn>
              <TableHeaderColumn>Author</TableHeaderColumn>
              <TableHeaderColumn>Stars</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.repo.favorites.map(this.renderFavorite)}
          </TableBody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps({ repo }) {
  return { repo };
}

FavoriteList.propTypes = {
  repo: React.PropTypes.array
};

export default connect(mapStateToProps, { fetchCommits })(FavoriteList);
