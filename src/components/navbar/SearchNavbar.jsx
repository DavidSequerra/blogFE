import React, { useEffect, useState, useCallback, useRef } from 'react';
import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css";

import InfiniteSearch from '../hooks/infiniteSearch';

import styles from './SearchNavbar.module.css'

function SearchSideBar() {
    const [searchText, setSearchText] = useState('');
    const [classChange, setClassChange] = useState(styles.textInputA);
    const [showDropdown, setShowDropdown] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef();
    const dropdownRef = useRef();

    const {
        loading,
        items: suggestions,
        hasMore,
    } = InfiniteSearch(searchText, pageNumber);

    useEffect(() => {
        if (searchText === '') {
            setClassChange(styles.textInputA);
            setShowDropdown(false);
        } else {
            setClassChange(styles.textInputB);
            setShowDropdown(true);
            setPageNumber(1);
        }
    }, [searchText]);

    const lastSuggestionRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
                setClassChange(styles.textInputA);
                setSearchText('');
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    
    return (
        <div ref={dropdownRef}>
            <Form.Group className={styles.formWrapper}>
                <i className={`${'bi bi-search'} ${!searchText ? styles.magnifierIcon : styles.magnifierIconAni}`}></i>
                <p className={`${!searchText ? styles.placeHolderText : styles.placeHolderTextAni}`}>Find blogs and people</p>
                <Form.Control className={classChange}  type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)}></Form.Control>
            </Form.Group>
            {showDropdown && (
                <ul className={styles.suggestionsDropdown} >
                    {suggestions.length > 0 ? suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className={styles.suggestionItem}
                            ref={suggestions.length === index + 1 ? lastSuggestionRef : null}
                        >
                            {suggestion}
                        </li>
                    )) : <li className={styles.suggestionItem}>No results found</li>}
                </ul>
                
            )}
        </div>
    )
}

export default SearchSideBar