import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query Employees(
    $page: Int
    $limit: Int
    $sortBy: String
    $sortDir: SortDir
  ) {
    employees(
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortDir: $sortDir
    ) {
      total
      page
      limit
      data {
        id
        name
        age
        className
        attendance
        role
      }
    }
  }
`;
