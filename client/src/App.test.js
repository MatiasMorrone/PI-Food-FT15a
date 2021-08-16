import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import store from "../src/Redux/Store/index";
// import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import SelectOrder from "../src/Components/SelectOrder/SelectOrder";

describe("RecipeDetail", () => {
  it("It has one element to order from A to Z called AZ", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SelectOrder />
        </BrowserRouter>
      </Provider>
    );
    const home = screen.getByText("AZ");
    expect(home).toBeInTheDocument();
  });
});
