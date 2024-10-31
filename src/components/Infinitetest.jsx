import React, { useState, useRef, useCallback } from 'react';
import InfiniteSearch from './hooks/infiniteSearch';

function Infinitetest() {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    
    const {
        loading,
        error,
        items,
        hasMore
    } = InfiniteSearch(query, pageNumber);

    const observer = useRef();

    const lastItemRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    function handleSearch(e) {
        setQuery(e.target.value);
        setPageNumber(1);
    }

    return (
        <>
            <input type='text' onChange={handleSearch} value={query}></input>
            <div >
                {items.map((item, index) => {
                    if (items.length === index + 1) {
                        return <div ref={lastItemRef} key={item} >{item}</div>
                    } else {
                        return <div key={item} >{item}</div>
                    }
                })}
                <div >{loading && 'loading...'}</div>
                <div >{error && 'error'}</div>
            </div>

        </>
    )
}

export default Infinitetest 







