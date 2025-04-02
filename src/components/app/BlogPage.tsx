import React from "react";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props<TData> = {
  data: TData;
  variables: {
    relativePath: string;
  };
};

type BlogPost = {
  post: {
    title: string;
    body: any;
    date: string;
  };
};

export const BlogIndexPageComponent = (props: Props<BlogPost>) => {
  return <></>;
};
