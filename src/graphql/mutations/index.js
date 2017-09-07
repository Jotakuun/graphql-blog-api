import { default as blogPostMutations} from './blog-post-mutations';
import { default as userMutations} from './user-mutations';
import { default as commentMutations } from './comment-mutations';

export default {
	...blogPostMutations,
	...userMutations,
	...commentMutations
};