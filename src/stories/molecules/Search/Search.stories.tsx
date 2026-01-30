import type { Meta } from "@storybook/react";
import Search from "@/app/components/molecules/Search/Search";
import { useState } from "react";

const meta = {
  title: "Molecules/Search",
  component: Search,
} satisfies Meta<typeof Search>;

export default meta;

export const SearchStory = () => {
    const [isDark, setIsDark] = useState(false);
    return(
        <Search onClick={(value) => console.log(value)}/>
    );
}