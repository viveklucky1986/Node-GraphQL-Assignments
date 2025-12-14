import { gql } from "@apollo/client";

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $age: Int!
    $className: String!
    $attendance: Int!
    $role: Role!
  ) {
    addEmployee(
      name: $name
      age: $age
      className: $className
      attendance: $attendance
      role: $role
    ) {
      id
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String
    $age: Int
    $className: String
    $attendance: Int
    $role: Role
  ) {
    updateEmployee(
      id: $id
      name: $name
      age: $age
      className: $className
      attendance: $attendance
      role: $role
    ) {
      id
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;