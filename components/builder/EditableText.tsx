"use client";

import React, { useState, useEffect, useRef } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

interface EditableTextProps extends React.HTMLAttributes<HTMLElement> {
    id: string;
    initialValue: string;
    className?: string;
    multiline?: boolean;
    as?: React.ElementType;
    style?: React.CSSProperties;
    href?: string; // Explicitly add href for anchor tags
    [key: string]: any; // Allow other props
}

export const EditableText = ({ id, initialValue, className, multiline = false, as: Component = "div", style, ...props }: EditableTextProps) => {
    const { updateText, isReadOnly } = useBuilder();
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (value !== initialValue) {
            updateText(id, value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleBlur();
        }
        if (e.key === "Escape") {
            setValue(initialValue);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "bg-transparent border-2 border-amber-500/50 rounded p-1 outline-none w-full resize-none",
                        className
                    )}
                    style={style}
                    rows={value.split('\n').length}
                />
            );
        }

        return (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={cn(
                    "bg-transparent border-2 border-amber-500/50 rounded px-1 outline-none w-full",
                    className
                )}
                style={style}
            />
        );
    }

    if (isReadOnly) {
        return (
            <Component
                className={className}
                style={style}
                {...props}
            >
                {multiline ? (
                    (value || '').split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < (value || '').split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))
                ) : (
                    value || ''
                )}
            </Component>
        );
    }

    return (
        <Component
            onClick={(e: React.MouseEvent) => {
                // Prevent navigation if it's a link
                if (props.href) {
                    e.preventDefault();
                }
                setIsEditing(true);
            }}
            className={cn(
                "cursor-pointer hover:outline hover:outline-2 hover:outline-amber-500/30 hover:rounded px-1 -mx-1 transition-all relative group",
                className
            )}
            style={style}
            {...props}
        >
            {multiline ? (
                value.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        {i < value.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))
            ) : (
                value
            )}
            <span className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500 text-white p-1 rounded-full shadow-sm z-50 pointer-events-none">
                <Pencil size={10} />
            </span>
        </Component>
    );
};
