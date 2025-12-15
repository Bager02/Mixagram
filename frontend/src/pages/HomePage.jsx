import PostCard from '../components/PostCard.jsx'
import { usePosts } from '../contexts/PostContext.jsx';

function HomePage() {
    const { posts } = usePosts();
    
    return (
        <div className="posts-container">
            <div className="posts-list">
                {posts.map(p => <PostCard post={p} key={p.id}/>)}
            </div>
        </div>
    );
}

export default HomePage;