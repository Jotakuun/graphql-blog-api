import { default as blogPostMutations} from './blog-post-mutations';
import { default as userMutations} from './user-mutations';

export default {
  ...blogPostMutations,
  ...userMutations
};