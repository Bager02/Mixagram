import { useState, useMemo, useEffect, useRef } from 'react';
import PostCard from '../components/PostCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { usePosts } from '../contexts/PostContext.jsx';
import '../css/MainLayout.css';
import '../css/HomePage.css';

function HomePage() {
    const {
        posts,
        fetchInitialFeed,
        fetchMoreFeedPosts,
        hasMore,
        isLoading
    } = usePosts();

    const [searchTerm, setSearchTerm] = useState('');
    const observerRef = useRef(null);

    useEffect(() => {
        fetchInitialFeed();
    }, []);

    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchMoreFeedPosts();
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [fetchMoreFeedPosts, hasMore]);

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
                    <span className="no-results-subtext">
                        Try a different search term
                    </span>
                </div>
            ) : (
                <div className="posts-container">
                    <div className="posts-list">
                        {filteredPosts.map(p => (
                            <PostCard post={p} key={p.id} />
                        ))}
                    </div>
                    <div ref={observerRef} className="scroll-sentinel">
                        {isLoading && <p className="loading-text">Loading...</p>}
                        {!hasMore && (
                            <p className="end-text"> You're all caught up </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;