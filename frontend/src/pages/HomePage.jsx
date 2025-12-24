import { useState, useMemo, useEffect } from 'react';
import PostCard from '../components/PostCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { usePosts } from '../contexts/PostContext.jsx';
import '../css/MainLayout.css';
import '../css/HomePage.css';

function HomePage() {
    const { posts, fetchAllPosts } = usePosts();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        if (!searchTerm.trim()) return posts;
        
        const lowerSearch = searchTerm.toLowerCase();
        return posts.filter(post => 
            post.title?.toLowerCase().includes(lowerSearch) ||
            post.description?.toLowerCase().includes(lowerSearch)
        );
    }, [posts, searchTerm]);

    return (
        <div className="main-content">
            <SearchBar onSearch={setSearchTerm} />
            
            {filteredPosts.length === 0 && searchTerm ? (
                <div className="no-results">
                    <span className="no-results-icon">🔍</span>
                    <p>No posts found matching "{searchTerm}"</p>
                    <span className="no-results-subtext">Try a different search term</span>
                </div>
            ) : (
                <div className="posts-container">
                    <div className="posts-list">
                        {filteredPosts.map(p => <PostCard post={p} key={p.id} />)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;