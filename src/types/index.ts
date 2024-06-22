// src/types/index.ts

import { ReactNode } from "react";
import { JsxElement } from "typescript";

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
export interface PostDetaiProps {
  post: PostType;
  hasPaddingX?: boolean;
}

export interface PostEventActionProps {
  post: PostType;
  handleSelectedPostClick: () => void;
  handleSelectedPostKeyDown?: (event: any) => void;
}

export type CommentProps = {
  comment: CommentType;
  firstComment: boolean;
};

export type LayoutProps = {
  children?: JSX.Element;
};
