export const templates = [
    {
        id: "minimal-startup",
        name: "Minimal Startup",
        category: "Business",
        preview: "/templates/minimal-startup-preview.jpg",
        theme: {
            name: "Minimal Startup",
            palette: {
                background: "#FFFFFF",
                surface: "#F8FAFC",
                primary: "#2563EB",
                secondary: "#1E293B",
                accent: "#F59E0B",
                text: "#0F172A",
                mutedText: "#64748B",
                border: "#E2E8F0",
            },
            typography: {
                headingFont: "'Inter', sans-serif",
                bodyFont: "'Roboto', sans-serif",
                headingWeight: "700",
                bodyWeight: "400",
            },
            background: {
                type: "gradient",
                value: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
            },
            borderRadius: "12px",
            shadowStyle: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        },
        layouts: {
            title: {
                alignment: "center",
                showSubtitle: true,
                backgroundStyle: "gradient", // solid, gradient, image
            },
            content: {
                columns: 2,
                listStyle: "check", // bullet, number, check
            },
        },
    },
    {
        id: "creative-portfolio",
        name: "Creative Portfolio",
        category: "Creative",
        preview: "/templates/creative-portfolio-preview.jpg",
        theme: {
            name: "Creative Portfolio",
            palette: {
                background: "#FDF2F8",
                surface: "rgba(255, 255, 255, 0.8)",
                primary: "#EC4899",
                secondary: "#831843",
                accent: "#F472B6",
                text: "#831843",
                mutedText: "#BE185D",
                border: "#FBCFE8",
            },
            typography: {
                headingFont: "'Playfair Display', serif",
                bodyFont: "'Lato', sans-serif",
                headingWeight: "700",
                bodyWeight: "400",
            },
            background: {
                type: "gradient",
                value: "radial-gradient(circle at center, #FDF2F8 0%, #FCE7F3 100%)",
            },
            borderRadius: "24px",
            shadowStyle: "8px 8px 0px rgba(236, 72, 153, 0.2)",
        },
        layouts: {
            title: {
                alignment: "left",
                showSubtitle: true,
                backgroundStyle: "image",
            },
            content: {
                columns: 1,
                listStyle: "bullet",
            },
        },
    },
    {
        id: "dark-tech",
        name: "Dark Tech",
        category: "Technology",
        preview: "/templates/dark-tech-preview.jpg",
        theme: {
            name: "Dark Tech",
            palette: {
                background: "#111827",
                surface: "#1F2937",
                primary: "#10B981",
                secondary: "#064E3B",
                accent: "#34D399",
                text: "#F9FAFB",
                mutedText: "#9CA3AF",
                border: "#374151",
            },
            typography: {
                headingFont: "'Orbitron', sans-serif",
                bodyFont: "'Open Sans', sans-serif",
                headingWeight: "800",
                bodyWeight: "300",
            },
            background: {
                type: "solid",
                value: "#111827",
            },
            borderRadius: "4px",
            shadowStyle: "0 0 20px rgba(16, 185, 129, 0.2)",
        },
        layouts: {
            title: {
                alignment: "left",
                showSubtitle: false,
                backgroundStyle: "solid",
            },
            content: {
                columns: 3,
                listStyle: "number",
            },
        },
    },
    {
        id: "corporate-blue",
        name: "Corporate Blue",
        category: "Corporate",
        preview: "/templates/corporate-blue-preview.jpg",
        theme: {
            name: "Corporate Blue",
            palette: {
                background: "#EFF6FF",
                surface: "#FFFFFF",
                primary: "#1E3A8A",
                secondary: "#1E40AF",
                accent: "#60A5FA",
                text: "#1E3A8A",
                mutedText: "#3B82F6",
                border: "#BFDBFE",
            },
            typography: {
                headingFont: "'Montserrat', sans-serif",
                bodyFont: "'Merriweather', serif",
                headingWeight: "700",
                bodyWeight: "400",
            },
            background: {
                type: "solid",
                value: "#EFF6FF",
            },
            borderRadius: "8px",
            shadowStyle: "0 4px 6px -1px rgba(30, 58, 138, 0.1)",
        },
        layouts: {
            title: {
                alignment: "center",
                showSubtitle: true,
                backgroundStyle: "solid",
            },
            content: {
                columns: 2,
                listStyle: "bullet",
            },
        },
    },
    {
        id: "modern-marketing",
        name: "Modern Marketing",
        category: "Marketing",
        preview: "/templates/modern-marketing-preview.jpg",
        theme: {
            name: "Modern Marketing",
            palette: {
                background: "#FFFFFF",
                surface: "#F5F3FF",
                primary: "#8B5CF6",
                secondary: "#5B21B6",
                accent: "#C4B5FD",
                text: "#4C1D95",
                mutedText: "#7C3AED",
                border: "#DDD6FE",
            },
            typography: {
                headingFont: "'Poppins', sans-serif",
                bodyFont: "'Roboto', sans-serif",
                headingWeight: "700",
                bodyWeight: "400",
            },
            background: {
                type: "gradient",
                value: "linear-gradient(to right, #FFFFFF, #F3E8FF)",
            },
            borderRadius: "16px",
            shadowStyle: "0 20px 25px -5px rgba(139, 92, 246, 0.15)",
        },
        layouts: {
            title: {
                alignment: "right",
                showSubtitle: true,
                backgroundStyle: "gradient",
            },
            content: {
                columns: 1,
                listStyle: "check",
            },
        },
    },
];
