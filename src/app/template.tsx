"use client";

import React, { ViewTransition } from "react";

interface TemplateProps {
    children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
    return (
        <ViewTransition enter="page-enter" exit="page-exit">
            {children}
        </ViewTransition>
    );
}