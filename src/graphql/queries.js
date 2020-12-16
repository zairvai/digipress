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
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
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
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
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
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
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
      roles {
        accountId
        role
        createdBy
        updatedBy
        createdAt
        updatedAt
        status
      }
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      createdAt
      updatedAt
      version
      status
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
      roles {
        accountId
        role
        createdBy
        updatedBy
        createdAt
        updatedAt
        status
      }
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      createdAt
      updatedAt
      version
      status
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
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      foundDocs
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($input: GetItemInput!) {
    getTag(input: $input) {
      id
      account {
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
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
      }
      name
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      createdAt
      updatedAt
      version
      status
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags($input: ListItemInput) {
    listTags(input: $input) {
      items {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        name
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      foundDocs
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($input: GetItemInput!) {
    getCategory(input: $input) {
      id
      account {
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
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
      }
      name
      desc
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      createdAt
      updatedAt
      version
      status
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories($input: ListItemInput) {
    listCategories(input: $input) {
      items {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        name
        desc
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      foundDocs
    }
  }
`;
export const getArticle = /* GraphQL */ `
  query GetArticle($input: GetItemInput!) {
    getArticle(input: $input) {
      id
      account {
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
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
      }
      category {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        name
        desc
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      title
      content
      tags {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        name
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      allowComment
      access
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      createdAt
      updatedAt
      status
      version
    }
  }
`;
export const listArticles = /* GraphQL */ `
  query ListArticles($input: ListItemInput) {
    listArticles(input: $input) {
      items {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        category {
          id
          name
          desc
          createdAt
          updatedAt
          version
          status
        }
        title
        content
        tags {
          id
          name
          createdAt
          updatedAt
          version
          status
        }
        allowComment
        access
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        status
        version
      }
      foundDocs
    }
  }
`;
export const getClassroom = /* GraphQL */ `
  query GetClassroom($input: GetItemInput!) {
    getClassroom(input: $input) {
      id
      account {
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
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
      }
      category {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        name
        desc
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      title
      content
      tags {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        name
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      allowComment
      access
      total
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      createdAt
      updatedAt
      status
      version
    }
  }
`;
export const listClassrooms = /* GraphQL */ `
  query ListClassrooms($input: ListItemInput) {
    listClassrooms(input: $input) {
      items {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        category {
          id
          name
          desc
          createdAt
          updatedAt
          version
          status
        }
        title
        content
        tags {
          id
          name
          createdAt
          updatedAt
          version
          status
        }
        allowComment
        access
        total
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        status
        version
      }
      foundDocs
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($input: GetItemInput!) {
    getComment(input: $input) {
      id
      account {
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
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
      }
      article {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        category {
          id
          name
          desc
          createdAt
          updatedAt
          version
          status
        }
        title
        content
        tags {
          id
          name
          createdAt
          updatedAt
          version
          status
        }
        allowComment
        access
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        status
        version
      }
      replyTo {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        article {
          id
          title
          content
          allowComment
          access
          createdAt
          updatedAt
          status
          version
        }
        replyTo {
          id
          content
          createdAt
          updatedAt
          version
          status
        }
        replyToUser {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        content
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      replyToUser {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      content
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      createdAt
      updatedAt
      version
      status
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments($input: ListItemInput) {
    listComments(input: $input) {
      items {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        article {
          id
          title
          content
          allowComment
          access
          createdAt
          updatedAt
          status
          version
        }
        replyTo {
          id
          content
          createdAt
          updatedAt
          version
          status
        }
        replyToUser {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        content
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      foundDocs
    }
  }
`;
export const getQna = /* GraphQL */ `
  query GetQna($input: GetItemInput!) {
    getQna(input: $input) {
      id
      account {
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
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
      }
      classroom {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        category {
          id
          name
          desc
          createdAt
          updatedAt
          version
          status
        }
        title
        content
        tags {
          id
          name
          createdAt
          updatedAt
          version
          status
        }
        allowComment
        access
        total
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        status
        version
      }
      lesson {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        classroom {
          id
          title
          content
          allowComment
          access
          total
          createdAt
          updatedAt
          status
          version
        }
        title
        seq
        content
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        status
        version
      }
      replyTo {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        classroom {
          id
          title
          content
          allowComment
          access
          total
          createdAt
          updatedAt
          status
          version
        }
        lesson {
          id
          title
          seq
          content
          createdAt
          updatedAt
          status
          version
        }
        replyTo {
          id
          content
          createdAt
          updatedAt
          version
          status
        }
        content
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      content
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      createdAt
      updatedAt
      version
      status
    }
  }
`;
export const listQnas = /* GraphQL */ `
  query ListQnas($input: ListItemInput) {
    listQnas(input: $input) {
      items {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        classroom {
          id
          title
          content
          allowComment
          access
          total
          createdAt
          updatedAt
          status
          version
        }
        lesson {
          id
          title
          seq
          content
          createdAt
          updatedAt
          status
          version
        }
        replyTo {
          id
          content
          createdAt
          updatedAt
          version
          status
        }
        content
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      foundDocs
    }
  }
`;
export const getLesson = /* GraphQL */ `
  query GetLesson($input: GetItemInput!) {
    getLesson(input: $input) {
      id
      account {
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
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
      }
      classroom {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        category {
          id
          name
          desc
          createdAt
          updatedAt
          version
          status
        }
        title
        content
        tags {
          id
          name
          createdAt
          updatedAt
          version
          status
        }
        allowComment
        access
        total
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        status
        version
      }
      title
      seq
      content
      createdBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      updatedBy {
        id
        name
        emailAddress
        phoneNumber
        emailAddressVerified
        phoneNumberVerified
        enabled
        roles {
          accountId
          role
          createdBy
          updatedBy
          createdAt
          updatedAt
          status
        }
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        version
        status
      }
      createdAt
      updatedAt
      status
      version
    }
  }
`;
export const listLessons = /* GraphQL */ `
  query ListLessons($input: ListItemInput) {
    listLessons(input: $input) {
      items {
        id
        account {
          id
          name
          uniqueURL
          address
          contactPerson
          emailAddress
          phoneNumber
          status
          createdAt
          updatedAt
          version
        }
        classroom {
          id
          title
          content
          allowComment
          access
          total
          createdAt
          updatedAt
          status
          version
        }
        title
        seq
        content
        createdBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        updatedBy {
          id
          name
          emailAddress
          phoneNumber
          emailAddressVerified
          phoneNumberVerified
          enabled
          createdAt
          updatedAt
          version
          status
        }
        createdAt
        updatedAt
        status
        version
      }
      foundDocs
    }
  }
`;
