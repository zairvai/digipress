/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccount = /* GraphQL */ `
  query GetAccount($input: GetItemInput!) {
    getAccount(input: $input) {
      id
      name
      uniqueURL
      address
      contactPerson
      emailAddress
      phoneNumber
      status
      createdBy {
        id
        name
        emailAddress
        emailAddressVerified
        phoneNumber
        phoneNumberVerified
        role
        createdAt
        updatedAt
        status
        version
      }
      updatedBy {
        id
        name
        emailAddress
        emailAddressVerified
        phoneNumber
        phoneNumberVerified
        role
        createdAt
        updatedAt
        status
        version
      }
      createdAt
      updatedAt
      version
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts($input: ListItemInput) {
    listAccounts(input: $input) {
      items {
        id
        name
        uniqueURL
        address
        contactPerson
        emailAddress
        phoneNumber
        status
        createdBy {
          id
          name
          emailAddress
          emailAddressVerified
          phoneNumber
          phoneNumberVerified
          role
          createdAt
          updatedAt
          status
          version
        }
        updatedBy {
          id
          name
          emailAddress
          emailAddressVerified
          phoneNumber
          phoneNumberVerified
          role
          createdAt
          updatedAt
          status
          version
        }
        createdAt
        updatedAt
        version
      }
      foundDocs
    }
  }
`;
