import { render, screen } from "@testing-library/react";
import { Articles } from "./Articles";
import { describe, expect, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../ui/card", () => ({
  Card: () => <div>Card</div>,
  CardContent: () => <div>CardContent</div>,
  CardDescription: () => <div>CardDescription</div>,
  CardHeader: () => <div>CardHeader</div>,
  CardTitle: () => <div>CardTitle</div>,
}));

vi.mock("./Loader", () => ({
  ArticleLoadingCard: () => <div>ArticleLoadingCard</div>,
}));

describe("Articles", () => {
  it("renders Articles component", () => {
    render(
      <Articles
        isError={false}
        isPending={false}
        error={null}
        data={{
          summary: "summary",
          results: [
            {
              title: "title",
              abstract: "abstract",
              publication_date: "2021-10-10",
            },
          ],
        }}
      />
    );
    expect(screen.getByText("Card")).toBeInTheDocument();
  });

  it("renders ArticleLoadingCard component when isPending is true", () => {
    render(
      <Articles
        isError={false}
        isPending={true}
        error={null}
        data={{
          summary: "summary",
          results: [
            {
              title: "title",
              abstract: "abstract",
              publication_date: "2021-10-10",
            },
          ],
        }}
      />
    );
    expect(screen.getByText("ArticleLoadingCard")).toBeInTheDocument();
  });

  it("renders error message when isError is true", () => {
    render(
      <Articles
        isError={true}
        isPending={false}
        error={new Error("Error message")}
        data={{
          summary: "summary",
          results: [
            {
              title: "title",
              abstract: "abstract",
              publication_date: "2021-10-10",
            },
          ],
        }}
      />
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("renders welcome message when data is null", () => {
    render(
      <Articles
        isError={false}
        isPending={false}
        error={null}
        data={undefined}
      />
    );
    expect(
      screen.getByText("Welcome to the largest scientific online library")
    ).toBeInTheDocument();
  });

  it("renders empty message when data is empty array", () => {
    render(
      <Articles
        isError={false}
        isPending={false}
        error={null}
        data={{ summary: "", results: [] }}
      />
    );
    expect(screen.getByText("No articles found")).toBeInTheDocument();
  });
});
