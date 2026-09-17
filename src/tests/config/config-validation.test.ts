import { LayoutConfigSchema } from "../../config/schemas/config";
import { diwaliConfig } from "../../mocks/fixtures/config-diwali";
import { normalConfig } from "../../mocks/fixtures/config-normal";

describe("LayoutConfigSchema", () => {
  it("accepts the normal configuration", () => {
    expect(LayoutConfigSchema.safeParse(normalConfig).success).toBe(true);
  });

  it("accepts the Diwali configuration", () => {
    expect(LayoutConfigSchema.safeParse(diwaliConfig).success).toBe(true);
  });

  it("allows an unknown section type", () => {
    const configWithUnknownSection = {
      ...normalConfig,
      sections: [
        ...normalConfig.sections,
        {
          id: "future-section",
          type: "future_section",
          title: "Future content",
          background: {
            kind: "color" as const,
            value: normalConfig.theme.background,
          },
          items: [],
        },
      ],
    };

    expect(LayoutConfigSchema.safeParse(configWithUnknownSection).success).toBe(
      true,
    );
  });

  it("rejects an invalid theme colour", () => {
    const invalidConfig = {
      ...normalConfig,
      theme: {
        ...normalConfig.theme,
        primary: "not-a-colour",
      },
    };

    expect(LayoutConfigSchema.safeParse(invalidConfig).success).toBe(false);
  });
});
