import React from "react";
import { render } from "@testing-library/react";
import { useTriggerScrollFix } from "@/app/hooks/scroll"; 

function TestComponent({ deps }: { deps: any }) {
  useTriggerScrollFix(deps);

  return <div data-testid="test-component">Test Component</div>;
}

describe("useTriggerScrollFix", () => {
    it("triggers scroll event when rendered", () => {
        jest.spyOn(window, "dispatchEvent").mockImplementation(() => true);
    const { getByTestId } = render(
      <TestComponent
        deps={
          []
        }
      />
    );
      const testComponent = getByTestId("test-component");
      expect(testComponent).toBeInTheDocument();
    expect(window.dispatchEvent).toHaveBeenCalledWith(
      new CustomEvent("scroll")
    );
  });
});
