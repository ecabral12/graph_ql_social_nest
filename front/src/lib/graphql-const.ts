import { gql } from "@apollo/client";

export const get_me = gql`
  query Me {
    me {
      id
      email
      name
      articles {
        id
        title
        content
        author {
          id
          name
        }
        comments {
          id
          content
          author {
            name
            id
          }
          createdAt
        }
        likes {
          id
          user {
            id
          }
        }
        createdAt
      }
    }
  }
`;

export const get_articles = gql`
  query Articles {
    articles {
      id
      title
      content
      createdAt
      likes {
        id
        user {
          id
        }
      }
      comments {
        id
      }
      author {
        id
        name
      }
    }
  }
`;

export const get_article = gql(`
    query post($articleId: ID!) {
    article(id: $articleId) {
      id
      title
      content
      author {
        id
        name
      }
        likes{
          id
          user{id}
          }
          comments{id
          content
          author{
            id
            name
            }
          }
      createdAt
    }
  }
  `);

export const edit_article = gql(`
 mutation UpdateArticle($updateArticleId: ID!, $title: String, $content: String) {
  updateArticle(id: $updateArticleId, title: $title, content: $content) {
    id
  }
}
`);

export const create_article = gql(`
    mutation createPost($title: String!, $content: String!) {
  createArticle(title: $title, content: $content) {
    id
    title
  }
}
`);

export const like_article = gql(`
    mutation LikeArticle($articleId: ID!) {
  likeArticle(articleId: $articleId) {
    id
  }
}
`);

export const delete_article = gql(`mutation Mutation($deleteArticleId: ID!) {
  deleteArticle(id: $deleteArticleId) {
    id
  }
}
`);

export const delete_comment = gql(`
     mutation DeleteComment($deleteCommentId: ID!) {
        deleteComment(id: $deleteCommentId) {
          id
        }
      }
`);

export const create_comment = gql(`
    mutation AddComment($articleId: ID!, $content: String!) {
  addComment(articleId: $articleId, content: $content) {
    id
  }
}
`);
