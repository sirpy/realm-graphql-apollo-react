import gql from "graphql-tag";

export const FIND_PROFILES = gql`
  query FindProfiles($query: User_profileQueryInput!) {
    user_profiles(query: $query) {
      fullName {
        display
      }
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($query: MovieQueryInput!, $set: MovieUpdateInput!) {
    updateOneMovie(query: $query, set: $set) {
      _id
      title
    }
  }
`;
