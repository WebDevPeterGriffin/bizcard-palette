import React from 'react';


interface QRSectionProps {
    value: string;
    size?: number;
    className?: string;
    qrClassName?: string;
    labelClassName?: string;
    label?: string;
    fgColor?: string;
    bgColor?: string;
}

/**
 * Shared QR code section component
 * Renders a QR code with optional label
 */
export const QRSection: React.FC<QRSectionProps> = ({
    value,
    size = 120,
    className = "mt-6",
    qrClassName = "",
    labelClassName = "text-sm mt-2 opacity-70",
    label = "Scan to save contact",
    fgColor = "#000000",
    bgColor = "#ffffff"
}) => {
    const [svg, setSvg] = React.useState<string>('');

    React.useEffect(() => {
        if (!value) return;

        // Dynamic import to avoid SSR issues if needed, or just standard import
        import('qrcode').then(QRCode => {
            QRCode.toString(value, {
                type: 'svg',
                width: size,
                margin: 1,
                color: {
                    dark: fgColor,
                    light: bgColor
                }
            }).then(setSvg);
        });
    }, [value, size, fgColor, bgColor]);

    if (!value) return null;

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div
                className={qrClassName}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
            {label && <p className={`text-center ${labelClassName}`}>{label}</p>}
        </div>
    );
};
