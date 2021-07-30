import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum UserRole {
  OWNER = "owner",
  ADMIN = "admin",
  TUTOR = "tutor",
  STUDENT = "student",
  MEMBER = "member"
}

export enum ReadAccess {
  PUBLIC = "public",
  PROTECTED = "protected",
  PRIVATE = "private"
}

export enum QnaType {
  QUES = "ques",
  ANS = "ans"
}

export declare class Account {
  readonly id: string;
  readonly name: string;
  readonly uniqueURL: string;
  readonly address: string;
  readonly contactPerson: string;
  readonly emailAddress: string;
  readonly phoneNumber: string;
  readonly status?: number;
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly version: number;
  constructor(init: ModelInit<Account>);
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly emailAddress: string;
  readonly phoneNumber?: string;
  readonly emailAddressVerified?: boolean;
  readonly phoneNumberVerified?: boolean;
  readonly enabled?: boolean;
  readonly roles?: (Access | null)[];
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly version: number;
  readonly status?: number;
  constructor(init: ModelInit<User>);
}

export declare class Access {
  readonly accountId: string;
  readonly role: UserRole | keyof typeof UserRole;
  readonly createdBy: string;
  readonly updatedBy: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly status?: number;
  constructor(init: ModelInit<Access>);
}

export declare class AccountConnection {
  readonly items?: (Account | null)[];
  readonly foundDocs?: number;
  constructor(init: ModelInit<AccountConnection>);
}

export declare class UserConnection {
  readonly items?: (User | null)[];
  readonly foundDocs?: number;
  constructor(init: ModelInit<UserConnection>);
}

export declare class Tag {
  readonly id: string;
  readonly account: Account;
  readonly name: string;
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly version: number;
  readonly status?: number;
  constructor(init: ModelInit<Tag>);
}

export declare class TagConnection {
  readonly items?: (Tag | null)[];
  readonly foundDocs?: number;
  constructor(init: ModelInit<TagConnection>);
}

export declare class Category {
  readonly id: string;
  readonly account: Account;
  readonly name: string;
  readonly desc?: string;
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly version: number;
  readonly status?: number;
  constructor(init: ModelInit<Category>);
}

export declare class CategoryConnection {
  readonly items?: (Category | null)[];
  readonly foundDocs?: number;
  constructor(init: ModelInit<CategoryConnection>);
}

export declare class Article {
  readonly id: string;
  readonly account: Account;
  readonly category?: Category;
  readonly title: string;
  readonly content?: string;
  readonly tags?: (Tag | null)[];
  readonly noOfAllComment?: number;
  readonly noOfNoReplyComment?: number;
  readonly allowComment?: boolean;
  readonly access?: ReadAccess | keyof typeof ReadAccess;
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly status?: number;
  readonly version: number;
  constructor(init: ModelInit<Article>);
}

export declare class ArticleConnection {
  readonly items?: (Article | null)[];
  readonly foundDocs?: number;
  constructor(init: ModelInit<ArticleConnection>);
}

export declare class Classroom {
  readonly id: string;
  readonly account: Account;
  readonly category?: Category;
  readonly title: string;
  readonly content?: string;
  readonly tags?: (Tag | null)[];
  readonly allowComment?: boolean;
  readonly access?: ReadAccess | keyof typeof ReadAccess;
  readonly total?: number;
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly status?: number;
  readonly version: number;
  constructor(init: ModelInit<Classroom>);
}

export declare class ClassroomConnection {
  readonly items?: (Classroom | null)[];
  readonly foundDocs?: number;
  constructor(init: ModelInit<ClassroomConnection>);
}

export declare class Comment {
  readonly id: string;
  readonly account: Account;
  readonly post: Article;
  readonly replyTo?: Comment;
  readonly replyToUser?: User;
  readonly replies?: (Comment | null)[];
  readonly content?: string;
  readonly noOfReply?: number;
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly version: number;
  readonly status?: number;
  constructor(init: ModelInit<Comment>);
}

export declare class CommentConnection {
  readonly items?: (Comment | null)[];
  readonly foundDocs?: number;
  constructor(init: ModelInit<CommentConnection>);
}

export declare class Qna {
  readonly id: string;
  readonly account: Account;
  readonly post: Classroom;
  readonly lesson?: Lesson;
  readonly qnaType: QnaType | keyof typeof QnaType;
  readonly replies?: (Qna | null)[];
  readonly replyTo?: Qna;
  readonly replyToUser?: User;
  readonly content?: string;
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly version: number;
  readonly status?: number;
  constructor(init: ModelInit<Qna>);
}

export declare class Lesson {
  readonly id: string;
  readonly account: Account;
  readonly post: Classroom;
  readonly title: string;
  readonly seq: number;
  readonly content?: string;
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly status?: number;
  readonly version: number;
  constructor(init: ModelInit<Lesson>);
}

export declare class QnaConnection {
  readonly items?: (Qna | null)[];
  readonly foundDocs?: number;
  constructor(init: ModelInit<QnaConnection>);
}

export declare class LessonConnection {
  readonly items?: (Lesson | null)[];
  readonly foundDocs?: number;
  constructor(init: ModelInit<LessonConnection>);
}

export declare class Analytic {
  readonly results?: string;
  readonly rows?: string;
  constructor(init: ModelInit<Analytic>);
}



