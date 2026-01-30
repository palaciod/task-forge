"use client";
import React, { FC, useState } from "react";
import { Input } from "@/app/components/shadcn/input";
import { Icon } from "@/app/components/atoms/Icon/Icon";
import { Button } from "@/app/components/shadcn/button";
import "./Search.styles.scss";

type SearchProps = {
  onClick: (value: string) => void;
};

const Search: FC<SearchProps> = ({ onClick }) => {
  const [search, setSearch] = useState<string>('');
  return (
    <div className="searchContainer">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
      />
      <Button variant="outline" size="icon" onClick={() => onClick(search)}>
        <Icon name="Search" />
      </Button>
    </div>
  );
};

export default Search;
