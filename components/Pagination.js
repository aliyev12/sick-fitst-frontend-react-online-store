import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import {Query} from 'react-apollo';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import Error from '../components/ErrorMessage';
import {perPage} from '../config';


const PAGINATION_QUERY = gql`
query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({data, loading, error}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <Error error={{error}} />;
      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil (count / perPage);
      const page = props.page;
      return (
        <PaginationStyles>
          <Head>
            <title>
              Great Fits - Page {page} of {pages}
            </title>
          </Head>
          <Link prefetch href={{
              pathname: 'items',
              query: { page: page - 1 }
          }}>
            <a className="prev" aria-disabled={page <= 1}>← Prev</a>
          </Link>
          <p>Page {page} of {pages}</p>
          <p>{count} Items Total</p>
          <Link prefetch href={{
              pathname: 'items',
              query: { page: page + 1 }
          }}>
            <a className="next" aria-disabled={page >= pages}>Next →</a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
