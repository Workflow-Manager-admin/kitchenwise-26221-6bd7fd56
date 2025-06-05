import React from "react";
import { render, act } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "./components/saved/FavoritesContext";

// Helper: Test component to expose context API for functional testing.
function FavoritesTestHarness({ onTest }) {
  const favCtx = useFavorites();
  React.useEffect(() => {
    if (onTest) onTest(favCtx);
    // eslint-disable-next-line
  }, [onTest, favCtx]);
  return null;
}

describe("FavoritesContext (unit tests)", () => {
  let localStorageMock;

  beforeEach(() => {
    // Setup mock localStorage
    localStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
          store[key] = value;
        }),
        removeItem: jest.fn((key) => {
          delete store[key];
        }),
        clear: jest.fn(() => {
          store = {};
        })
      };
    })();
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
      configurable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const recipe1 = {
    id: "abc1",
    title: "Eggs Benedict",
    image: "egg.jpg",
    tags: ["breakfast"]
  };
  const recipe2 = {
    id: "abc2",
    title: "Veggie Tacos",
    image: "tacos.jpg",
    tags: ["vegetarian"]
  };

  it("FavoritesProvider initializes with empty list", (done) => {
    function testFn(ctx) {
      expect(ctx.getFavoritesList()).toEqual([]);
      done();
    }
    render(
      <FavoritesProvider>
        <FavoritesTestHarness onTest={testFn} />
      </FavoritesProvider>
    );
  });

  it("addFavorite adds to favorites and syncs localStorage", (done) => {
    function testFn(ctx) {
      ctx.addFavorite(recipe1);
      setTimeout(() => {
        expect(ctx.getFavoritesList()).toEqual([
          expect.objectContaining({ id: "abc1" })
        ]);
        expect(window.localStorage.setItem).toHaveBeenCalled();
        done();
      }, 10);
    }
    render(
      <FavoritesProvider>
        <FavoritesTestHarness onTest={testFn} />
      </FavoritesProvider>
    );
  });

  it("removeFavorite removes item by id", (done) => {
    function testFn(ctx) {
      ctx.addFavorite(recipe1);
      ctx.addFavorite(recipe2);
      setTimeout(() => {
        expect(ctx.getFavoritesList().length).toBe(2);
        ctx.removeFavorite("abc1");
        setTimeout(() => {
          expect(ctx.getFavoritesList()).toEqual([expect.objectContaining({ id: "abc2" })]);
          done();
        }, 5);
      }, 5);
    }
    render(
      <FavoritesProvider>
        <FavoritesTestHarness onTest={testFn} />
      </FavoritesProvider>
    );
  });

  it("toggleFavorite toggles (add/remove) favorite state", (done) => {
    function testFn(ctx) {
      ctx.toggleFavorite(recipe2);
      setTimeout(() => {
        expect(ctx.isFavorite("abc2")).toBe(true);
        ctx.toggleFavorite(recipe2);
        setTimeout(() => {
          expect(ctx.isFavorite("abc2")).toBe(false);
          done();
        }, 5);
      }, 5);
    }
    render(
      <FavoritesProvider>
        <FavoritesTestHarness onTest={testFn} />
      </FavoritesProvider>
    );
  });

  it("isFavorite returns correct status", (done) => {
    function testFn(ctx) {
      expect(ctx.isFavorite("abc1")).toBe(false);
      ctx.addFavorite(recipe1);
      setTimeout(() => {
        expect(ctx.isFavorite("abc1")).toBe(true);
        expect(ctx.isFavorite("nope")).toBe(false);
        done();
      }, 5);
    }
    render(
      <FavoritesProvider>
        <FavoritesTestHarness onTest={testFn} />
      </FavoritesProvider>
    );
  });

  it("FavoritesProvider loads favorites from localStorage if present", (done) => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({
      abc3: { id: "abc3", title: "Persisted Pancakes", image: "", tags: [] }
    }));
    function testFn(ctx) {
      expect(ctx.getFavoritesList()).toEqual([
        expect.objectContaining({ id: "abc3", title: "Persisted Pancakes" })
      ]);
      done();
    }
    render(
      <FavoritesProvider>
        <FavoritesTestHarness onTest={testFn} />
      </FavoritesProvider>
    );
  });
});
