const { gql } = require("apollo-server-express");

module.exports = gql`
  enum Role {
    ADMIN
    EMPLOYEE
    TEAM_LEAD
    MANAGER
    HR_MANAGER
    OPERATIONS_HEAD
    SALES_LEAD
    INTERN
    LEGAL_ADVISOR
    DATA_SCIENTIST
    SUPPORT_LEAD
    TECH_LEAD
    PRODUCT_MANAGER
    ACCOUNT_EXEC
    OPERATIONS_ANALYST
    CTO
    SECURITY_ENGINEER
    FINANCIAL_ANALYST
    SALES_DEVELOPMENT
    HR_SPECIALIST
    QA_ENGINEER
    PRODUCT_DESIGNER
    MARKET_RESEARCHER
    NLP_ENGINEER
    RISK_ANALYST
    LOGISTICS_COORD
    PARTNER_MANAGER
    HR_BUSINESS_PARTNER
    ML_ENGINEER
    SCRUM_MASTER
    CUSTOMER_SUCCESS_MGR
    DATA_ANALYST
    PROCUREMENT_SPEC
    FIRMWARE_ENGINEER
    SALES_OPS
    RECRUITER
    M_A_ANALYST
    PR_MANAGER
    DBA
    CEO
    QUALITY_MANAGER
    CHAIRMAN
    PRODUCT_MARKETING_MGR
  }

  enum SortDir {
    ASC
    DESC
  }

  type Employee {
    id: ID!
    name: String!
    age: Int!
    className: String!
    subjects: [String!]!
    attendance: Int!
    role: Role!
  }

  type EmployeePage {
    data: [Employee!]!
    total: Int!
    page: Int!
    limit: Int!
  }

  type Query {
    employees(
      page: Int
      limit: Int
      sortBy: String
      sortDir: SortDir
    ): EmployeePage!

    employee(id: ID!): Employee
    subjects: [String!]!
  }

  type Mutation {
    addEmployee(
      name: String!
      age: Int!
      className: String!
      subjects: [String!]!
      attendance: Int!
      role: Role!
    ): Employee!

    updateEmployee(
      id: ID!
      name: String
      age: Int
      className: String
      subjects: [String!]
      attendance: Int
      role: Role
    ): Employee!

    deleteEmployee(id: ID!): Boolean!
  }
`;
