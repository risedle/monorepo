// This to make sure that Chart area is rendered
jest.mock("recharts", () => {
    const OriginalModule = jest.requireActual("recharts");
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: any) => (
            <OriginalModule.ResponsiveContainer
                width={100}
                height={200}
                aspect={1}
            >
                {children}
            </OriginalModule.ResponsiveContainer>
        ),
    };
});

export {};
