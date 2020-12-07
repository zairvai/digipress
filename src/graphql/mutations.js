/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccount = /* GraphQL */ `
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
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
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount($input: DeleteItemInput!) {
    deleteAccount(input: $input) {
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
