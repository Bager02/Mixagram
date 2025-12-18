import PostCard from '../components/PostCard.jsx'
import { usePosts } from '../contexts/PostContext.jsx';
import '../css/MainLayout.css';

function HomePage() {
    const { posts } = usePosts();

    return (
        <div className="main-content">
            <div className="posts-container">
                <div className="posts-list">
                    {posts.map(p => <PostCard post={p} key={p.id} />)}
                </div>
            </div>
        </div>
    );
}

export default HomePage;