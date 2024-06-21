// src/types/index.ts

export interface PostType {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  commentCount: number;
}

export interface CommentType {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  postId: number;
}

export type PostProps = {
  post: PostType;
};

export interface PostDetaiProps extends PostProps {
  hasPaddingX?: boolean;
}

export interface PostClickActionProps extends PostProps {
  handleSelectedPostClick: () => void;
}

export interface PostEventActionProps extends PostProps, PostClickActionProps {
  handleSelectedPostKeyDown?: (event: any) => void;
}

export type CommentProps = {
  comment: CommentType;
  firstComment: boolean;
};
