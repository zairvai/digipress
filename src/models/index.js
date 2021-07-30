// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "OWNER": "owner",
  "ADMIN": "admin",
  "TUTOR": "tutor",
  "STUDENT": "student",
  "MEMBER": "member"
};

const ReadAccess = {
  "PUBLIC": "public",
  "PROTECTED": "protected",
  "PRIVATE": "private"
};

const QnaType = {
  "QUES": "ques",
  "ANS": "ans"
};

const { Account, User, Access, AccountConnection, UserConnection, Tag, TagConnection, Category, CategoryConnection, Article, ArticleConnection, Classroom, ClassroomConnection, Comment, CommentConnection, Qna, Lesson, QnaConnection, LessonConnection, Analytic } = initSchema(schema);

export {
  UserRole,
  ReadAccess,
  QnaType,
  Account,
  User,
  Access,
  AccountConnection,
  UserConnection,
  Tag,
  TagConnection,
  Category,
  CategoryConnection,
  Article,
  ArticleConnection,
  Classroom,
  ClassroomConnection,
  Comment,
  CommentConnection,
  Qna,
  Lesson,
  QnaConnection,
  LessonConnection,
  Analytic
};