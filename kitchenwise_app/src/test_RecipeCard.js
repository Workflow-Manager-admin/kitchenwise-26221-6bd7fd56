import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RecipeCard from "./components/home/RecipeCard";
import { FavoritesProvider, useFavorites } from "./components/saved/FavoritesContext";

// Helper: Provider wrapper for testing RecipeCard with context
function Wrapper({ children }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}

describe("RecipeCard (component/integration tests)", () => {
  const baseRecipe = {
    id: "fav42",
    title: "Golden Curry",
    image: "url.jpg",
    tags: ["dinner", "spicy"]
  };

  it("renders recipe title & tags", () => {
    render(<RecipeCard recipe={baseRecipe} />, { wrapper: Wrapper });
    expect(screen.getByText("Golden Curry")).toBeInTheDocument();
    expect(screen.getByText("dinner, spicy")).toBeInTheDocument();
  });

  it("shows empty/star icon when not favorited, filled/star when favorited", () => {
    render(<RecipeCard recipe={baseRecipe} />, { wrapper: Wrapper });
    const starBtn = screen.getByRole("button", { name: /favorite/i });
    // Should show empty (unfilled) star
    expect(starBtn).toHaveTextContent("☆");
    // Click toggles to favorited
    fireEvent.click(starBtn);
    // UI updates (should now show filled star)
    expect(starBtn).toHaveTextContent("★");
  });

  it("toggles favorite state on star button click, reflecting visually", () => {
    render(<RecipeCard recipe={baseRecipe} />, { wrapper: Wrapper });
    const starBtn = screen.getByRole("button", { name: /favorite/i });
    // Initial: not favored
    expect(starBtn).toHaveTextContent("☆");
    fireEvent.click(starBtn);
    expect(starBtn).toHaveTextContent("★");
    // Clicking again should unfavorite
    fireEvent.click(starBtn);
    expect(starBtn).toHaveTextContent("☆");
  });

  it("works when passing props directly instead of a 'recipe' object", () => {
    render(
      <RecipeCard
        id="id99"
        title="Solo Props"
        image="solo.jpg"
        tags={["lunch"]}
      />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText("Solo Props")).toBeInTheDocument();
    expect(screen.getByText("lunch")).toBeInTheDocument();
    // Check star unfavorites/favorites visually
    const starBtn = screen.getByRole("button", { name: /favorite/i });
    fireEvent.click(starBtn);
    expect(starBtn).toHaveTextContent("★");
  });

  it("calls onClick handler when card is clicked (does not affect favorite)", () => {
    const onClick = jest.fn();
    render(<RecipeCard recipe={baseRecipe} onClick={onClick} />, { wrapper: Wrapper });
    const cardDiv = screen.getByRole("button");
    fireEvent.click(cardDiv);
    expect(onClick).toHaveBeenCalled();
  });
});
