import { useState } from 'react';
import '../css/SearchBar.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search posts by title or description..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                {searchTerm && (
                    <button
                        type="button"
                        className="clear-button"
                        onClick={handleClear}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchBar;