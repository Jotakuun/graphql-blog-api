import { default as blogPostQueries} from './blog-post-queries';
import { default as userQueries} from './user-queries';
import { default as commentQueries} from './comment-queries';

export default {
  ...blogPostQueries,
  ...userQueries,
  ...commentQueries
};