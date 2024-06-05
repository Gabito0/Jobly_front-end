import React from "react";
import { render } from "@testing-library/react";
import CompanyDetail from "./CompanyDetail";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <CompanyDetail />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/company/baker-santos"]}>
      <UserProvider>
        <Route path="/company/:handle">
          <CompanyDetail />
        </Route>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
