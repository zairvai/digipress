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
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        createdAt
        updatedAt
        version
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        createdAt
        updatedAt
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
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
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
export const getAccountByUniqueUrl = /* GraphQL */ `
  query GetAccountByUniqueUrl($url: String!) {
    getAccountByUniqueUrl(url: $url) {
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
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        createdAt
        updatedAt
        version
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        createdAt
        updatedAt
        version
      }
      createdAt
      updatedAt
      version
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($input: GetItemInput!) {
    getUser(input: $input) {
      id
      name
      emailAddress
      phoneNumber
      emailAddressVerified
      phoneNumberVerified
      enabled
      roles
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        createdAt
        updatedAt
        version
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        createdAt
        updatedAt
        version
      }
      createdAt
      updatedAt
      version
    }
  }
`;
export const getUserByEmailAddress = /* GraphQL */ `
  query GetUserByEmailAddress($emailAddress: String!) {
    getUserByEmailAddress(emailAddress: $emailAddress) {
      id
      name
      emailAddress
      phoneNumber
      emailAddressVerified
      phoneNumberVerified
      enabled
      roles
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        createdAt
        updatedAt
        version
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        createdAt
        updatedAt
        version
      }
      createdAt
      updatedAt
      version
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers($input: ListItemInput) {
    listUsers(input: $input) {
      items {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
          version
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          roles
          createdAt
          updatedAt
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
