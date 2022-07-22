import {
    Button,
    useColorMode,
    Icon,
    IconProps,
    Circle,
} from "@chakra-ui/react";

const DarkmodeIcon = (props: IconProps) => {
    return (
        <Icon viewBox="0 0 16 16" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.89961 1.00156C2.89961 0.780649 2.72052 0.601562 2.49961 0.601562C2.2787 0.601562 2.09961 0.780649 2.09961 1.00156V1.60156H1.49961C1.2787 1.60156 1.09961 1.78065 1.09961 2.00156C1.09961 2.22248 1.2787 2.40156 1.49961 2.40156H2.09961V3.00156C2.09961 3.22248 2.2787 3.40156 2.49961 3.40156C2.72052 3.40156 2.89961 3.22248 2.89961 3.00156V2.40156H3.49961C3.72052 2.40156 3.89961 2.22248 3.89961 2.00156C3.89961 1.78065 3.72052 1.60156 3.49961 1.60156H2.89961V1.00156ZM5.89961 4.00156C5.89961 3.78065 5.72052 3.60156 5.49961 3.60156C5.2787 3.60156 5.09961 3.78065 5.09961 4.00156V4.60156H4.49961C4.2787 4.60156 4.09961 4.78065 4.09961 5.00156C4.09961 5.22248 4.2787 5.40156 4.49961 5.40156H5.09961V6.00156C5.09961 6.22248 5.2787 6.40156 5.49961 6.40156C5.72052 6.40156 5.89961 6.22248 5.89961 6.00156V5.40156H6.49961C6.72052 5.40156 6.89961 5.22248 6.89961 5.00156C6.89961 4.78065 6.72052 4.60156 6.49961 4.60156H5.89961V4.00156ZM1.89961 7.00156C1.89961 6.78065 1.72052 6.60156 1.49961 6.60156C1.2787 6.60156 1.09961 6.78065 1.09961 7.00156V7.60156H0.499609C0.278695 7.60156 0.0996094 7.78065 0.0996094 8.00156C0.0996094 8.22248 0.278695 8.40156 0.499609 8.40156H1.09961V9.00156C1.09961 9.22248 1.2787 9.40156 1.49961 9.40156C1.72052 9.40156 1.89961 9.22248 1.89961 9.00156V8.40156H2.49961C2.72052 8.40156 2.89961 8.22248 2.89961 8.00156C2.89961 7.78065 2.72052 7.60156 2.49961 7.60156H1.89961V7.00156ZM8.54369 1.48343L8.24582 1.44317C8.03238 1.41926 7.90655 1.66709 8.02899 1.84353C8.16976 2.04638 8.29944 2.25751 8.41718 2.47604C8.91842 3.40644 9.20285 4.47091 9.20285 5.60181C9.20285 8.8736 6.8221 11.5894 3.6985 12.1113C3.45699 12.1516 3.20951 12.1788 2.95972 12.1922C2.74526 12.2036 2.62693 12.4551 2.77685 12.6088C2.84514 12.6789 2.91498 12.7474 2.9863 12.8144L3.05847 12.8811L3.31846 13.1061L3.50647 13.2548L3.62759 13.3449L3.81454 13.4758L3.99042 13.5906C4.11138 13.6667 4.23499 13.7391 4.3612 13.8075L4.6246 13.9428L4.88516 14.0623L5.188 14.1844L5.43133 14.2702C5.56527 14.3144 5.70112 14.3545 5.8382 14.3901C5.94225 14.4171 6.0473 14.4417 6.15368 14.4638C6.27957 14.4899 6.40677 14.5125 6.53508 14.5314L6.85205 14.5701L7.11897 14.5908C7.246 14.5981 7.374 14.6018 7.50285 14.6018C11.1479 14.6018 14.1028 11.6469 14.1028 8.00182C14.1028 7.75203 14.089 7.50548 14.0619 7.2629L14.0251 6.98566C13.9906 6.76242 13.9449 6.54288 13.8887 6.328C13.821 6.06868 13.7378 5.81556 13.6406 5.5704L13.5276 5.30291L13.4503 5.137L13.3762 4.98825C13.2174 4.67931 13.0349 4.38454 12.8308 4.10582L12.6778 3.90511L12.4789 3.66591L12.3154 3.48519L12.1958 3.36109L12.0351 3.20404L11.813 3.00342L11.4922 2.7435L11.248 2.56657L10.9558 2.37604L10.6342 2.19053L10.3069 2.02537L10.1934 1.97335L9.95451 1.87219L9.67754 1.76849L9.42529 1.68618L9.10038 1.59648L8.83562 1.53645L8.54369 1.48343ZM10.4029 5.80182C10.4029 4.77747 10.1998 3.79988 9.83208 2.90763C11.762 3.79154 13.1028 5.74021 13.1028 8.00182C13.1028 11.0946 10.5956 13.6018 7.50285 13.6018C6.6361 13.6018 5.8156 13.4052 5.08318 13.0538C6.54154 12.5957 7.81044 11.7098 8.74285 10.5432C8.87926 10.73 9.09992 10.8513 9.34891 10.8513C9.76313 10.8513 10.0989 10.5155 10.0989 10.1013C10.0989 9.74415 9.84928 9.44531 9.51498 9.36975C9.57704 9.25324 9.63616 9.13493 9.69223 9.01491C9.88321 9.13321 10.1084 9.20151 10.3496 9.20151C11.0399 9.20151 11.5996 8.64187 11.5996 7.95151C11.5996 7.26135 11.0403 6.70183 10.3502 6.70152C10.385 6.40646 10.4029 6.10623 10.4029 5.80182Z"
                fill="currentColor"
            />
        </Icon>
    );
};

export const DarkmodeToggle = () => {
    const { toggleColorMode } = useColorMode();
    return (
        <Button
            data-testid="DarkmodeToggle"
            onClick={toggleColorMode}
            variant="icon"
        >
            <Circle size="40px">
                <DarkmodeIcon />
            </Circle>
        </Button>
    );
};
