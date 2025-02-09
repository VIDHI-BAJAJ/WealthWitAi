import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { Search } from "lucide-react";

export default function SearchBar({ onStockSelect }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = async () => {
        if (!query) return;
        try {
            const response = await axios.get(`/api/search?symbol=${query}`);
            onStockSelect(response.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        }
    };

    const fetchSuggestions = async (input) => {
        setQuery(input);
        if (input.length < 2) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(`/api/autocomplete?query=${input}`);
            setSuggestions(response.data || []);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    return (
        <div className="flex flex-row items-center w-full max-w-lg mx-auto mt-24">
        <div className="relative w-full border-2 rounded-lg flex items-center bg-white">
            {/* Search Icon */}
            <div className="absolute left-3 text-gray-400">
                <Search size={20} />
            </div>
            
            {/* Input Field */}
            <Input
                type="text"
                placeholder="Search Stock Ticker"
                value={query}
                onChange={(e) => fetchSuggestions(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border-none focus:ring-0 focus:outline-none rounded-lg bg-transparent"
            />
            
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-md z-50">
                    {suggestions.map((stock) => (
                        <li
                            key={stock.symbol}
                            className="px-4 py-2 w-full cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                                setQuery(stock.symbol);
                                setSuggestions([]);
                                handleSearch();
                            }}
                        >
                            {stock.name} ({stock.symbol})
                        </li>
                    ))}
                </ul>
            )}
        </div>
        
        {/* Search Button */}
        <Button onClick={handleSearch} className="mt-4 ml-5 bg-customBlue">Search</Button>
    </div>
    
    );
}
