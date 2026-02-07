"use client";
import React, { FC, useState } from "react";
import { Input } from "@/app/components/shadcn/input";
import { Icon } from "@/app/components/atoms/Icon/Icon";
import { Button } from "@/app/components/shadcn/button";
import "./Search.styles.scss";

type SearchProps = {
  onClick: (value: string) => void;
  onChange?: (value: string) => void;
  showSearchIcon?: boolean;
};

const Search: FC<SearchProps> = ({ onClick, onChange, showSearchIcon = true }) => {
  const [search, setSearch] = useState<string>('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onChange?.(value);
  };
  
  return (
    <div className="searchContainer">
      <Input
        value={search}
        onChange={handleChange}
        type="text"
        placeholder="Search..."
      />
      <Button variant="outline" size="icon" onClick={() => onClick(search)}>
        {showSearchIcon && <Icon name="Search" />}
      </Button>
    </div>
  );
};

export default Search;
