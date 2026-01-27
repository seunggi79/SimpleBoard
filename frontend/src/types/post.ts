export type Post = {
  id: number;
  title: string;
  content: string;
};

export type PostCreateRequest = {
  title: string;
  content: string;
};

export type PostUpdateRequest = {
  title: string;
  content: string;
};
