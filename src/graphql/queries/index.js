import { default as blogPostQueries} from './blog-post-queries';
import { default as userQueries} from './user-queries';

export default {
  ...blogPostQueries,
  ...userQueries
};